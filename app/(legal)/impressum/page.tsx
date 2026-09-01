import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG.",
  robots: { index: false },
  alternates: { canonical: "/impressum" },
};

function LegalBlock({
  label,
  children,
  tight,
}: {
  label: string;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <section className={tight ? "mt-8" : "mt-12"}>
      <h2 className="font-mono text-2xs font-medium tracking-[0.16em] uppercase text-muted-foreground after:mt-2 after:block after:h-px after:w-10 after:bg-primary/50 after:content-['']">
        {label}
      </h2>
      <div className="mt-3 text-base">{children}</div>
    </section>
  );
}

export default function Impressum() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto grid max-w-content gap-x-12 px-4 pt-36 pb-24 sm:px-6 md:grid-cols-[3fr_9fr]">
        {/* Margin Note rail — world 00's legal corner */}
        <aside className="mb-10 h-fit md:sticky md:top-24 md:mb-0">
          <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-primary">
            <span aria-hidden="true">[ § ]</span> world 00 · legal
          </p>
          <p className="mt-3 font-mono text-2xs leading-relaxed text-muted-foreground">
            Anbieterkennzeichnung
            <br />
            nach § 5 DDG
          </p>
          <p className="mt-5">
            <Link
              href="/"
              className="nav-link font-mono text-2xs tracking-[0.08em] uppercase text-muted-foreground"
            >
              ← zurück zu den Welten
            </Link>
          </p>
        </aside>

        <div className="max-w-prose">
          <h1
            id="main-heading"
            tabIndex={-1}
            className="text-3xl font-bold tracking-tight outline-none"
          >
            Impressum
          </h1>

          <LegalBlock label="Diensteanbieter (§ 5 DDG)">
            <p>
              Iwan Braun
              <br />
              {/* material, unconfirmed — production ship is blocked until the real
                  postal address replaces this line (design/BRIEF.md §Assumed facts) */}
              [Anschrift wird vor Veröffentlichung ergänzt]
            </p>
          </LegalBlock>

          <LegalBlock label="Kontakt" tight>
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

          <LegalBlock label="Verbraucherstreitbeilegung (§ 36 VSBG)">
            <p className="text-muted-foreground">
              Ich bin nicht bereit und nicht verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalBlock>

          <LegalBlock label="Hinweis" tight>
            <p className="text-muted-foreground">
              Diese Website ist ein persönliches Portfolio. Es werden keine
              Waren oder Dienstleistungen über diese Website verkauft.
            </p>
          </LegalBlock>
        </div>
      </div>
    </main>
  );
}
