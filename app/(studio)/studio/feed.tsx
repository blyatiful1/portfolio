"use client";

import { useEffect, useState } from "react";

type Entry = { ts?: string; event?: string; agent?: string; summary?: string };

export function Feed() {
  const [entries, setEntries] = useState<Entry[] | null>(null);

  useEffect(() => {
    let alive = true;
    const poll = async () => {
      try {
        const r = await fetch("/studio/feed", { cache: "no-store" });
        if (r.ok && alive) setEntries(await r.json());
      } catch {
        // dev server hiccup — next poll retries
      }
    };
    poll();
    const t = setInterval(poll, 2000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  if (!entries) return <p>loading feed…</p>;
  if (!entries.length)
    return <p>quiet — agent activity appears here (busy in fan-out mode)</p>;
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {entries.map((e, i) => (
        <li key={i}>
          {e.ts ?? ""} {e.event ?? ""} {e.agent ?? ""} {e.summary ?? ""}
        </li>
      ))}
    </ul>
  );
}
