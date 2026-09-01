import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Datenverarbeitung nach Art. 13 DSGVO.",
  robots: { index: false },
  alternates: { canonical: "/datenschutz" },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-mono text-2xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
      {children}
    </h2>
  );
}

export default function Datenschutz() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto max-w-prose px-4 pt-36 pb-24 sm:px-6">
        <h1 id="main-heading" tabIndex={-1} className="text-3xl font-bold tracking-tight outline-none">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-muted-foreground">
          Kurz gesagt: Diese Seite kommt ohne Tracking aus. Keine Cookies zu
          Werbezwecken, keine Analyse-Dienste, keine Weitergabe von Daten zu
          kommerziellen Zwecken.
        </p>

        <H2>Verantwortlicher</H2>
        <p className="mt-2">
          Iwan Braun · E-Mail:{" "}
          <a className="underline underline-offset-4" href="mailto:iwan.braun2004@gmail.com">
            iwan.braun2004@gmail.com
          </a>{" "}
          (Anschrift siehe Impressum).
        </p>

        <H2>Hosting und Server-Logs</H2>
        <p className="mt-2 text-muted-foreground">
          Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden
          technisch notwendige Daten verarbeitet (IP-Adresse, Zeitpunkt,
          abgerufene Seite, User-Agent), um die Seite auszuliefern und die
          Sicherheit des Betriebs zu gewährleisten (Art. 6 Abs. 1 lit. f
          DSGVO). Log-Daten werden nicht mit anderen Datenquellen
          zusammengeführt.
        </p>

        <H2>Kontaktaufnahme</H2>
        <p className="mt-2 text-muted-foreground">
          Bei Kontakt per E-Mail oder über das Kontaktformular werden die
          mitgeteilten Daten (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung
          der Anfrage verarbeitet (Art. 6 Abs. 1 lit. b DSGVO) und gelöscht,
          sobald die Anfrage abgeschlossen ist und keine gesetzlichen
          Aufbewahrungspflichten bestehen.
        </p>

        <H2>Live-Daten von GitHub</H2>
        <p className="mt-2 text-muted-foreground">
          Die Seite zeigt öffentliche Repository-Daten (Commits, Sprachen,
          Zeitstempel), die serverseitig von der GitHub-API abgerufen werden.
          Dabei werden keine personenbezogenen Daten der Besucherinnen und
          Besucher an GitHub übermittelt.
        </p>

        <H2>Lokale Speicherung</H2>
        <p className="mt-2 text-muted-foreground">
          Die Wahl des Farbschemas (hell/dunkel) wird ausschließlich lokal im
          Browser gespeichert (localStorage) und nicht an den Server
          übertragen. Es werden keine Tracking-Cookies gesetzt.
        </p>

        <H2>Ihre Rechte</H2>
        <p className="mt-2 text-muted-foreground">
          Sie haben nach der DSGVO das Recht auf Auskunft (Art. 15),
          Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
          Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
          Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1
          lit. f DSGVO (Art. 21). Außerdem besteht ein Beschwerderecht bei
          einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO).
        </p>
      </div>
    </main>
  );
}
