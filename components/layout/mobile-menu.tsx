"use client";

import Link from "next/link";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";

// Radix Dialog supplies focus trap, Escape, scroll lock. The TRIGGER lives in
// header.tsx (this chunk loads on first open; focus return is handled there).
// Choreography is CSS-only (anim-fade-rise + transition-delay stagger).
const items = [
  { href: "/#worlds", label: "Worlds", cls: "text-foreground" },
  { href: "/#w1", label: "ultraweb", cls: "text-world-uw-chrome" },
  { href: "/#w2", label: "hardmode", cls: "text-world-hm-chrome" },
  { href: "/#w3", label: "gtheme", cls: "text-world-gt-chrome" },
  { href: "/#w0", label: "this site", cls: "text-muted-foreground" },
  { href: "/#operator", label: "Operator", cls: "text-foreground" },
] as const;

export function MobileMenu({
  open,
  onOpenChange,
  returnFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocus?: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/60" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col bg-background p-6"
          aria-describedby={undefined}
          onCloseAutoFocus={(e) => {
            // the trigger lives in header.tsx (outside this Root) — radix can't
            // find it, so we return focus ourselves
            e.preventDefault();
            returnFocus?.();
          }}
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
