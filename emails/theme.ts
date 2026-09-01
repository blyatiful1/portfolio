import { tokens } from "@/lib/tokens";

// Email-safe theme: resolved hex (never oklch/var()), system font fallbacks.
// Grounds stay off pure #fff/#000 so client dark-mode inversion doesn't mud.
export const t = {
  bg: tokens.dark.background,
  panel: tokens.dark.card,
  fg: tokens.dark.foreground,
  muted: tokens.dark.mutedForeground,
  border: tokens.dark.border,
  accent: tokens.dark.live,
  font: "'Space Grotesk', -apple-system, 'Segoe UI', Helvetica, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, 'Courier New', monospace",
} as const;
