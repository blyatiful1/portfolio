"use client";

import { useEffect, useState } from "react";
import { TimeAgo } from "@/components/data/time-ago";
import { setWireStatus } from "./status";

export type WireRow = {
  sha: string;
  repo: string;
  message: string;
  date: string;
  ai: boolean;
  fresh?: boolean;
};

const repoColor: Record<string, string> = {
  ultraweb: "text-world-uw",
  hardmode: "text-world-hm",
  gtheme: "text-[var(--w3-display)]",
  portfolio: "text-foreground",
};

function repoLabel(repo: string): string {
  return repo === "portfolio" ? "this site" : repo;
}

function Row({ e }: { e: WireRow }) {
  return (
    <li
      className={`grid grid-cols-[5rem_6.5rem_1fr_auto] items-baseline gap-3 border-b border-border px-4 py-2 font-mono text-sm last:border-b-0 max-sm:grid-cols-[5rem_1fr_auto] ${
        e.fresh ? "anim-wire-in" : ""
      }`}
    >
      <span className="text-2xs text-muted-foreground">
        <TimeAgo iso={e.date} />
      </span>
      <span className={`font-medium ${repoColor[e.repo] ?? "text-foreground"}`}>
        {repoLabel(e.repo)}
      </span>
      <span className="truncate text-muted-foreground max-sm:hidden">
        {e.message}
      </span>
      <span
        className="border border-border px-1.5 text-[9px] tracking-[0.1em] text-muted-foreground uppercase"
        title={e.ai ? "AI-authored commit" : "human-authored commit"}
      >
        {e.ai ? "AI" : "HUM"}
      </span>
    </li>
  );
}

export function WireLive({ initial }: { initial: WireRow[] }) {
  const [rows, setRows] = useState<WireRow[]>(initial);

  useEffect(() => {
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
  }, []);

  return (
    <ol aria-label="Latest repository events" aria-live="polite">
      {rows.slice(0, 6).map((e) => (
        <Row key={e.sha} e={e} />
      ))}
    </ol>
  );
}
