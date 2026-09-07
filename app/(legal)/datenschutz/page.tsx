import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Datenverarbeitung nach Art. 13 DSGVO.",
  robots: { index: false },
  alternates: { canonical: "/datenschutz" },
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
      <div className="mt-3 text-base text-muted-foreground">{children}</div>
    </section>
  );
}

export default function Datenschutz() {
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
                {/* 36rem ≈ 70 real chars at body size — max-w-prose (55ch) measured ~81 (r4 d6) */}
                <div className="max-w-[36rem]">
          {/* r5 d1: "Datenschutzerklärung" at the text-4xl 34px floor is wider
              than the 375 column — one step down until sm */}
          <h1
            id="main-heading"
            tabIndex={-1}
            className="text-3xl font-bold tracking-tight outline-none sm:text-4xl"
          >
            Datenschutzerklärung
          </h1>
          <p className="mt-5 text-base text-foreground">
            Kurz gesagt: Diese Seite kommt ohne Tracking aus. Keine Cookies zu
            Werbezwecken, keine Analyse-Dienste, keine Weitergabe von Daten zu
            kommerziellen Zwecken.
          </p>

          <LegalBlock id="verantwortlicher" label="Verantwortlicher">
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

          <LegalBlock id="hosting" label="Hosting und Server-Logs">
            <p>
              Diese Website wird bei Vercel Inc. (San Francisco, USA) gehostet.
              Beim Aufruf werden technisch notwendige Daten verarbeitet
              (IP-Adresse, Zeitpunkt, abgerufene Seite, User-Agent), um die
              Seite auszuliefern und die Sicherheit des Betriebs zu
              gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Diese Log-Daten hält
              der Hoster nur kurzzeitig vor (nach dessen Angaben tarifabhängig
              Stunden bis wenige Tage) und löscht sie danach automatisch; ich
              werte sie nicht aus und führe sie nicht mit anderen Datenquellen
              zusammen. Die Übermittlung in die USA erfolgt auf der unter
              „Empfänger“ genannten Grundlage.
            </p>
          </LegalBlock>

          <LegalBlock id="kontakt" label="Kontaktaufnahme" tight>
            <p>
              Bei Kontakt per E-Mail oder über das Kontaktformular werden die
              mitgeteilten Daten (Name, E-Mail-Adresse, Nachricht) zur
              Bearbeitung der Anfrage verarbeitet (Art. 6 Abs. 1 lit. b DSGVO)
              und gelöscht, sobald die Anfrage abgeschlossen ist und keine
              gesetzlichen Aufbewahrungspflichten bestehen. Eine Nachricht aus
              dem Formular wird über den Versanddienst Resend Inc. (USA) als
              E-Mail zugestellt und landet in einem bei Google (Google Ireland
              Limited bzw. Google LLC, USA) geführten Postfach. Beide Anbieter
              verarbeiten die Daten in meinem Auftrag ausschließlich zur
              Zustellung und Aufbewahrung der Nachricht.
            </p>
          </LegalBlock>

          <LegalBlock id="empfaenger" label="Empfänger und Drittlandtransfer" tight>
            <p>
              Auftragsverarbeiter bzw. Empfänger sind: Vercel Inc. (Hosting,
              USA), Resend Inc. (E-Mail-Zustellung des Kontaktformulars, USA)
              und Google (Postfach, Irland/USA). Öffentliche Repository-Daten
              werden von GitHub, Inc. (USA) abgerufen, ohne dass dabei Daten
              von Besucherinnen und Besuchern übermittelt werden. Soweit ein
              Anbieter unter dem EU-U.S. Data Privacy Framework zertifiziert
              ist, erfolgt die Übermittlung in die USA auf dieser Grundlage
              (Art. 45 DSGVO); andernfalls auf Grundlage der
              EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
            </p>
          </LegalBlock>

          <LegalBlock id="github" label="Live-Daten von GitHub" tight>
            <p>
              Die Seite zeigt öffentliche Repository-Daten (Commits, Sprachen,
              Zeitstempel), die serverseitig von der GitHub-API abgerufen
              werden. Dabei werden keine personenbezogenen Daten der
              Besucherinnen und Besucher an GitHub übermittelt.
            </p>
          </LegalBlock>

          <LegalBlock id="speicherung" label="Lokale Speicherung" tight>
            <p>
              Die Wahl des Farbschemas (hell/dunkel) wird ausschließlich lokal
              im Browser gespeichert (localStorage) und nicht an den Server
              übertragen. Es werden keine Tracking-Cookies gesetzt.
            </p>
          </LegalBlock>

          <LegalBlock id="rechte" label="Ihre Rechte">
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

        <aside className="mt-12 h-fit md:order-first md:sticky md:top-24 md:mt-0">
          <p className="font-mono text-2xs font-medium tracking-[0.2em] uppercase text-primary">
            <span aria-hidden="true">[ § ]</span> world 00 · legal
          </p>
          <p className="mt-3 font-mono text-2xs leading-relaxed text-muted-foreground">
            Informationen nach
            <br />
            Art. 13 DSGVO
          </p>
          <nav aria-label="Abschnitte" className="mt-6">
            <ul className="space-y-2">
              <li><a href="#verantwortlicher" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Verantwortlicher</a></li>
              <li><a href="#hosting" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Hosting & Logs</a></li>
              <li><a href="#kontakt" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Kontaktaufnahme</a></li>
              <li><a href="#empfaenger" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Empfänger</a></li>
              <li><a href="#github" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">GitHub-Daten</a></li>
              <li><a href="#speicherung" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Lokale Speicherung</a></li>
              <li><a href="#rechte" className="nav-link font-mono text-2xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">Ihre Rechte</a></li>
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
