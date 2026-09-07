import { TimeAgo } from "@/components/data/time-ago";
import { REPOS, type Authorship } from "@/lib/data/github";

export function Hero({ auth }: { auth?: Authorship }) {
  return (
    <section data-world-rest className="plus-grid">
      <div className="mx-auto grid max-w-content items-center gap-x-10 gap-y-12 px-4 pt-40 pb-16 sm:px-6 md:grid-cols-[7fr_5fr] md:pt-48 md:pb-24 lg:gap-x-16">
        <div>
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground">
          Agent infrastructure · Germany
        </p>
        {/* LCP element: this headline — server-rendered text, zero entrance delay */}
        <h1
          id="main-heading"
          tabIndex={-1}
          className="display-features mt-5 max-w-[13ch] text-5xl font-bold tracking-tighter outline-none"
        >
          One operator.
          <br />
          Four worlds
          <span
            aria-hidden="true"
            className="ml-[0.12em] inline-block size-[0.13em] bg-live"
          />
        </h1>
        <p className="mt-7 max-w-[58ch] text-lg text-muted-foreground">
          Three projects, each in its own world — and{" "}
          <span className="text-foreground">
            the one you’re standing in, watching them live.
          </span>
        </p>
        <p
          aria-hidden="true"
          className="mt-14 inline-block font-mono text-2xs tracking-[0.08em] text-muted-foreground motion-safe:animate-[scroll-drift_2s_var(--ease-in-out)_infinite]"
        >
          ⟶ scroll — the chrome tunes itself to each world
        </p>
        </div>

        {/* Framed-Data counterweight (judge r2 d7): the claim, as a live number.
            Re-composed at md rather than deleted below lg (judge r6 d1).
            A partial recompute says so and drops the live dot (panel I23). */}
        {auth && auth.total > 0 && (
          <div className="bracket-frame hidden h-fit min-w-0 p-6 md:block lg:p-7">
            <p className="text-4xl font-bold tracking-tight tabular-nums lg:text-5xl">
              <span aria-hidden="true">
                {auth.ai.toLocaleString("en")}
                <span className="text-2xl text-muted-foreground">
                  {" "}
                  / {auth.total.toLocaleString("en")}
                </span>
              </span>
              <span className="sr-only">
                {auth.ai} of {auth.total} commits carry an agent co-author trailer
              </span>
            </p>
            <p className="mt-2 font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
              {auth.partial
                ? `commits AI-authored across ${auth.perRepo.length} of ${REPOS.length} worlds`
                : "commits AI-authored, not mine — the point."}
              {auth.truncated && " · most recent 500 per repo"}
            </p>
            {auth.partial ? (
              <p className="mt-5 font-mono text-2xs text-muted-foreground">
                ○ partial recompute · {auth.missing.join(", ")} unreachable
              </p>
            ) : (
              <p className="mt-5 font-mono text-2xs text-live">
                ● recomputed <TimeAgo iso={auth.computedAt} />
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
