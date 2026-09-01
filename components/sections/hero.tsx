import { TimeAgo } from "@/components/data/time-ago";
import type { Authorship } from "@/lib/data/github";

export function Hero({ auth }: { auth?: Authorship }) {
  return (
    <section data-world-rest className="plus-grid">
      <div className="mx-auto grid max-w-content items-center gap-x-16 gap-y-12 px-4 pt-40 pb-16 sm:px-6 md:pt-48 md:pb-24 lg:grid-cols-[7fr_5fr]">
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
            the one you&apos;re standing in, watching them live.
          </span>
        </p>
        <p
          aria-hidden="true"
          className="mt-14 inline-block font-mono text-2xs tracking-[0.08em] text-muted-foreground motion-safe:animate-[scroll-drift_2s_var(--ease-in-out)_infinite]"
        >
          ⟶ scroll — the chrome tunes itself to each world
        </p>
        </div>

        {/* Framed-Data counterweight (judge r2 d7): the claim, as a live number */}
        {auth && auth.total > 0 && (
          <div className="bracket-frame hidden h-fit p-7 lg:block">
            <p
              className="text-5xl font-bold tracking-tight tabular-nums"
              aria-label={`${auth.ai} of ${auth.total} commits AI-authored`}
            >
              {auth.ai.toLocaleString("en")}
              <span className="text-2xl text-muted-foreground">
                {" "}
                / {auth.total.toLocaleString("en")}
              </span>
            </p>
            <p className="mt-2 font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
              commits AI-authored, not mine — the point.
            </p>
            <p className="mt-5 font-mono text-2xs text-live">
              ● recomputed <TimeAgo iso={auth.computedAt} />
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
