export function Hero() {
  return (
    <section className="plus-grid">
      <div className="mx-auto max-w-content px-4 pt-40 pb-16 sm:px-6 md:pt-48 md:pb-24">
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
    </section>
  );
}
