"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
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
      className="-my-1.5 inline-flex min-h-6 items-center border border-border px-2 py-1 font-mono text-2xs tracking-[0.1em] uppercase text-muted-foreground outline-none transition-[border-color,color] duration-[var(--dur-micro)] hover:border-foreground/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {paused ? (
        <Play className="mr-1.5 inline size-3 align-[-0.1em]" aria-hidden="true" />
      ) : (
        <Pause className="mr-1.5 inline size-3 align-[-0.1em]" aria-hidden="true" />
      )}
      {paused ? "resume" : "pause"}
      <span className="sr-only"> the live feed</span>
    </button>
  );
}
