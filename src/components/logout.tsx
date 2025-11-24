"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      // Just redirect without waiting for callbacks
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      // Still redirect even if there's an error
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <Button variant={"outline"} onClick={handleLogout}>
      Logout
    </Button>
  );
}
