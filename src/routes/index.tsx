import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Moon,
  HeartPulse,
  Award,
  Truck,
  RefreshCw,
  Check,
  Instagram,
  Music2,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { getShopifyProducts } from "@/lib/shopify.functions";
import { useCartStore, type CartItem } from "@/stores/cart";
import { CartDrawer } from "@/components/cart-drawer";
import type { ShopifyProduct } from "@/lib/shopify";
import { ProductInfoSection } from "@/components/product-info";

const productQueryOptions = {
  queryKey: ["shopify-products"],
  queryFn: () => getShopifyProducts(),
};

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Schnarchschiene Pro – Patentierte Anti-Schnarch-Lösung" },
      {
        name: "description",
        content:
          "Die weltweit erste patentierte Schnarchschiene mit Jaw-Advancement-Technologie. Endlich ruhig schlafen – für dich und deinen Partner.",
      },
      { property: "og:title", content: "Schnarchschiene Pro – Patentierte Anti-Schnarch-Lösung" },
      {
        property: "og:description",
        content:
          "Die weltweit erste patentierte Schnarchschiene mit Jaw-Advancement-Technologie.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(productQueryOptions);
  },
});

function LandingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<LandingSkeleton />}>
        <LandingContent />
      </Suspense>
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
          <Moon className="h-6 w-6 text-primary" />
          <span>SleepSoundly</span>
        </Link>
        <div className="flex items-center gap-3">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}

function LandingSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="h-8 w-32 animate-pulse rounded-full bg-muted" />
            <div className="h-16 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-12 w-48 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    </main>
  );
}

function LandingContent() {
  const { data: products } = useSuspenseQuery(productQueryOptions);
  const product = products?.[0];

  if (!product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground">Noch kein Produkt vorhanden</h1>
          <p className="mt-2 text-muted-foreground">
            Sag mir, welches Produkt du verkaufen möchtest, und ich lege es an.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection product={product} />
      <TrustSection />
      <BenefitsSection />
      <HowItWorksSection />
      <ProductInfoSection />
      <ProductSection product={product} />
      <SocialSection />
      <FaqSection />
      <Footer />
    </main>
  );
}

function HeroSection({ product }: { product: ShopifyProduct }) {
  const firstImage = product.node.images.edges[0]?.node.url;
  const firstVariant = product.node.variants.edges[0]?.node;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <Badge className="bg-accent/80 text-accent-foreground hover:bg-accent/80">
              <Award className="mr-1 h-3 w-3" /> Weltneuheit mit Patent
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Endlich wieder durchschlafen.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Die <strong>Schnarchschiene Pro</strong> ist die weltweit erste Anti-Schnarch-Lösung
              mit patentierter Jaw-Advancement-Technologie. Medizinisches Silikon, BPA-frei,
              anpassbar an jeden Kiefer.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold text-foreground">
                {firstVariant?.price.currencyCode} {parseFloat(firstVariant?.price.amount || "0").toFixed(2)}
              </span>
              {firstVariant?.price.amount && firstVariant.price.amount !== firstVariant.price.amount && (
                <span className="text-lg text-muted-foreground line-through">
                  {firstVariant.price.currencyCode} {parseFloat(firstVariant.price.amount).toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8 text-base">
                <a href="#produkt">
                  Jetzt bestellen <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
                <a href="#downloads">Patent &amp; Infos als PDF</a>
              </Button>
            </div>
            <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {["Kostenloser Versand", "30 Tage Geld-zurück", "Medizinisches Silikon", "Patentierte Technologie"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />
            {firstImage ? (
              <img
                src={firstImage}
                alt={product.node.images.edges[0]?.node.altText || product.node.title}
                width={600}
                height={600}
                className="relative z-10 rounded-3xl bg-card shadow-2xl"
              />
            ) : (
              <div className="relative z-10 aspect-square w-full max-w-md rounded-3xl bg-muted" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const badges = [
    { icon: Award, label: "Patentiert" },
    { icon: HeartPulse, label: "Medizinisch geprüft" },
    { icon: ShieldCheck, label: "BPA-frei" },
    { icon: Truck, label: "Kostenloser Versand" },
    { icon: RefreshCw, label: "30 Tage Rückgabe" },
  ];

  return (
    <section className="border-y border-border bg-card py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {badges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-card-foreground">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: "Patentierte Technologie",
      description:
        "Unsere einzigartige Jaw-Advancement-Technologie hält den Unterkiefer sanft in der richtigen Position.",
    },
    {
      title: "Sofortige Wirkung",
      description: "Viele Nutzer berichten von deutlich weniger Schnarchen bereits ab der ersten Nacht.",
    },
    {
      title: "Maximaler Komfort",
      description:
        "Weiches, medizinisches Silikon passt sich deinem Gebiss an – ohne Druckstellen oder unangenehmen Geruch.",
    },
    {
      title: "Hygienisch & Langlebig",
      description:
        "Inklusive durchdachter Aufbewahrungsbox. Einfach reinigen, trocknen, verstauen.",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Warum Schnarchschiene Pro?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Entwickelt für besseren Schlaf – wissenschaftlich fundiert und praxiserprobt.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { step: "01", title: "Anpassen", desc: "Die Schiene in heißem Wasser kurz erwärmen und am Gebiss formen." },
    { step: "02", title: "Einsetzen", desc: "Vor dem Schlafengehen komfortabel einsetzen – sie hält den ganzen Abend." },
    { step: "03", title: "Durchschlafen", desc: "Der Unterkiefer bleibt leicht vorgezogen, der Rachenraum bleibt offen." },
  ];

  return (
    <section id="wie-es-funktioniert" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">So funktioniert's</h2>
          <p className="mt-4 text-lg text-muted-foreground">In drei einfachen Schritten zu ruhigeren Nächten.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="relative rounded-2xl bg-card p-8 shadow-sm">
              <span className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {s.step}
              </span>
              <h3 className="mb-3 mt-4 text-xl font-semibold text-card-foreground">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection({ product }: { product: ShopifyProduct }) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.node.variants.edges[0]?.node.id || "",
  );
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const selectedVariant = useMemo(
    () => product.node.variants.edges.find((v) => v.node.id === selectedVariantId)?.node,
    [product, selectedVariantId],
  );

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
  };

  return (
    <section id="produkt" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            {product.node.images.edges.map((img, idx) => (
              <img
                key={img.node.url}
                src={img.node.url}
                alt={img.node.altText || product.node.title}
                width={800}
                height={idx === 1 ? 500 : 800}
                loading={idx === 0 ? "eager" : "lazy"}
                className="w-full rounded-2xl bg-card shadow-sm"
              />
            ))}
          </div>
          <div className="lg:sticky lg:top-24">
            <Badge className="mb-4 bg-accent/80 text-accent-foreground hover:bg-accent/80">
              Nur noch wenige auf Lager
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.node.title}
            </h2>
            <p className="mt-4 whitespace-pre-line text-muted-foreground">{product.node.description}</p>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">Set wählen</label>
                <div className="grid grid-cols-2 gap-3">
                  {product.node.variants.edges.map(({ node: variant }) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                        selectedVariantId === variant.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold text-foreground">{variant.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
                      </div>
                      {selectedVariantId === variant.id && (
                        <Check className="absolute right-3 top-3 h-5 w-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-secondary/50 p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-foreground">
                    {selectedVariant?.price.currencyCode} {" "}
                    {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {selectedVariant?.price.currencyCode} {" "}
                    {selectedVariant?.title === "Einzeln" ? "69,00" : "119,00"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Inkl. MwSt. zzgl. Versand</p>
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || !selectedVariant?.availableForSale}
                  size="lg"
                  className="mt-6 w-full rounded-full text-base"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  In den Warenkorb
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Sicherer Checkout über Shopify. 30 Tage Geld-zurück-Garantie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-accent/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Social Media</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Folge uns auf TikTok & Instagram
            </h2>
            <p className="text-lg text-muted-foreground">
              Sieh dir an, wie unsere Community mit der Schnarchschiene Pro endlich wieder durchschläft.
              Tipps, Hacks und echte Erfahrungsberichte – direkt auf deinem Feed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full gap-2">
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <Music2 className="h-4 w-4" /> TikTok
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full gap-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { stat: "#1", label: "Trending Thema Schlaf" },
              { stat: "Täglich", label: "Neue Tipps & Hacks" },
              { stat: "Community", label: "Echte Erfahrungen" },
              { stat: "Exklusiv", label: "Rabatte für Follower" },
            ].map((item) => (
              <Card key={item.label} className="border-border bg-card/80">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">{item.stat}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "Wie schnell wirkt die Schnarchschiene Pro?",
      a: "Viele Nutzer berichten von einer spürbaren Verbesserung bereits ab der ersten Nacht. Die volle Gewöhnung erfolgt in der Regel innerhalb von 3–7 Tagen.",
    },
    {
      q: "Ist die Schiene für jeden Kiefer geeignet?",
      a: "Ja. Das medizinische Silikon wird in heißem Wasser weich und lässt sich individuell an dein Gebiss anpassen.",
    },
    {
      q: "Wie pflege ich die Schnarchschiene richtig?",
      a: "Nach jedem Gebrauch unter lauwarmem Wasser abspülen und in der mitgelieferten Box trocknen lassen. Gelegentlich mit einer milden Seife reinigen.",
    },
    {
      q: "Gibt es eine Geld-zurück-Garantie?",
      a: "Ja. Du hast 30 Tage Zeit, das Produkt zu testen. Wenn du nicht zufrieden bist, erstatten wir dir den Kaufpreis.",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Häufige Fragen</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
              <AccordionTrigger className="text-left text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2 font-bold text-lg text-card-foreground">
            <Moon className="h-5 w-5 text-primary" />
            <span>SleepSoundly</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SleepSoundly. Patentierte Anti-Schnarch-Lösung.
          </p>
          <div className="flex gap-4">
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <Music2 className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
