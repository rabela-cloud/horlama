
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  component: ImpressumPage,
  head: () => ({
    meta: [{ title: "Impressum – Horlama" }],
  }),
});

function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
        ← Zurück zur Startseite
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-foreground">Impressum</h1>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
          <p className="mt-2 text-muted-foreground">
            Agentur Simsek UG (haftungsbeschränkt)
            <br />
            Wohlers Allee 3
            <br />
            22767 Hamburg
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Vertreten durch</h2>
          <p className="mt-2 text-muted-foreground">Geschäftsführer: Ismael Simsek</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Kontakt</h2>
          <p className="mt-2 text-muted-foreground">
            Telefon: <a href="tel:+494028095260" className="hover:text-primary">+49 40 2809 5260</a>
            <br />
            E-Mail: <a href="mailto:info@reichmacher.com" className="hover:text-primary">info@reichmacher.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Registereintrag</h2>
          <p className="mt-2 text-muted-foreground">
            Eintragung im Handelsregister.
            <br />
            Registergericht: Amtsgericht Hamburg
            <br />
            Registernummer: HRB 171307
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Umsatzsteuer</h2>
          <p className="mt-2 text-muted-foreground">
            USt. wird nicht ausgewiesen, da der Verkäufer Kleinunternehmer im Sinne des § 19 UStG ist.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">BAFA-Berater</h2>
          <p className="mt-2 text-muted-foreground">Zugelassener BAFA-Berater: BAFA-Id.: 177132</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Redaktionell verantwortlich</h2>
          <p className="mt-2 text-muted-foreground">
            Agentur Simsek UG, vertreten durch Ismael Simsek
            <br />
            Wohlers Allee 3, 22767 Hamburg
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Verbraucherstreitbeilegung</h2>
          <p className="mt-2 text-muted-foreground">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Zentrale Kontaktstelle nach dem Digital Services Act (DSA)
          </h2>
          <p className="mt-2 text-muted-foreground">
            Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA:
            <br />
            E-Mail: <a href="mailto:info@reichmacher.com" className="hover:text-primary">info@reichmacher.com</a>
            <br />
            Telefon: +49 40 2809 5260
            <br />
            Verfügbare Sprachen: Deutsch und Englisch
          </p>
        </section>
      </div>
    </main>
  );
}
