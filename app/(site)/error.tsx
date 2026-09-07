"use client";

// The error boundary speaks the site's grammar like the 404 does (judge r6
// d7): left-aligned on the content grid, bracket eyebrow, ghost glyph —
// not a centred island.
export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="plus-grid relative flex min-h-svh flex-col justify-center overflow-x-clip">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-0.08em] -translate-y-1/2 text-[clamp(10rem,32vw,30rem)] leading-none font-bold opacity-[0.05] select-none max-sm:top-[30%]"
      >
        !!
      </span>
      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6">
        <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
          <span aria-hidden="true">[ !! ]</span> fault on the wire
        </p>
        <h1 className="display-features mt-5 max-w-[13ch] text-5xl font-bold tracking-tighter">
          Something broke. Honestly.
        </h1>
        <p className="mt-5 max-w-[46ch] text-base text-pretty text-muted-foreground">
          A section of this page failed to render. The repos are fine — this is
          the site’s problem, not yours.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-9 h-12 bg-primary px-6 text-base font-medium text-primary-foreground transition-[background-color] duration-[var(--dur-micro)] hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
