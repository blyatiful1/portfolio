import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG.",
  robots: { index: false },
  alternates: { canonical: "/impressum" },
};

export default function Impressum() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto max-w-prose px-4 pt-36 pb-24 sm:px-6">
        <h1 id="main-heading" tabIndex={-1} className="text-3xl font-bold tracking-tight outline-none">
          Impressum
        </h1>

        <section className="mt-10 space-y-2 text-base">
          <h2 className="font-mono text-2xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
            Diensteanbieter (§ 5 DDG)
          </h2>
          <p>
            Iwan Braun
            <br />
            {/* material, unconfirmed — production ship is blocked until the real
                postal address replaces this line (design/BRIEF.md §Assumed facts) */}
            [Anschrift wird vor Veröffentlichung ergänzt]
          </p>
        </section>

        <section className="mt-10 space-y-2 text-base">
          <h2 className="font-mono text-2xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
            Kontakt
          </h2>
          <p>
            E-Mail:{" "}
            <a className="underline underline-offset-4" href="mailto:iwan.braun2004@gmail.com">
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
        </section>

        <section className="mt-10 space-y-2 text-base">
          <h2 className="font-mono text-2xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
            Verbraucherstreitbeilegung (§ 36 VSBG)
          </h2>
          <p className="text-muted-foreground">
            Ich bin nicht bereit und nicht verpflichtet, an
            Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section className="mt-10 space-y-2 text-base">
          <h2 className="font-mono text-2xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
            Hinweis
          </h2>
          <p className="text-muted-foreground">
            Diese Website ist ein persönliches Portfolio. Es werden keine
            Waren oder Dienstleistungen über diese Website verkauft.
          </p>
        </section>
      </div>
    </main>
  );
}
