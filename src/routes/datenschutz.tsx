import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/datenschutz")({
  component: DatenschutzPage,
  head: () => ({
    meta: [{ title: "Datenschutzerklärung – Horlama" }],
  }),
});

function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
        ← Zurück zur Startseite
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-foreground">Datenschutzerklärung</h1>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">1. Datenschutz auf einen Blick</h2>
          <p className="mt-2 text-muted-foreground">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
            Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Verantwortliche Stelle</h2>
          <p className="mt-2 text-muted-foreground">
            Verantwortlich für die Datenverarbeitung auf dieser Website:
            <br />
            <br />
            Agentur Simsek UG (haftungsbeschränkt)
            <br />
            Wohlers Allee 3, 22767 Hamburg
            <br />
            Geschäftsführer: Ismael Simsek
            <br />
            E-Mail: <a href="mailto:info@reichmacher.com" className="hover:text-primary">info@reichmacher.com</a>
            <br />
            Telefon: +49 40 2809 5260
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Datenerfassung auf dieser Website</h2>
          <p className="mt-2 text-muted-foreground">
            <strong className="text-foreground">Bestellformular:</strong> Wenn Sie über unser
            Bestellformular eine Bestellung aufgeben, erheben wir folgende Daten: Vor- und
            Nachname, E-Mail-Adresse, Telefonnummer (optional), Lieferadresse und gewählte
            Zahlungsart. Diese Daten werden ausschließlich zur Bestellabwicklung verwendet und an{" "}
            <a href="mailto:info@horlama.de" className="hover:text-primary">info@horlama.de</a>{" "}
            übermittelt.
          </p>
          <p className="mt-2 text-muted-foreground">
            <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b
            DSGVO (Vertragserfüllung).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Server-Log-Dateien</h2>
          <p className="mt-2 text-muted-foreground">
            Der Hosting-Anbieter dieser Website erhebt automatisch Informationen in sogenannten
            Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp,
            Betriebssystem, Referrer-URL, Hostname und Uhrzeit der Serveranfrage. Diese Daten sind
            nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen
            zusammengeführt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Cookies</h2>
          <p className="mt-2 text-muted-foreground">
            Diese Website verwendet keine Tracking-Cookies. Es werden ausschließlich technisch
            notwendige Cookies verwendet, die für den Betrieb der Website erforderlich sind.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Google Fonts</h2>
          <p className="mt-2 text-muted-foreground">
            Diese Website verwendet Google Fonts zur einheitlichen Darstellung von Schriften. Beim
            Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in seinen Browser-Cache.
            Hierbei wird Ihre IP-Adresse an Google übertragen. Rechtsgrundlage: Art. 6 Abs. 1 lit.
            f DSGVO. Weitere Informationen:{" "}
            
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline"
            >
              Google Datenschutzerklärung
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Ihre Rechte</h2>
          <p className="mt-2 text-muted-foreground">Sie haben jederzeit das Recht auf:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            Für Anfragen wenden Sie sich an:{" "}
            <a href="mailto:info@reichmacher.com" className="hover:text-primary">info@reichmacher.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Beschwerderecht</h2>
          <p className="mt-2 text-muted-foreground">
            Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren. Die
            zuständige Aufsichtsbehörde für Hamburg ist:
            <br />
            <br />
            Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit
            <br />
            Ludwig-Erhard-Str. 22, 20459 Hamburg
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Datensicherheit</h2>
          <p className="mt-2 text-muted-foreground">
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
            vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">Stand: Mai 2026</p>
      </div>
    </main>
  );
}
