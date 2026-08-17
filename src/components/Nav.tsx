"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Start" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto grid max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 px-5 py-4 md:flex md:justify-between md:px-10 md:py-5">
        <Link href="/" className="headline truncate text-2xl leading-none md:text-[2rem]">
          Rivverr
        </Link>
        <div className="label flex shrink-0 items-baseline gap-5 md:gap-10">
          <span className="hidden text-muted-foreground lg:inline">A studio for US businesses</span>
          {LINKS.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={`text-muted-foreground transition-colors hover:text-primary ${
                pathname === l.to ? "text-foreground" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
