import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, FlaskConical, Sparkles, Droplets, Brain } from "lucide-react";
import patentPdf from "@/assets/patent.pdf.asset.json";
import produktinfoPdf from "@/assets/produktinfo.pdf.asset.json";
import aufbauImage from "@/assets/aufbau.jpg.asset.json";
import studieImage from "@/assets/studie-chart.png.asset.json";
import anatomieImage from "@/assets/anatomie.png.asset.json";

const features = [
  "Strafft das Gaumengewebe und reduziert Schnarchgeräusche",
  "Nur 30 Minuten tägliches Training (3 × 10 Minuten)",
  "Kein nächtlicher Einsatz nötig – nichts im Mund beim Schlafen",
  "Sitzt nur am Gaumen: der Unterkiefer bleibt beweglich",
  "Medizinischer Kunststoff (USP Class VI), frei von Allergenen",
  "Made in Germany: entwickelt und hergestellt in Deutschland",
  "Sofort einsatzbereit, inkl. steriler Aufbewahrungsbox",
  "PZN (Pharmazentralnummer): 18299407",
];

const parts = [
  { n: "1", t: "Adaptationsspalt", d: "Zum Anpassen an die Gaumenbreite" },
  { n: "2", t: "Hinterer Randwulst", d: "Als Widerlager für den Gaumen" },
  { n: "3", t: "Zahn-Biss-Platte", d: "Zur Fixation des Gaumentrainers" },
  { n: "4", t: "Oberseite", d: "Zur Abstützung am harten Gaumen" },
  { n: "5", t: "Korrekturkerbe", d: "Zur Reduktion der Breite des Gaumentrainers" },
];

export function ProductInfoSection() {
  return (
    <section id="wissenschaft" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            <FlaskConical className="mr-1 h-3 w-3" /> Wissenschaftliche Grundlage
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Behandelt die Ursache, nicht nur das Symptom
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Schnarchgeräusche entstehen laut Deutscher Gesellschaft für Schlafmedizin durch die
            Vibration des weichen Gaumens und des Zäpfchens – begünstigt durch nachlassende
            Muskelspannung. Der Gaumentrainer strafft diese Muskulatur durch tägliches Training und
            wirkt der Vibration entgegen. Entwickelt wurde er von Prof. Dr. Dr. Kai-Olaf Henkel,
            klinischer Direktor für Mund-, Kiefer- und Gesichtschirurgie am Bundeswehrkrankenhaus
            Hamburg.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Ergebnisse der Studie</h3>
            <p className="text-muted-foreground">
              Grundlage ist eine Dissertation mit 102 Teilnehmern (Ahmed F: Analyse verschiedener
              Therapieformen des Schnarchens und Untersuchung des isometrischen Muskelaufbaus durch
              den Pharynxmuskeltrainer; Med. Diss. Hamburg 2020).
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { v: "−69 %", l: "Schnarchlautstärke nach 4 Wochen" },
                { v: "1,4", l: "Durchschnittliche Bewertung der Anwendung" },
                { v: "100 %", l: "fühlten sich morgens ausgeruhter" },
              ].map((s) => (
                <Card key={s.l} className="border-border bg-card">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-primary">{s.v}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Zusätzlich wurde in einer Schlaflaborstudie am Bundeswehrkrankenhaus Hamburg der
              AHI-Wert deutlich gesenkt sowie Sauerstoffsättigung und Herzfrequenz signifikant
              verbessert.
            </p>
          </div>
          <img
            src={studieImage.url}
            alt="Diagramm: Entwicklung der Schnarchintensität über die Wochen der Anwendung"
            loading="lazy"
            className="w-full rounded-2xl bg-card p-4 shadow-sm"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <img
            src={aufbauImage.url}
            alt="Aufbau des Gaumentrainers mit Adaptationsspalt, Randwulst, Zahn-Biss-Platte, Oberseite und Korrekturkerbe"
            loading="lazy"
            className="w-full rounded-2xl bg-card shadow-sm"
          />
          <div>
            <h3 className="text-2xl font-semibold text-foreground">Aufbau &amp; Funktion</h3>
            <ul className="mt-6 space-y-4">
              {parts.map((p) => (
                <li key={p.n} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {p.n}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{p.t}</div>
                    <div className="text-sm text-muted-foreground">{p.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="border-border bg-card">
            <CardContent className="space-y-3 pt-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">Hauptmerkmale</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="space-y-3 pt-6">
              <Brain className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">
                Stimulation von 5 Hirnnerven
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Die Übungen stimulieren fünf Hirnnerven, die für die Motorik in der Mundhöhle
                zuständig sind. Eine oropharyngeale Stimulation kann sich positiv auf
                Schluckstörungen und die Besserung der Hirnfunktion nach einem Schlaganfall
                auswirken.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="space-y-3 pt-6">
              <Droplets className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">Reinigung &amp; Haltbarkeit</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Mindestens einmal täglich mit Zahnbürste und Zahnpasta reinigen und unter fließendem
                Wasser abspülen. Nicht in kochendes Wasser legen oder in den Geschirrspüler geben –
                die Form ist maßgeblich für die Wirkung. Aus hygienischen Gründen spätestens nach
                einem Jahr erneuern. Hygieneartikel sind vom Umtausch ausgeschlossen.
              </p>
            </CardContent>
          </Card>
        </div>

        <div id="downloads" className="rounded-3xl bg-card p-8 shadow-sm sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-3">
              <Badge className="bg-accent/80 text-accent-foreground hover:bg-accent/80">
                <FileText className="mr-1 h-3 w-3" /> Dokumentation
              </Badge>
              <h3 className="text-2xl font-bold text-card-foreground">
                Patent &amp; Produktinformationen als PDF
              </h3>
              <p className="text-muted-foreground">
                Alle Details zur patentierten Weltneuheit, zur klinischen Prüfung und zur Anwendung –
                zum Herunterladen und in Ruhe nachlesen.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild size="lg" className="rounded-full">
                <a href={patentPdf.url} download target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Patent-Dokumentation (PDF)
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href={produktinfoPdf.url} download target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Produktinformation (PDF)
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
