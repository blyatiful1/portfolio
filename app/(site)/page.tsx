import { Hero } from "@/components/sections/hero";
import { Wire } from "@/components/sections/wire";
import { Operator } from "@/components/sections/operator";
import {
  WorldChapter,
  type ChapterContent,
} from "@/components/sections/world-chapter";
import { getRepoFacts, getWireEvents } from "@/lib/data/github";

const chapters: ChapterContent[] = [
  {
    world: "uw",
    anchor: "w1",
    number: "01",
    eyebrow: "the studio",
    surface: "bg-w1-ground text-w1-fg",
    muted: "text-w1-muted",
    headingClass:
      "font-[family-name:var(--font-display-uw)] text-4xl font-medium tracking-[-0.01em]",
    grain: true,
    title: (
      <>
        ultraweb, <em className="text-primary">a design studio you can install</em>
      </>
    ),
    copy: (
      <>
        A scoping interview, three mockups to pick from, then a production-grade
        site — built through the review checkpoints a real studio would give
        you. 80 skills, screenshot-verified gates, a written taste constitution.{" "}
        <span className="text-w1-fg">The page you are reading is its work.</span>
      </>
    ),
    facts: [
      { label: "stack", value: "Next.js pipeline · 80 skills" },
      { label: "proof", value: (
          <a href="https://ultraweb-site.vercel.app" target="_blank" rel="noreferrer" className="underline underline-offset-2">
            ultraweb-site.vercel.app ↗
          </a>
        ) },
      { label: "gates", value: "7, screenshot-verified" },
    ],
    cta: { href: "/work/ultraweb", label: "Enter world 01 →" },
  },
  {
    world: "hm",
    anchor: "w2",
    number: "02",
    eyebrow: "the discipline",
    surface: "bg-w2-ground text-w2-fg",
    muted: "text-w2-muted",
    headingClass: "font-mono text-4xl font-bold uppercase tracking-[-0.01em] text-primary",
    grain: true,
    hazard: true,
    title: <>hardmode</>,
    copy: (
      <>
        A discipline floor for AI coding agents. Advice loses to momentum — so
        the load-bearing rules live in hooks that cannot be talked out of, and
        the checks that matter run in fresh contexts that{" "}
        <span className="text-w2-fg">owe the work no loyalty.</span>
      </>
    ),
    facts: [
      { label: "stack", value: "Python · 6 hooks · 3 agents" },
      { label: "proof", value: "tools/demo.py — CI proves every hook blocks" },
      { label: "status", value: "live on the machine that built this" },
    ],
    cta: { href: "/work/hardmode", label: "Enter world 02 →" },
  },
  {
    world: "gt",
    anchor: "w3",
    number: "03",
    eyebrow: "the gentle one",
    surface: "bg-w3-ground text-w3-fg",
    muted: "text-w3-muted",
    headingClass: "text-4xl font-medium tracking-[-0.025em]",
    title: (
      <>
        gtheme, for the{" "}
        <span className="rounded-full bg-primary px-3 text-primary-foreground">
          nervous
        </span>
      </>
    ),
    copy: (
      <>
        Desktop theming for people who are afraid of breaking their desktop.
        Wallpaper, colours, icons, shell — one window, plain words, and an undo
        that always works. 2,610 tests. No telemetry.
      </>
    ),
    facts: [
      { label: "stack", value: "Python · GTK4 / libadwaita" },
      { label: "proof", value: "2,610 tests · CI green" },
      { label: "release", value: "v2.0.0" },
    ],
    cta: {
      href: "https://github.com/blyatiful1/gtheme",
      label: "Visit world 03 ↗",
      external: true,
    },
  },
  {
    world: "me",
    anchor: "w0",
    number: "00",
    eyebrow: "the one you're in",
    surface: "bg-card text-foreground",
    muted: "text-muted-foreground",
    headingClass: "text-4xl font-medium tracking-[-0.02em]",
    title: (
      <>
        This site.{" "}
        <span className="text-muted-foreground">
          It watches the others — and itself.
        </span>
      </>
    ),
    copy: (
      <>
        Every event on the wire is real and seconds old, delivered by webhook.
        The authorship numbers are recomputed from git history — never typed in.
        And this site&apos;s own repo is monitored too:{" "}
        <span className="text-foreground">
          the page you are reading reports on itself being built.
        </span>
      </>
    ),
    facts: [
      { label: "feed", value: "webhook → SSE" },
      { label: "claims", value: "self-verifying — re-run them" },
      { label: "built by", value: "world 01 (ultraweb)" },
    ],
    cta: {
      href: "https://github.com/blyatiful1",
      label: "Audit the build ↗",
      external: true,
    },
  },
];

export default async function Home() {
  const [facts, events] = await Promise.all([getRepoFacts(), getWireEvents()]);
  const factsFor = (w: string) =>
    facts.find(
      (f) =>
        f.available &&
        f.name === ({ uw: "ultraweb", hm: "hardmode", gt: "gtheme", me: "portfolio" } as const)[
          w as "uw" | "hm" | "gt" | "me"
        ],
    );
  const recentFor = (repo?: string) =>
    repo ? events.filter((e) => e.repo === repo) : [];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <div className="mx-auto max-w-content px-4 pb-20 sm:px-6">
        <Wire />
      </div>
      <div id="worlds" className="scroll-mt-14">
        {chapters.map((c) => {
          const f = factsFor(c.world);
          return (
            <WorldChapter
              key={c.anchor}
              content={c}
              repoFacts={f}
              recent={recentFor(f?.name)}
            />
          );
        })}
      </div>
      <Operator />
    </main>
  );
}
