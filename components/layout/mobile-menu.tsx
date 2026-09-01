"use client";

import Link from "next/link";
import { Dialog } from "radix-ui";
import { Menu, X } from "lucide-react";

// Radix Dialog supplies focus trap, Escape, scroll lock, focus return.
// Choreography is CSS-only (anim-fade-rise + transition-delay stagger).
const items = [
  { href: "/#worlds", label: "Worlds", cls: "text-foreground" },
  { href: "/#w1", label: "ultraweb", cls: "text-world-uw" },
  { href: "/#w2", label: "hardmode", cls: "text-world-hm" },
  { href: "/#w3", label: "gtheme", cls: "text-[oklch(0.60_0.14_250)]" },
  { href: "/#w0", label: "this site", cls: "text-muted-foreground" },
  { href: "/#operator", label: "Operator", cls: "text-foreground" },
] as const;

export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex size-11 items-center justify-center text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/60" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col bg-background p-6"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-muted-foreground">
              iwan·braun
            </span>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="flex size-11 items-center justify-center text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Menu" className="mt-14 flex flex-col gap-5">
            {items.map((item, i) => (
              <Dialog.Close asChild key={item.href}>
                <Link
                  href={item.href}
                  className={`anim-fade-rise text-3xl font-bold tracking-tight ${item.cls}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {item.label}
                </Link>
              </Dialog.Close>
            ))}
          </nav>

          <div className="mt-auto border-t border-border pt-5">
            <Dialog.Close asChild>
              <Link
                href="/#contact"
                className="font-mono text-sm text-foreground underline underline-offset-4"
              >
                Work with me →
              </Link>
            </Dialog.Close>
            <p className="mt-3 font-mono text-2xs text-muted-foreground">
              github.com/blyatiful1 · the wire updates this site on its own
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
