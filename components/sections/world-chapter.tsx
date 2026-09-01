import Link from "next/link";
import { LanguageBar } from "@/components/data/language-bar";
import { TimeAgo } from "@/components/data/time-ago";
import { Reveal } from "@/components/motion/reveal";
import type { RepoFacts, WireEvent } from "@/lib/data/github";

export type WorldId = "uw" | "hm" | "gt" | "me";

export type ChapterContent = {
  world: WorldId;
  anchor: string;
  number: string;
  numeralClass?: string;
  eyebrow: string;
  title: React.ReactNode;
  copy: React.ReactNode;
  facts: { label: string; value: React.ReactNode }[];
  cta: { href: string; label: string; external?: boolean };
  surface: string; // ground + fg utility classes
  muted: string;
  headingClass: string;
  grain?: boolean;
  hazard?: boolean;
};

function LiveLine({
  facts,
  fallback,
}: {
  facts: RepoFacts | undefined;
  fallback: string;
}) {
  return (
    <p className="font-mono text-2xs tracking-[0.06em] uppercase opacity-70">
      <span aria-hidden="true" className="text-live">● </span>
      {facts?.pushedAt ? (
        <TimeAgo iso={facts.pushedAt} prefix="pushed " />
      ) : (
        fallback
      )}
    </p>
  );
}

export function WorldChapter({
  content,
  repoFacts,
  recent,
}: {
  content: ChapterContent;
  repoFacts?: RepoFacts;
  recent?: WireEvent[];
}) {
  const c = content;
  return (
    <section id={c.anchor} data-world={c.world} className="bg-background">
      <div
        className={`world-surface relative ${c.surface} ${c.grain ? "grain" : ""} ${c.hazard ? "hazard-edge" : ""} flex min-h-svh flex-col justify-center`}
      >
        {/* Type as the Image: the world number at architectural scale, bleeding
            off the right edge (SYSTEM Edge Bleed, recurring) */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 right-[-0.08em] -translate-y-1/2 text-[clamp(14rem,32vw,30rem)] leading-none font-bold opacity-[0.05] select-none ${c.numeralClass ?? ""}`}
        >
          {c.number}
        </span>
        <div className="relative mx-auto w-full max-w-content px-4 py-20 sm:px-6 md:py-28">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-primary">
            <span aria-hidden="true">[ {c.number} ]</span> {c.eyebrow}
          </p>
          <LiveLine facts={repoFacts} fallback="streaming" />
        </div>

        <div className="mt-8 grid gap-x-16 gap-y-10 md:grid-cols-[7fr_5fr]">
          <Reveal>
            <h2 className={`display-features max-w-[16ch] ${c.headingClass}`}>
              {c.title}
            </h2>
            <p className={`mt-6 max-w-[52ch] text-base ${c.muted}`}>{c.copy}</p>
            <p className="mt-8">
              <Link
                href={c.cta.href}
                {...(c.cta.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="nav-link inline-block py-3.5 font-mono text-sm font-medium tracking-[0.08em] uppercase text-primary"
              >
                {c.cta.label}
              </Link>
            </p>
          </Reveal>

          {/* facts rail — Offset Split: starts 3rem below the narrative top edge */}
          <Reveal
            delay={0.06}
            className={`min-w-0 border-l border-current/25 pl-6 md:mt-12 ${c.muted}`}
          >
            <dl className="space-y-3 font-mono text-xs tracking-[0.05em] uppercase">
              {c.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-2">
                  <dt className="opacity-60">{f.label}</dt>
                  <dd className="text-current">{f.value}</dd>
                </div>
              ))}
              {repoFacts && repoFacts.totalCommits > 0 && (
                <div className="grid grid-cols-[6.5rem_1fr] gap-2">
                  <dt className="opacity-60">commits</dt>
                  <dd className="tabular-nums">
                    {repoFacts.totalCommits} · {repoFacts.aiCommits} AI-authored
                  </dd>
                </div>
              )}
            </dl>
            {repoFacts && repoFacts.languages.length > 0 && (
              <div className="mt-6">
                <LanguageBar languages={repoFacts.languages} />
              </div>
            )}
            {recent && recent.length > 0 && (
              <ul className="mt-6 space-y-1.5 border-t border-current/25 pt-4 font-mono text-2xs" aria-label="Recent commits">
                {recent.slice(0, 3).map((e) => (
                  <li key={e.sha} className="flex min-w-0 gap-2">
                    <span className="font-medium opacity-80">{e.sha}</span>
                    <span className="min-w-0 truncate opacity-60">{e.message}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
        </div>
      </div>
    </section>
  );
}
