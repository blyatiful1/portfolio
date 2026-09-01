"use client";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
        <span aria-hidden="true">[ !! ]</span> fault on the wire
      </p>
      <h1 className="mt-5 text-4xl font-bold tracking-tight">
        Something broke. Honestly.
      </h1>
      <p className="mt-5 max-w-[46ch] text-base text-muted-foreground">
        A section of this page failed to render. The repos are fine — this is
        the site&apos;s problem, not yours.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-9 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-[background-color] duration-[var(--dur-micro)] hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Try again
      </button>
    </main>
  );
}
