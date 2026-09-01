import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG.",
  robots: { index: false },
  alternates: { canonical: "/impressum" },
};

function LegalBlock({
  id,
  label,
  children,
  tight,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <section id={id} className={tight ? "mt-8 scroll-mt-24" : "mt-12 scroll-mt-24"}>
      <h2 className="font-mono text-2xs font-medium tracking-[0.16em] uppercase text-muted-foreground after:mt-2 after:block after:h-px after:w-10 after:bg-primary/50 after:content-['']">
        {label}
      </h2>
      <div className="mt-3 text-base">{children}</div>
    </section>
  );
}

export default function Impressum() {
  return (
    <main id="main" lang="de" tabIndex={-1} className="relative overflow-x-clip outline-none">
      {/* the chapters' ghost-numeral grammar, in legal dress (r4: legal dist) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-[-0.06em] text-[clamp(10rem,24vw,20rem)] leading-none font-bold text-foreground opacity-[0.05] select-none"
      >
        §
      </span>
      <div className="relative mx-auto grid max-w-content gap-x-12 px-4 pt-36 pb-24 sm:px-6 md:grid-cols-[3fr_9fr]">
        {/* Margin Note rail — world 00's legal corner */}
                {/* 36rem ≈ 70 real chars at body size — max-w-prose (55ch) measured ~81 (r4 d6) */}
                <div className="max-w-[36rem]">
          <h1
            id="main-heading"
            tabIndex={-1}
            className="text-4xl font-bold tracking-tight outline-none"
          >
            Impressum
          </h1>

          <LegalBlock id="anbieter" label="Diensteanbieter (§ 5 DDG)">
            <p>
              Iwan Braun
              <br />
              Poststr. 153a
              <br />
              44809 Bochum
            </p>
          </LegalBlock>

          <LegalBlock id="kontakt" label="Kontakt" tight>
            <p>
              E-Mail:{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:iwan.braun2004@gmail.com"
              >
                iwan.braun2004@gmail.com
              </a>
              <br />
              Weiterer schneller Kontaktweg: GitHub{" "}
              <a
                className="underline underline-offset-4"
                href="https://github.com/blyatiful1"
                target="_blank"
                rel="noreferrer"
              >
                @blyatiful1
              </a>
            </p>
          </LegalBlock>

          <LegalBlock id="vsbg" label="Verbraucherstreitbeilegung (§ 36 VSBG)">
            <p className="text-muted-foreground">
              Ich bin nicht bereit und nicht verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalBlock>

          <LegalBlock id="hinweis" label="Hinweis" tight>
            <p className="text-muted-foreground">
              Diese Website ist ein persönliches Portfolio. Es werden keine
              Waren oder Dienstleistungen über diese Website verkauft.
            </p>
          </LegalBlock>
        </div>

        <aside className="mt-12 h-fit md:order-first md:sticky md:top-24 md:mt-0">
          <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-primary">
            <span aria-hidden="true">[ § ]</span> world 00 · legal
          </p>
          <p className="mt-3 font-mono text-2xs leading-relaxed text-muted-foreground">
            Anbieterkennzeichnung
            <br />
            nach § 5 DDG
          </p>
          <nav aria-label="Abschnitte" className="mt-6">
            <ul className="space-y-2">
              <li><a href="#anbieter" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Diensteanbieter</a></li>
              <li><a href="#kontakt" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Kontakt</a></li>
              <li><a href="#vsbg" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Streitbeilegung</a></li>
              <li><a href="#hinweis" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Hinweis</a></li>
            </ul>
          </nav>
          <p className="mt-6 font-mono text-2xs text-muted-foreground">Stand: September 2026</p>
          <p className="mt-5">
            <Link
              href="/"
              className="nav-link font-mono text-2xs tracking-[0.08em] uppercase text-muted-foreground"
            >
              ← zurück zu den Welten
            </Link>
          </p>
        </aside>
      </div>
    </main>
  );
}
