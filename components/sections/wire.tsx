import { getWireEvents, type WireEvent } from "@/lib/data/github";
import { TimeAgo } from "@/components/data/time-ago";

const repoColor: Record<string, string> = {
  ultraweb: "text-world-uw",
  hardmode: "text-world-hm",
  gtheme: "text-[var(--w3-display)]",
  portfolio: "text-foreground",
};

function repoLabel(repo: string): string {
  return repo === "portfolio" ? "this site" : repo;
}

function Row({ e }: { e: WireEvent }) {
  return (
    <li className="grid grid-cols-[5rem_6.5rem_1fr_auto] items-baseline gap-3 border-b border-border px-4 py-2 font-mono text-sm last:border-b-0 max-sm:grid-cols-[5rem_1fr_auto]">
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

export async function Wire() {
  const events = await getWireEvents();
  const newest = events[0]?.date ?? null;
  return (
    <div className="border border-border bg-card">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-4 py-2.5">
        <h2 className="font-mono text-2xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          The wire — all worlds, as it happens
        </h2>
        <p className="font-mono text-2xs text-live">
          ● updated <TimeAgo iso={newest} />
        </p>
      </div>
      {events.length ? (
        <ol aria-label="Latest repository events">
          {events.slice(0, 6).map((e) => (
            <Row key={`${e.repo}${e.sha}`} e={e} />
          ))}
        </ol>
      ) : (
        <p className="px-4 py-6 font-mono text-sm text-muted-foreground">
          The wire can&apos;t reach GitHub right now — the repos are still
          there:{" "}
          <a className="underline underline-offset-4" href="https://github.com/blyatiful1">
            github.com/blyatiful1
          </a>
        </p>
      )}
    </div>
  );
}

export function WireSkeleton() {
  return (
    <div className="border border-border bg-card" aria-hidden="true">
      <div className="border-b border-border px-4 py-2.5">
        <div className="h-3.5 w-56 animate-pulse rounded-sm bg-muted" />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[5rem_6.5rem_1fr_auto] items-center gap-3 border-b border-border px-4 py-2 last:border-b-0 max-sm:grid-cols-[5rem_1fr_auto]"
        >
          <div className="h-3 w-12 animate-pulse rounded-sm bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded-sm bg-muted" />
          <div className="h-3 w-3/5 animate-pulse rounded-sm bg-muted max-sm:hidden" />
          <div className="h-3 w-7 animate-pulse rounded-sm bg-muted" />
        </div>
      ))}
    </div>
  );
}
