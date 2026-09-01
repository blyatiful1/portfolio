"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/wordmark";
import { LiveChip } from "@/components/wire/live-chip";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

const anchors = [
  { href: "/#worlds", label: "Worlds" },
  { href: "/#operator", label: "Operator" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const onWork = pathname.startsWith("/work");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 96);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={`glass-header fixed inset-x-0 top-0 z-40 transition-transform duration-[var(--dur-micro)] ease-out focus-within:translate-y-0 motion-reduce:translate-y-0 data-[scrolled=true]:border-b data-[scrolled=true]:border-border ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Iwan Braun — home"
        >
          <Wordmark className="h-3.5 w-auto" aria-hidden="true" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 sm:flex">
          {onWork ? (
            <Link href="/" className="nav-link font-mono text-xs tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground">
              ← All worlds
            </Link>
          ) : (
            anchors.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="nav-link font-mono text-xs tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground"
              >
                {a.label}
              </Link>
            ))
          )}
          <LiveChip />
          <Button asChild size="sm">
            <Link href="/#contact">Work with me</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-3 sm:hidden">
          <LiveChip />
          <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </div>
    </header>
  );
}
