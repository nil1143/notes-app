"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useScroll } from "motion/react";
import { ModeSwitcher } from "./mode-switcher";
import { Logout } from "./logout";
interface HeroHeaderProps {
  isAuthenticated?: boolean;
}

export const HeroHeader = ({ isAuthenticated = false }: HeroHeaderProps) => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
  }, [scrollYProgress]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Notes App
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button asChild variant="default">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Logout />
                <ModeSwitcher />
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="default">
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <ModeSwitcher />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ModeSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuState && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md">
            {isAuthenticated ? (
              <>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <div className="px-3 py-2">
                  <Logout />
                </div>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}