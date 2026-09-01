"use client";

import { useSyncExternalStore } from "react";
import { subscribeWireStatus, getWireStatus } from "./status";

// Header chip reflecting the wire connection. Until Phase 7 wires SSE,
// status is "idle" and the chip renders the calm variant.
export function LiveChip() {
  const status = useSyncExternalStore(
    subscribeWireStatus,
    getWireStatus,
    () => "idle" as const,
  );
  const live = status === "live";
  return (
    <span
      className="inline-flex items-center gap-2 border border-border px-2.5 py-1 font-mono text-2xs tracking-[0.1em] uppercase text-muted-foreground"
      title={live ? "Receiving events from GitHub in real time" : "Wire idle"}
    >
      <span
        aria-hidden="true"
        className={
          live
            ? "size-1.5 rounded-full bg-live motion-safe:animate-pulse"
            : "size-1.5 rounded-full bg-muted-foreground/60"
        }
      />
      {live ? "live" : "wire"}
    </span>
  );
}
