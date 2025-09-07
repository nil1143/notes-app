import Image from "next/image";
import Link from "next/link";

const links = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Customers",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
];

export default function FooterSection() {
  return (
    <footer className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 ">
        <Link
          href="/"
          aria-label="go home"
          className="flex items-center space-x-2 justify-center mb-6"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <h2 className="font-extralight ml-2">Notes App</h2>
        </Link>
        <span className="text-muted-foreground block text-center text-sm">
          {" "}
          © {new Date().getFullYear()} Tom Nil, All rights reserved
        </span>
      </div>
    </footer>
  );
}
