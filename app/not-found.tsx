import Link from "next/link";

export default function NotFound() {
  return (
    <main className="plus-grid flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
        <span aria-hidden="true">[ ?? ]</span> uncharted
      </p>
      <h1 className="display-features mt-5 text-5xl font-bold tracking-tighter">
        No such world.
      </h1>
      <p className="mt-5 max-w-[44ch] text-base text-muted-foreground">
        This address isn&apos;t on the wire. Four worlds exist — this
        isn&apos;t one of them.
      </p>
      <Link
        href="/"
        className="nav-link mt-9 font-mono text-sm font-medium tracking-[0.08em] uppercase text-foreground"
      >
        ← Back to world 00
      </Link>
    </main>
  );
}
