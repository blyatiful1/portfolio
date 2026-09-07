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

// The twelve hooks as wired in hooks/hooks.json at v3.1.0 (2026-09-02):
// name · the event it binds · what its exit code means. Names resolve the
// "12" below (panel I25); read from the repo, not remembered.
const hooks = [
  ["destructive-guard", "PreToolUse · Bash", "exit 2 blocks reset/checkout/clean/rm over uncommitted work, force-push, rm of the repo"],
  ["claim-audit", "Stop", "exit 2 bounces a “done” claim with no check run and passed after the last edit"],
  ["loop-alarm", "PostToolUse · PostToolUseFailure · PreToolUse(Edit)", "exit 2 nudges on the 3rd identical failing command; denies the 3rd identical failing edit"],
  ["readonly-agent", "PreToolUse · Bash/Edit/Write", "exit 2 denies tree writes from verifier, plan-critic, oracle, scout"],
  ["contract-gate", "SubagentStop", "sends back a verifier/critic/oracle answer that misses its VERDICT structure"],
  ["commit-preflight", "PreToolUse · Bash", "context nudge on git commit/push when edits landed after the last green check"],
  ["mem-privacy-guard", "PreToolUse · Write/Edit", "exit 2 blocks secret-shaped or work-marker writes into memory"],
  ["workflow-lint", "PreToolUse · Workflow", "exit 2 rejects a workflow script that breaks the kit’s rules before it spends money"],
  ["precompact-save-task", "PreCompact", "saves the original request, later corrections and git state verbatim"],
  ["compact-recovery", "SessionStart · compact", "re-injects the saved request and protocol after compaction"],
  ["floor-check", "SessionStart · startup/resume/clear", "witnesses the floor running; self-tests hooks when the harness binary changes"],
  ["ledger-summary", "SessionEnd", "rolls the session’s firing ledger into one line — “armed” becomes a number"],
] as const;

// The four fresh-context agents — trigger · context · what comes back — each
// read-only by hook enforcement, three of them answering in a machine-checked
// contract (agents/*.md at v3.1.0).
const agents = [
  ["verifier", "before reporting multi-file or high-stakes work as done", "the claim plus the files or diff; runs the canonical check itself", "VERDICT: CONFIRMED | REFUTED | PARTIAL · EVIDENCE · GAPS"],
  ["plan-critic", "before any multi-file, unfamiliar or risky implementation", "the plan plus the original request verbatim", "VERDICT: SOUND | NEEDS CHANGES | WRONG APPROACH · BLOCKERS · RISKS · SIMPLER"],
  ["oracle", "a bug that survived two fix attempts, or contradictory evidence", "every symptom, attempt, output and code path gathered so far", "DIAGNOSIS · CONFIDENCE · ALTERNATIVES · NEXT EXPERIMENT"],
  ["scout", "a workflow stage that must read and probe but never write", "the subsystem or claim to map, refute or hunt through", "structured findings; COULD NOT VERIFY where a probe was impossible"],
] as const;

export default function HardmodeCaseStudy() {
  return (
    <main id="main" tabIndex={-1} className="outline-none light:bg-[var(--w2-ground)]">
      {/* case-hero — world-02 dressed */}
      <section data-world="hm" className="grain hazard-edge bg-w2-ground text-w2-fg" style={{ "--hazard-offset": "3.5rem" } as React.CSSProperties}>
        <div className="mx-auto max-w-content px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28">
          <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-primary">
            <span aria-hidden="true">[ 02 ]</span> world 02 · case study
          </p>
          <h1
            id="main-heading"
            tabIndex={-1}
            className="display-features mt-6 max-w-[16ch] font-mono text-5xl font-bold uppercase tracking-[-0.02em] [word-spacing:-0.35ch] text-primary outline-none"
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
            Python · 12 hooks · 4 agents · v3.1.0 ·{" "}
            <a
              className="underline underline-offset-2"
              href="https://github.com/blyatiful1/hardmode"
              target="_blank"
              rel="noreferrer"
            >
              hardmode repo on GitHub <span aria-hidden="true">↗</span>
            </a>
          </p>
          {/* the timeline: dates and what was cut, so the study shows work
              to a clock, not only a result (panel I16) */}
          {/* a second voice, not a second spec row: sentence case, body face,
              ≤70-character measure (judge r6 d4) */}
          <p className="mt-4 max-w-[58ch] text-sm text-w2-muted">
            Started July 2026 as fable-protocol. Re-based and renamed for v3.0
            in August; v3.1.0 landed 2 Sep 2026. Cut along the way: the
            succession premise it was built for.
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
                <span aria-hidden="true" className="font-mono text-3xl font-medium text-world-hm-chrome/70 light:text-world-hm-chrome">
                  {item.n}
                </span>
                <div>
                  <h3 className="text-xl font-medium">{item.h}</h3>
                  {/* the argument reads at body size, not caption size (I48) */}
                  <p className="mt-1.5 text-base text-muted-foreground">{item.p}</p>
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
              <p className="mt-3 max-w-[46ch] text-base text-muted-foreground">
                A destructive command on a dirty tree doesn’t start a
                debate — it gets blocked, deterministically. The scoped,
                recoverable version passes untouched.
              </p>
            </div>
            <figure className="border border-border border-l-2 border-l-world-hm-chrome bg-card p-5 lg:mr-[calc(50%-50vw)] lg:rounded-l-md lg:border-r-0 lg:pr-0 xl:mr-0 xl:rounded-md xl:border-r xl:pr-5">
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
                Honesty ends the session, claims don’t
              </h3>
              <p className="mt-3 max-w-[46ch] text-base text-muted-foreground">
                “All done — tests pass” with no test run gets bounced by the
                claim audit. The honest report — two failures remain — sails
                through. The loop alarm fires on the third identical failure.
              </p>
            </div>
            <figure className="border border-border border-l-2 border-l-world-hm-chrome bg-card p-5 lg:mr-[calc(50%-50vw)] lg:rounded-l-md lg:border-r-0 lg:pr-0 xl:mr-0 xl:rounded-md xl:border-r xl:pr-5">
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

          {/* the identifiers behind the numbers (panel I25) — terse, the
              figures above already carry the proof */}
          <div className="mt-20">
            <h3 className="text-2xl font-medium">The twelve, by name</h3>
            <p className="mt-3 max-w-[56ch] text-base text-muted-foreground">
              As wired in hooks/hooks.json at v3.1.0 — the event each binds and
              what its exit code does.
            </p>
            <div
              className="mt-6 overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-ring"
              role="region"
              aria-label="The twelve hooks"
              tabIndex={0}
            >
              <table className="w-full min-w-[40rem] border-collapse font-mono text-xs">
                <caption className="sr-only">The twelve hardmode hooks: name, bound event, exit-code semantics</caption>
                <thead>
                  <tr className="border-b border-border text-left text-2xs tracking-[0.14em] uppercase text-muted-foreground">
                    <th scope="col" className="py-2 pr-4 font-medium">hook</th>
                    <th scope="col" className="py-2 pr-4 font-medium">event</th>
                    <th scope="col" className="py-2 font-medium">exit code means</th>
                  </tr>
                </thead>
                <tbody>
                  {hooks.map(([name, event, meaning]) => (
                    <tr key={name} className="border-b border-border align-top last:border-b-0">
                      <th scope="row" className="py-2 pr-4 text-left font-medium whitespace-nowrap text-world-hm-chrome">{name}</th>
                      <td className="py-2 pr-4 text-muted-foreground">{event}</td>
                      <td className="py-2 text-foreground/85">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-medium">The four, with no loyalty</h3>
            <p className="mt-3 max-w-[56ch] text-base text-muted-foreground">
              Fresh-context agents, read-only by the readonly-agent hook — not by
              promise. What triggers each, what it is handed, what it must return.
            </p>
            <div
              className="mt-6 overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-ring"
              role="region"
              aria-label="The four agents"
              tabIndex={0}
            >
              <table className="w-full min-w-[44rem] border-collapse font-mono text-xs">
                <caption className="sr-only">The four hardmode agents: trigger, context received, contract returned</caption>
                <thead>
                  <tr className="border-b border-border text-left text-2xs tracking-[0.14em] uppercase text-muted-foreground">
                    <th scope="col" className="py-2 pr-4 font-medium">agent</th>
                    <th scope="col" className="py-2 pr-4 font-medium">triggered by</th>
                    <th scope="col" className="py-2 pr-4 font-medium">handed</th>
                    <th scope="col" className="py-2 font-medium">returns</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map(([name, trigger, context, returns]) => (
                    <tr key={name} className="border-b border-border align-top last:border-b-0">
                      <th scope="row" className="py-2 pr-4 text-left font-medium whitespace-nowrap text-world-hm-chrome">{name}</th>
                      <td className="py-2 pr-4 text-muted-foreground">{trigger}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{context}</td>
                      <td className="py-2 text-foreground/85">{returns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* proof — stat block */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              ["12", "hooks, deterministic"],
              ["4", "fresh-context agents, read-only by hook"],
              ["10/10", "demo scenarios blocked — proven in CI"],
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
            This portfolio was built under exactly this regime. The CI run
            behind the 10/10:{" "}
            <a
              className="underline underline-offset-4"
              href="https://github.com/blyatiful1/hardmode/actions"
              target="_blank"
              rel="noreferrer"
            >
              hardmode’s Actions on GitHub <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </section>

      {/* next — closer */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-6">
          <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-sm">
            <a className="nav-link inline-block py-2 uppercase tracking-[0.08em] text-world-hm-chrome" href="https://github.com/blyatiful1/hardmode" target="_blank" rel="noreferrer">
              hardmode on GitHub <span aria-hidden="true">↗</span>
            </a>
            <Link className="nav-link inline-block py-2 uppercase tracking-[0.08em] text-muted-foreground" href="/work/ultraweb">
              <span aria-hidden="true">← </span>previous world: ultraweb
            </Link>
            <Link className="nav-link inline-block py-2 uppercase tracking-[0.08em] text-muted-foreground" href="/#worlds">
              all worlds <span aria-hidden="true">→</span>
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
