"use client";

import { useEffect, useState } from "react";
import { timeAgo } from "@/lib/time";

// Server render emits a deterministic short date (no Date.now during prerender —
// Cache Components forbids it); after hydration it becomes a live relative label.
function shortDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "—";
  const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  return `${Number(m[3])} ${months[Number(m[2]) - 1]}`;
}

export function TimeAgo({
  iso,
  prefix = "",
}: {
  iso: string | null;
  prefix?: string;
}) {
  const [relative, setRelative] = useState<string | null>(null);
  useEffect(() => {
    if (!iso) return;
    const update = () => setRelative(timeAgo(iso));
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, [iso]);
  if (!iso) return <>—</>;
  return (
    <time dateTime={iso} suppressHydrationWarning>
      {prefix}
      {relative ?? shortDate(iso)}
    </time>
  );
}
