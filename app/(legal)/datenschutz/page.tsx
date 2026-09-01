import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Datenverarbeitung nach Art. 13 DSGVO.",
  robots: { index: false },
  alternates: { canonical: "/datenschutz" },
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
      <div className="mt-3 text-base text-muted-foreground">{children}</div>
    </section>
  );
}

export default function Datenschutz() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto grid max-w-content gap-x-12 px-4 pt-36 pb-24 sm:px-6 md:grid-cols-[3fr_9fr]">
        <aside className="mb-10 h-fit md:sticky md:top-24 md:mb-0">
          <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-primary">
            <span aria-hidden="true">[ § ]</span> world 00 · legal
          </p>
          <p className="mt-3 font-mono text-2xs leading-relaxed text-muted-foreground">
            Informationen nach
            <br />
            Art. 13 DSGVO
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
            Datenschutzerklärung
          </h1>
          <p className="mt-5 text-base text-foreground">
            Kurz gesagt: Diese Seite kommt ohne Tracking aus. Keine Cookies zu
            Werbezwecken, keine Analyse-Dienste, keine Weitergabe von Daten zu
            kommerziellen Zwecken.
          </p>

          <LegalBlock label="Verantwortlicher">
            <p className="text-foreground">
              Iwan Braun · E-Mail:{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:iwan.braun2004@gmail.com"
              >
                iwan.braun2004@gmail.com
              </a>{" "}
              (Anschrift siehe Impressum).
            </p>
          </LegalBlock>

          <LegalBlock label="Hosting und Server-Logs">
            <p>
              Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden
              technisch notwendige Daten verarbeitet (IP-Adresse, Zeitpunkt,
              abgerufene Seite, User-Agent), um die Seite auszuliefern und die
              Sicherheit des Betriebs zu gewährleisten (Art. 6 Abs. 1 lit. f
              DSGVO). Log-Daten werden nicht mit anderen Datenquellen
              zusammengeführt.
            </p>
          </LegalBlock>

          <LegalBlock label="Kontaktaufnahme" tight>
            <p>
              Bei Kontakt per E-Mail oder über das Kontaktformular werden die
              mitgeteilten Daten (Name, E-Mail-Adresse, Nachricht) zur
              Bearbeitung der Anfrage verarbeitet (Art. 6 Abs. 1 lit. b DSGVO)
              und gelöscht, sobald die Anfrage abgeschlossen ist und keine
              gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </LegalBlock>

          <LegalBlock label="Live-Daten von GitHub" tight>
            <p>
              Die Seite zeigt öffentliche Repository-Daten (Commits, Sprachen,
              Zeitstempel), die serverseitig von der GitHub-API abgerufen
              werden. Dabei werden keine personenbezogenen Daten der
              Besucherinnen und Besucher an GitHub übermittelt.
            </p>
          </LegalBlock>

          <LegalBlock label="Lokale Speicherung" tight>
            <p>
              Die Wahl des Farbschemas (hell/dunkel) wird ausschließlich lokal
              im Browser gespeichert (localStorage) und nicht an den Server
              übertragen. Es werden keine Tracking-Cookies gesetzt.
            </p>
          </LegalBlock>

          <LegalBlock label="Ihre Rechte">
            <p>
              Sie haben nach der DSGVO das Recht auf Auskunft (Art. 15),
              Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
              Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
              Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1
              lit. f DSGVO (Art. 21). Außerdem besteht ein Beschwerderecht bei
              einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO).
            </p>
          </LegalBlock>
        </div>
      </div>
    </main>
  );
}
