"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { TimeAgo } from "@/components/data/time-ago";
import {
  getWirePaused,
  getWirePausedServer,
  hydrateWirePaused,
  setWireStatus,
  subscribeWirePaused,
} from "./status";

export type WireRow = {
  sha: string;
  repo: string;
  message: string;
  date: string;
  ai: boolean;
  fresh?: boolean;
};

const repoColor: Record<string, string> = {
  ultraweb: "text-world-uw-chrome",
  hardmode: "text-world-hm-chrome",
  gtheme: "text-world-gt-chrome",
  portfolio: "text-foreground",
};

function repoLabel(repo: string): string {
  return repo === "portfolio" ? "this site" : repo;
}

// "2026-09-02 14:03 UTC" — deterministic on server and client, so the
// announced timestamp never re-renders (the ticking label is aria-hidden)
function absoluteUtc(iso: string): string {
  const m = iso.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
  return m ? `${m[1]} ${m[2]} UTC` : iso;
}

function Row({ e, trailing }: { e: WireRow; trailing?: boolean }) {
  return (
    <li
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border px-4 py-2.5 font-mono text-sm last:border-b-0 sm:grid sm:grid-cols-[5rem_6.5rem_1fr_auto] sm:py-2 ${
        trailing ? "max-sm:hidden" : ""
      } ${e.fresh ? "anim-wire-in" : ""}`}
    >
      {/* the relative label ticks every minute — kept out of the live region's
          announced content; the absolute date is what a reader hears (I18) */}
      <span className="text-2xs text-muted-foreground">
        <span aria-hidden="true">
          <TimeAgo iso={e.date} />
        </span>
        <span className="sr-only">{absoluteUtc(e.date)}</span>
      </span>
      <span className={`font-medium ${repoColor[e.repo] ?? "text-foreground"}`}>
        {repoLabel(e.repo)}
      </span>
      {/* the message IS the event — below sm it takes its own full-width line
          instead of vanishing (gate-visual r4 d1) */}
      <span className="order-last w-full text-muted-foreground max-sm:line-clamp-2 sm:order-none sm:w-auto sm:truncate">
        {e.message}
      </span>
      {/* the badge's meaning is text, not a title attribute (panel I40) */}
      <span
        className="border border-border px-1.5 text-[9px] tracking-[0.1em] text-muted-foreground uppercase max-sm:ml-auto"
        title={e.ai ? "AI-authored commit" : "human-authored commit"}
      >
        <span aria-hidden="true">{e.ai ? "AI" : "HUM"}</span>
        <span className="sr-only">{e.ai ? "AI-authored commit" : "human-authored commit"}</span>
      </span>
    </li>
  );
}

export function WireLive({ initial }: { initial: WireRow[] }) {
  const [rows, setRows] = useState<WireRow[]>(initial);
  const paused = useSyncExternalStore(
    subscribeWirePaused,
    getWirePaused,
    getWirePausedServer,
  );

  useEffect(() => hydrateWirePaused(), []);

  useEffect(() => {
    if (paused) {
      setWireStatus("idle");
      return;
    }
    const es = new EventSource("/api/wire");
    es.onopen = () => setWireStatus("live");
    es.onerror = () => setWireStatus("idle"); // EventSource auto-reconnects
    es.onmessage = (msg) => {
      try {
        const e = JSON.parse(msg.data) as {
          sha: string;
          repo: string;
          message: string;
          ai: boolean;
          committedAt: string;
        };
        setRows((prev) =>
          prev.some((p) => p.sha === e.sha)
            ? prev
            : [
                {
                  sha: e.sha,
                  repo: e.repo,
                  message: e.message,
                  ai: e.ai,
                  date: e.committedAt,
                  fresh: true,
                },
                ...prev,
              ].slice(0, 8),
        );
      } catch {
        // malformed frame — skip
      }
    };
    return () => {
      es.close();
      setWireStatus("idle");
    };
  }, [paused]);

  return (
    <ol
      aria-label="Latest repository events"
      aria-live={paused ? "off" : "polite"}
    >
      {rows.slice(0, 6).map((e, i) => (
        <Row key={e.sha} e={e} trailing={i >= 4} />
      ))}
    </ol>
  );
}
