import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ultraweb — a design studio you can install",
  description:
    "Case study: an installable design studio for Claude Code — scoping interview, three mockups, a 12-phase pipeline, screenshot-verified quality gates.",
  alternates: { canonical: "/work/ultraweb" },
};

const problems = [
  {
    n: "01",
    h: "AI sites all look the same",
    p: "Purple gradients, three icon-cards, glassmorphism smeared over a template. One prompt, one pass, no taste — the output is a statistical average of the web.",
  },
  {
    n: "02",
    h: "A studio is a process, not a prompt",
    p: "Real studios interview, sketch, get sign-off, build the homepage first, then QA against a written standard. None of that fits in a single generation.",
  },
  {
    n: "03",
    h: "So the process got installed",
    p: "ultraweb packages the studio: 80 specialist skills, checkpoints where the client decides, and gates that refuse slop — enforced, not suggested.",
  },
];

export default function UltrawebCaseStudy() {
  return (
    <main id="main" tabIndex={-1} className="outline-none light:bg-[var(--w1-ground)]">
      {/* case-hero — world-01 dressed */}
      <section data-world="uw" className="grain bg-w1-ground text-w1-fg">
        <div className="mx-auto max-w-content px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28">
          <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-primary">
            <span aria-hidden="true">[ 01 ]</span> world 01 · case study
          </p>
          <h1
            id="main-heading"
            tabIndex={-1}
            className="display-features mt-6 max-w-[15ch] font-[family-name:var(--font-display-uw)] text-5xl font-medium tracking-[-0.01em] outline-none"
          >
            The studio that <em className="text-primary">built the page</em>{" "}
            you’re reading
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg text-w1-muted">
            ultraweb is a design studio for Claude Code: one guided session —
            interview, mockups, sign-offs — then a 12-phase pipeline to a
            shipped site. Not a template. A process, installed.
          </p>
          <p className="mt-8 font-mono text-xs tracking-[0.06em] uppercase text-w1-muted">
            JavaScript · 80 skills · 4 model-routed subagents · 7 gates ·{" "}
            <a
              className="underline underline-offset-2"
              href="https://github.com/blyatiful1/ultraweb"
              target="_blank"
              rel="noreferrer"
            >
              ultraweb repo on GitHub <span aria-hidden="true">↗</span>
            </a>
          </p>
          {/* the timeline: dates and what was cut, so the study shows work
              to a clock, not only a result (panel I16) */}
          {/* a second voice, not a second spec row: sentence case, body face,
              ≤70-character measure (judge r6 d4) */}
          <p className="mt-4 max-w-[58ch] text-sm text-w1-muted">
            First commit 16 July 2026; v1.9.0 on 2 September — seven weeks. On
            this site’s build it binned two full mockup rounds and cut the
            motion library it had scaffolded.
          </p>
        </div>
      </section>

      {/* the-problem — numbered editorial list */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <h2 className="sr-only">Why it exists</h2>
          <div className="max-w-[46rem]">
            {problems.map((item) => (
              <div
                key={item.n}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-6 border-b border-border py-8 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-3xl font-medium text-world-uw-chrome/70"
                >
                  {item.n}
                </span>
                <div>
                  <h3 className="text-xl font-medium">{item.h}</h3>
                  {/* the argument reads at body size, not caption size (I48) */}
                  <p className="mt-2 max-w-[52ch] text-base text-muted-foreground">
                    {item.p}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how-it-works — alternating splits with REAL ledger excerpts */}
      <section className="overflow-x-clip">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6 md:py-28">
          <h2 className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            How it works — shown on this very site
          </h2>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[4fr_6fr]">
            <div>
              <h3 className="text-2xl font-medium">
                The client points, the studio commits
              </h3>
              <p className="mt-3 max-w-[46ch] text-base text-muted-foreground">
                A scoping interview, then three contrasting mockups. Rejections
                are data: this site’s first round was thrown out whole, and
                the verdict went into the ledger verbatim.
              </p>
            </div>
            <figure className="border border-border bg-card p-5 lg:mr-[calc(50%-50vw)] lg:rounded-l-md lg:border-r-0 lg:pr-0 xl:mr-0 xl:rounded-md xl:border-r xl:pr-5">
              <figcaption className="font-[family-name:var(--font-display-uw)] text-sm italic text-world-uw-chrome">
                design/MOCKUPS.md — this site’s actual record
              </figcaption>
              <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
{`**Verdict R1:** Revised round — all four objections selected:
"Too tame for 'special' · Too samey · Wrong mood (darker/
atmospheric/world-like) · Wrong emphasis". All seats retired.

## Approved
**B3 — Four Worlds, refined** + commissioned notes (worlds
expand to full viewport on scroll-entry) — approved by user,
round 3. Green light for Phase 3.`}
              </pre>
            </figure>
          </div>

          {/* the approved candidate, as rendered — the one documentary figure
              SYSTEM §imagery allows: the studio's own artifact (panel I29) */}
          <div className="mt-16 grid items-center gap-10 md:grid-cols-[4fr_6fr]">
            <div>
              <h3 className="text-2xl font-medium">
                What was approved, before a line of production code
              </h3>
              <p className="mt-3 max-w-[46ch] text-base text-muted-foreground">
                Round three’s winning candidate: a static HTML mockup, four
                worlds in one spine. Scroll up — the page you are on is what
                it became.
              </p>
            </div>
            <figure className="border border-border bg-card p-5 lg:mr-[calc(50%-50vw)] lg:rounded-l-md lg:border-r-0 lg:pr-0 xl:mr-0 xl:rounded-md xl:border-r xl:pr-5">
              <figcaption className="font-[family-name:var(--font-display-uw)] text-sm italic text-world-uw-chrome">
                design/mockups/b3-four-worlds.html — rendered at 1440px
              </figcaption>
              <Image
                src="/work/ultraweb-b3-mockup.webp"
                width={1200}
                height={750}
                alt="The approved B3 mockup: a near-black chrome holding four full-bleed world chapters — ultraweb in terracotta, hardmode in hazard yellow, gtheme in soft light — with the live wire under the headline One operator, four worlds."
                sizes="(min-width: 1280px) 40rem, (min-width: 768px) 60vw, 100vw"
                className="mt-3 h-auto w-full rounded-sm border border-border"
              />
            </figure>
          </div>

          <div className="mt-16 grid items-center gap-10 md:grid-cols-[4fr_6fr]">
            <div>
              <h3 className="text-2xl font-medium">
                Taste is written down, then enforced
              </h3>
              <p className="mt-3 max-w-[46ch] text-base text-muted-foreground">
                A constitution every skill obeys, a direction file with a
                will-not list, and seven gates that screenshot, grep, and
                measure before anything ships.
              </p>
            </div>
            <figure className="border border-border bg-card p-5 lg:mr-[calc(50%-50vw)] lg:rounded-l-md lg:border-r-0 lg:pr-0 xl:mr-0 xl:rounded-md xl:border-r xl:pr-5">
              <figcaption className="font-[family-name:var(--font-display-uw)] text-sm italic text-world-uw-chrome">
                design/DIRECTION.md — this site’s actual record
              </figcaption>
              <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
{`**Signature move:** "Entering a world" — as the visitor
scrolls into a chapter it expands to swallow the viewport;
the chrome TUNES itself to that world. Budget: this one
choreography IS the entire spectacle budget.

**We will NOT:** … 4. The typeable-terminal Dark Tech look —
ultraweb-site already owns it; this site may not echo it.`}
              </pre>
            </figure>
          </div>
        </div>
      </section>

      {/* the-recursion — stat block */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              ["80", "specialist skills"],
              ["12", "phases, interview to ship"],
              ["7", "gates — screenshot-verified"],
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
            The recursion is the proof:{" "}
            <span className="text-foreground">
              this page is output of the process it describes.
            </span>{" "}
            Every decision above — the rejected mockups, the signature budget,
            the approvals — is committed in this site’s own repo, checkable
            like any other claim here.
          </p>
        </div>
      </section>

      {/* next — closer */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-6">
          <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-sm">
            <a className="nav-link inline-block py-2 uppercase tracking-[0.08em] text-world-uw-chrome" href="https://github.com/blyatiful1/ultraweb" target="_blank" rel="noreferrer">
              ultraweb on GitHub <span aria-hidden="true">↗</span>
            </a>
            <a className="nav-link inline-block py-2 uppercase tracking-[0.08em] text-world-uw-chrome" href="https://ultraweb-site.vercel.app" target="_blank" rel="noreferrer">
              ultraweb-site, the live proof <span aria-hidden="true">↗</span>
            </a>
            <Link className="nav-link inline-block py-2 uppercase tracking-[0.08em] text-muted-foreground" href="/work/hardmode">
              next world: hardmode <span aria-hidden="true">→</span>
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
