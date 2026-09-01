"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme !== "light";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="flex size-11 shrink-0 items-center justify-center text-muted-foreground outline-none transition-[color] duration-[var(--dur-micro)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {mounted && (dark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />)}
      {/* accessible name as rendered text, gated on mounted: next-themes resolves
          the stored theme on the hydration render, so an ungated theme-dependent
          name mismatches SSR — as an attribute that mismatch is silently kept
          stale by React 19 (the old aria-label bug), as text it throws #418 */}
      <span className="sr-only">
        {mounted
          ? dark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Switch theme"}
      </span>
    </button>
  );
}
