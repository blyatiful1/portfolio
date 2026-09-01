import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "hardmode — a discipline floor for AI agents",
  description:
    "Case study: deterministic hooks that cannot be talked out of, plus fresh-context verifier agents — how AI coding agents get held to a real standard.",
  alternates: { canonical: "/work/hardmode" },
};

const failures = [
  { n: "01", h: "Declaring victory without running the check", p: "“All done — tests pass.” No test was run." },
  { n: "02", h: "git reset --hard over uncommitted work", p: "Momentum reaches for the destructive fix first." },
  { n: "03", h: "Grinding the same failing command", p: "Third identical failure, still no new evidence." },
  { n: "04", h: "Losing the request across a compaction", p: "The original task quietly mutates into its summary." },
];

export default function HardmodeCaseStudy() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {/* case-hero — world-02 dressed */}
      <section data-world="hm" className="grain hazard-edge bg-w2-ground text-w2-fg" style={{ "--hazard-offset": "3.5rem" } as React.CSSProperties}>
        <div className="mx-auto max-w-content px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28">
          <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-primary">
            <span aria-hidden="true">[ 02 ]</span> world 02 · case study
          </p>
          <h1
            id="main-heading"
            tabIndex={-1}
            className="display-features mt-6 max-w-[16ch] font-mono text-5xl font-bold uppercase tracking-[-0.01em] text-primary outline-none"
          >
            Advice loses to momentum
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg text-w2-muted">
            AI agents fail in repeatable ways — so hardmode puts the
            load-bearing rules in hooks that cannot be talked out of, and sends
            the checks that matter to fresh contexts that owe the work no
            loyalty.
          </p>
          <p className="mt-8 font-mono text-xs tracking-[0.06em] uppercase text-w2-muted">
            Python · 6 hooks · 3 agents · v3.0.0 ·{" "}
            <a
              className="underline underline-offset-2"
              href="https://github.com/blyatiful1/hardmode"
              target="_blank"
              rel="noreferrer"
            >
              repo ↗
            </a>
          </p>
        </div>
      </section>

      {/* failure-modes — numbered editorial list */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <h2 className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            The enemies — each one repeatable
          </h2>
          <div className="mt-6 max-w-[46rem]">
            {failures.map((item) => (
              <div
                key={item.n}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-6 border-b border-border py-7 last:border-b-0"
              >
                <span aria-hidden="true" className="font-mono text-3xl font-medium text-world-hm-chrome/70">
                  {item.n}
                </span>
                <div>
                  <h3 className="text-xl font-medium">{item.h}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* the-floor — splits with GENUINE demo output */}
      <section className="overflow-x-clip">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6 md:py-28">
          <h2 className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            The floor — real output, captured from the shipped hooks
          </h2>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[4fr_6fr]">
            <div>
              <h3 className="text-2xl font-medium">
                Hooks that cannot be talked out of
              </h3>
              <p className="mt-3 max-w-[46ch] text-sm text-muted-foreground">
                A destructive command on a dirty tree doesn&apos;t start a
                debate — it gets blocked, deterministically. The scoped,
                recoverable version passes untouched.
              </p>
            </div>
            <figure className="border border-border border-l-2 border-l-world-hm-chrome bg-card p-5 md:mr-[calc(50%-50vw)] md:rounded-l-md md:border-r-0 md:pr-0">
              <figcaption className="font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
                tools/demo.py — unedited output, 2026-09-01
              </figcaption>
              <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
{`bash:  git reset --hard        (1 uncommitted file)
kit:   BLOCKED (destructive guard) -> "blocked — git
       reset --hard discards ALL ..."
bash:  rm -rf build/ /         (the stray-space typo)
kit:   BLOCKED (destructive guard)
bash:  rm -rf build/           (scoped and recoverable)
kit:   ALLOWED (exit 0) — scoped deletes pass untouched`}
              </pre>
            </figure>
          </div>

          <div className="mt-16 grid items-center gap-10 md:grid-cols-[4fr_6fr]">
            <div>
              <h3 className="text-2xl font-medium">
                Honesty ends the session, claims don&apos;t
              </h3>
              <p className="mt-3 max-w-[46ch] text-sm text-muted-foreground">
                “All done — tests pass” with no test run gets bounced by the
                claim audit. The honest report — two failures remain — sails
                through. The loop alarm fires on the third identical failure.
              </p>
            </div>
            <figure className="border border-border border-l-2 border-l-world-hm-chrome bg-card p-5 md:mr-[calc(50%-50vw)] md:rounded-l-md md:border-r-0 md:pr-0">
              <figcaption className="font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
                tools/demo.py — unedited output, 2026-09-01
              </figcaption>
              <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
{`model: "All done - tests pass."
kit:   BLOCKED (claim-audit gate)
model: "Not all tests pass yet - two failures remain."
kit:   ALLOWED (exit 0) — honest reports end the session

bash:  "python -m pytest -q" fails 3x, nothing changed
kit:   attempt 3 -> LOOP ALARM (exit 2) — "this exact
       command has now fai ..."`}
              </pre>
            </figure>
          </div>
        </div>
      </section>

      {/* proof — stat block */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              ["6", "hooks, deterministic"],
              ["3", "fresh-context verifier agents"],
              ["4/4", "demo scenarios blocked — proven in CI"],
            ].map(([v, l]) => (
              <div key={l} className="bracket-frame p-5">
                <p className="text-5xl font-bold tracking-tight tabular-nums">{v}</p>
                <p className="mt-1 font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
                  {l}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-[56ch] text-base text-muted-foreground">
            The thesis in one line:{" "}
            <span className="text-foreground">
              verification earns its cost by being independent, not by being
              smarter than the drafter.
            </span>{" "}
            This portfolio was built under exactly this regime.
          </p>
        </div>
      </section>

      {/* next — closer */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-6">
          <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-sm">
            <a className="nav-link uppercase tracking-[0.08em] text-world-hm-chrome" href="https://github.com/blyatiful1/hardmode" target="_blank" rel="noreferrer">
              the repo ↗
            </a>
            <Link className="nav-link uppercase tracking-[0.08em] text-muted-foreground" href="/work/ultraweb">
              ← previous world: ultraweb
            </Link>
          </div>
          <Button asChild>
            <a href="mailto:iwan.braun2004@gmail.com">Work with me</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
