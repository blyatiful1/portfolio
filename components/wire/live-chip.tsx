"use client";

import { useSyncExternalStore } from "react";
import { subscribeWireStatus, getWireStatus } from "./status";

// Header chip reflecting the wire connection: "wire" = stream idle,
// "live" = SSE connected. The state's meaning is rendered text for assistive
// tech, not only a hover title (panel I40 / I42).
export function LiveChip() {
  const status = useSyncExternalStore(
    subscribeWireStatus,
    getWireStatus,
    () => "idle" as const,
  );
  const live = status === "live";
  return (
    <span
      className="inline-flex h-8 items-center gap-2 border border-[color-mix(in_oklab,var(--tuned-accent)_45%,var(--border))] px-2.5 font-mono text-2xs tracking-[0.1em] uppercase text-muted-foreground transition-[border-color] duration-[var(--dur-micro)]"
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
      <span aria-hidden="true">{live ? "live" : "wire"}</span>
      <span className="sr-only">
        {live
          ? "Wire status: live — receiving events from GitHub in real time"
          : "Wire status: idle"}
      </span>
    </span>
  );
}
