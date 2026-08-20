import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  component: KontaktPage,
  head: () => ({
    meta: [{ title: "Kontakt – Horlama" }],
  }),
});

function KontaktPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
        ← Zurück zur Startseite
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-foreground">Kontakt</h1>
      <p className="mt-3 text-muted-foreground">
        Haben Sie Fragen zu Horlama? Wir freuen uns auf Ihre Nachricht.
      </p>

      <div className="mt-10 space-y-6">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">Agentur Simsek UG (haftungsbeschränkt)</p>
            <p className="text-muted-foreground">Wohlers Allee 3, 22767 Hamburg</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary" />
          <a href="tel:+494028095260" className="text-foreground hover:text-primary">
            +49 40 2809 5260
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" />
          <a href="mailto:info@horlama.de" className="text-foreground hover:text-primary">
            info@horlama.de
          </a>
        </div>
      </div>
    </main>
  );
}
