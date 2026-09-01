import { Button } from "@/components/ui/button";
import { TimeAgo } from "@/components/data/time-ago";
import { ContactForm } from "@/components/sections/contact-form";
import { getAuthorship } from "@/lib/data/github";

export async function Operator() {
  const auth = await getAuthorship();
  return (
    <section id="operator" className="plus-grid border-t border-border">
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
              I&apos;m Iwan Braun.{" "}
              <span className="text-foreground">
                AI agents write essentially every line I ship; I own what git
                log can&apos;t record
              </span>{" "}
              — choosing the problems, writing the standard, binning what fails
              it. Whether that&apos;s worth hiring is a fair question. The
              worlds above are where you&apos;d check.
            </p>
            <dl className="mt-8 space-y-2 font-mono text-xs tracking-[0.05em] uppercase text-muted-foreground">
              <div className="grid grid-cols-[8.5rem_1fr] gap-2">
                <dt className="opacity-60">what I bring</dt>
                <dd>agent orchestration · verification design · shipped artifacts</dd>
              </div>
              <div className="grid grid-cols-[8.5rem_1fr] gap-2">
                <dt className="opacity-60">what I don&apos;t claim</dt>
                <dd>lines typed by hand</dd>
              </div>
              <div className="grid grid-cols-[8.5rem_1fr] gap-2">
                <dt className="opacity-60">based in</dt>
                <dd>Germany · remote / hybrid</dd>
              </div>
            </dl>
            <div id="contact" className="mt-10 scroll-mt-24">
              <ContactForm />
              <div className="mt-6">
                <Button asChild variant="ghost" size="sm">
                  <a
                    href="https://github.com/blyatiful1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* the stat card — Framed Data: the number is real DOM text, recomputed live.
              Mobile: card leads (SITEMAP mobile order). */}
          <div className="h-fit border border-border bg-card p-7 max-md:order-first md:mt-12">
            <p
              className="text-4xl font-bold tracking-tight tabular-nums"
              aria-label={`${auth.ai} of ${auth.total} commits AI-authored`}
            >
              {auth.ai.toLocaleString("en")}
              <span className="text-xl text-muted-foreground">
                {" "}
                / {auth.total.toLocaleString("en")}
              </span>
            </p>
            <p className="mt-2 font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
              commits across these worlds — AI-authored
            </p>
            <div className="mt-6 border-t border-border pt-4 font-mono text-2xs leading-relaxed text-muted-foreground">
              <p>
                recomputed from git history ·{" "}
                <TimeAgo iso={auth.computedAt} />
              </p>
              <p className="mt-2">
                don&apos;t take the site&apos;s word:{" "}
                <code className="text-live">
                  git log --no-merges | grep -ci claude
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
