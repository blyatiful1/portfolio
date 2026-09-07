"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  getWirePaused,
  getWirePausedServer,
  hydrateWirePaused,
  setWirePaused,
  subscribeWirePaused,
} from "./status";

// The visible pause control for the live feed (WCAG 2.2.2 — panel I18).
// Lives in the wire's header row; the feed itself reads the same store.
export function WirePause() {
  const paused = useSyncExternalStore(
    subscribeWirePaused,
    getWirePaused,
    getWirePausedServer,
  );
  useEffect(() => hydrateWirePaused(), []);
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setWirePaused(!paused)}
      className="nav-link -my-1.5 min-h-6 py-1.5 font-mono text-2xs tracking-[0.1em] uppercase text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span aria-hidden="true">{paused ? "▶ " : "❚❚ "}</span>
      {paused ? "resume" : "pause"}
      <span className="sr-only"> the live feed</span>
    </button>
  );
}
