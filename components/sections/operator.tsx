import { Button } from "@/components/ui/button";
import { TimeAgo } from "@/components/data/time-ago";
import { ContactForm } from "@/components/sections/contact-form";
import { REPOS, getAuthorship, getOperatorFacts } from "@/lib/data/github";
import { VERIFY_COMMAND } from "@/lib/data/authorship";

// "Dec 2021" from an ISO date — deterministic, no locale, no Date.now()
function monthYear(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})/);
  if (!m) return "";
  const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  return `${months[Number(m[2]) - 1]} ${m[1]}`;
}

const worldLabel: Record<string, string> = {
  ultraweb: "ultraweb",
  hardmode: "hardmode",
  gtheme: "gtheme",
  portfolio: "this site",
};

export async function Operator() {
  const [auth, facts] = await Promise.all([getAuthorship(), getOperatorFacts()]);
  const worlds = REPOS.length;
  return (
    <section id="operator" data-world-rest className="plus-grid border-t border-border">
      <div className="mx-auto max-w-content px-4 py-28 sm:px-6 md:py-40">
        <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
          The operator
        </p>
        <div className="mt-6 grid gap-x-16 gap-y-12 md:grid-cols-[7fr_5fr]">
          <div>
            <h2 className="display-features max-w-[18ch] text-4xl font-bold tracking-tight">
              The code is theirs.{" "}
              <em className="font-[family-name:var(--font-display-uw)] font-medium text-muted-foreground">
                The standard is mine.
              </em>
            </h2>
            <p className="mt-7 max-w-[54ch] text-base text-muted-foreground">
              I’m Iwan Braun.{" "}
              <span className="text-foreground">
                AI agents write essentially every line I ship; I own what git
                log can’t record
              </span>{" "}
              — choosing the problems, writing the standard, binning what fails
              it. Whether that’s worth hiring is a fair question. The worlds
              above are where you’d check.
            </p>
            {/* dt labels are the muted token, dd values the foreground token —
                hierarchy by pair, never by alpha (panel I02: opacity-60 on a
                muted token dropped these 12px labels to 2.6–3.6:1) */}
            <dl className="mt-8 space-y-2 font-mono text-xs tracking-[0.05em] uppercase text-muted-foreground">
              <div className="grid grid-cols-[10.5rem_1fr] gap-2 max-sm:grid-cols-1 max-sm:gap-0.5">
                <dt>what I bring</dt>
                <dd className="text-foreground">agent orchestration · verification design · shipped artifacts</dd>
              </div>
              <div className="grid grid-cols-[10.5rem_1fr] gap-2 max-sm:grid-cols-1 max-sm:gap-0.5">
                <dt>what I don’t claim</dt>
                <dd className="text-foreground">
                  lines typed by hand · client references — every world here is my own
                </dd>
              </div>
              <div className="grid grid-cols-[10.5rem_1fr] gap-2 max-sm:grid-cols-1 max-sm:gap-0.5">
                <dt>based in</dt>
                <dd className="text-foreground">Bochum, NRW · remote / hybrid</dd>
              </div>
              {facts.since && (
                <div className="grid grid-cols-[10.5rem_1fr] gap-2 max-sm:grid-cols-1 max-sm:gap-0.5">
                  <dt>shipping since</dt>
                  <dd className="text-foreground">
                    <time dateTime={facts.since.slice(0, 10)}>{monthYear(facts.since)}</time>{" "}
                    — the GitHub account’s own date
                  </dd>
                </div>
              )}
            </dl>
            <div id="contact" className="mt-10 scroll-mt-24">
              <ContactForm />
              {/* ghost aligns on its TEXT edge: -ml-3 cancels the px-3 box padding
                  so the glyph lands on the form-field edge at every width (r4 d4) */}
              <div className="mt-6 -ml-3">
                <Button asChild variant="ghost" size="sm" className="h-11">
                  <a
                    href="https://github.com/blyatiful1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub profile <span aria-hidden="true">↗</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* the stat card — Framed Data with its subject INSIDE the frame:
              self-contained at every width (r4 d2), number modest at lg so the
              hero keeps the display-scale moment. md: sits opposite the form. */}
          {auth.total > 0 ? (
            <div className="bracket-frame h-fit min-w-0 p-7 max-md:order-first md:self-end">
              {/* the sentence lives in the flow, not in an aria-label on a <p>
                  (prohibited there — panel I41) */}
              <p className="text-4xl font-bold tracking-tight tabular-nums lg:text-2xl">
                <span aria-hidden="true">
                  {auth.ai.toLocaleString("en")}
                  <span className="text-xl text-muted-foreground lg:text-base">
                    {" "}
                    / {auth.total.toLocaleString("en")}
                  </span>
                </span>
                <span className="sr-only">
                  {auth.ai} of {auth.total} commits carry an agent co-author trailer
                </span>
              </p>
              {/* relabelled to what is counted (panel I17); the partial and
                  truncated states say so instead of shrinking quietly (I23, I45) */}
              <p className="mt-2 font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
                {auth.partial
                  ? `commits across ${auth.perRepo.length} of ${worlds} worlds — agent co-author trailer`
                  : "commits across these worlds — agent co-author trailer"}
                {auth.truncated && " (most recent 500 per repo)"}
              </p>
              <p className="mt-2 font-mono text-2xs leading-relaxed text-muted-foreground">
                a trailer the tooling writes: it names the tool, not the difficulty.
              </p>
              {auth.partial && (
                <p className="mt-2 font-mono text-2xs leading-relaxed text-destructive">
                  ○ partial recompute — {auth.missing.map((m) => worldLabel[m] ?? m).join(", ")}{" "}
                  unreachable; the fraction excludes it.
                </p>
              )}
              <div className="mt-6 border-t border-border pt-4 font-mono text-2xs leading-relaxed text-muted-foreground">
                <p>
                  recomputed from git history ·{" "}
                  <TimeAgo iso={auth.computedAt} />
                </p>
                {/* per-repo sub-totals: the headline is a sum, each term is
                    reproducible on its own checkout (panel I10) */}
                <p className="mt-2 tabular-nums">
                  {auth.perRepo
                    .map((r) => `${worldLabel[r.name] ?? r.name} ${r.ai}/${r.total}`)
                    .join(" · ")}
                </p>
                <p className="mt-2">
                  don’t take the site’s word — per repo, on its default branch:{" "}
                  <code className="block max-w-full break-normal whitespace-pre-wrap text-live">
                    {VERIFY_COMMAND}
                  </code>
                </p>
              </div>
            </div>
          ) : (
            <div className="bracket-frame h-fit min-w-0 p-7 max-md:order-first md:self-end">
              <p className="font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
                ○ authorship stat unavailable
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                GitHub can’t be reached right now, so no number is shown — a
                guessed one would be worse. The commits are still there:{" "}
                <a
                  className="underline underline-offset-4"
                  href="https://github.com/blyatiful1"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/blyatiful1 <span aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
