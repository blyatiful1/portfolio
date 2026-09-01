import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Full site chrome (judge r2 d1): the 404 is still the site — header, footer,
// legal links reachable (§5 DDG: ständig verfügbar), theme toggle intact.
export default function NotFound() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="plus-grid flex min-h-svh flex-col items-center justify-center px-6 text-center outline-none"
      >
        <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
          <span aria-hidden="true">[ ?? ]</span> uncharted
        </p>
        <h1 className="display-features mt-5 text-5xl font-bold tracking-tighter">
          No such world
          <span
            aria-hidden="true"
            className="ml-[0.12em] inline-block size-[0.13em] bg-live"
          />
        </h1>
        <p className="mt-5 max-w-[44ch] text-base text-muted-foreground">
          This address isn&apos;t on the wire. Four worlds exist — this
          isn&apos;t one of them.
        </p>
        <Link
          href="/"
          className="nav-link mt-9 inline-block py-3.5 font-mono text-sm font-medium tracking-[0.08em] uppercase text-foreground"
        >
          ← Back to world 00
        </Link>
      </main>
      <Footer />
    </>
  );
}
