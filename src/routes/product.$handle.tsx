import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, Loader2, Moon } from "lucide-react";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cart";
import { CartDrawer } from "@/components/cart-drawer";

const productQueryOptions = (handle: string) => ({
  queryKey: ["shopify-product", handle],
  queryFn: () => fetchProductByHandle(handle),
});

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `Produkt – ${params.handle}` },
      { name: "description", content: "Horlama Gaumentrainer – Details und Kauf" },
      { property: "og:title", content: `Produkt – ${params.handle}` },
      { property: "og:description", content: "Horlama Gaumentrainer – Details und Kauf" },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `/product/${params.handle}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/product/${params.handle}` }],
  }),
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(productQueryOptions(params.handle));
  },
});

function ProductPage() {
  const { handle } = Route.useParams();
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
            <Moon className="h-6 w-6 text-primary" />
            <span>Horlama</span>
          </Link>
          <CartDrawer />
        </div>
      </header>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent handle={handle} />
      </Suspense>
    </>
  );
}

function ProductSkeleton() {
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-7xl py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
          <div className="space-y-6">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-32 w-full animate-pulse rounded bg-muted" />
            <div className="h-12 w-48 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductContent({ handle }: { handle: string }) {
  const { data: product } = useSuspenseQuery(productQueryOptions(handle));
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.node.variants.edges[0]?.node.id || "",
  );
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const selectedVariant = useMemo(
    () => product?.node.variants.edges.find((v) => v.node.id === selectedVariantId)?.node,
    [product, selectedVariantId],
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-background px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-semibold text-foreground">Produkt nicht gefunden</h1>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Startseite
            </Link>
          </Button>
        </div>
      </main>
    );
  }

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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </Button>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            {product.node.images.edges[0]?.node && (
              <img
                src={product.node.images.edges[0].node.url}
                alt={product.node.images.edges[0].node.altText || product.node.title}
                width={800}
                height={800}
                className="w-full rounded-2xl bg-card shadow-sm"
              />
            )}
          </div>
          <div>
            <Badge className="mb-4 bg-accent/80 text-accent-foreground hover:bg-accent/80">
              Weltneuheit mit Patent
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.node.title}
            </h1>
            <p className="mt-4 whitespace-pre-line text-muted-foreground">{product.node.description}</p>

            <div className="mt-8">
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

            <div className="mt-8 rounded-2xl bg-secondary/50 p-6">
              <div className="text-3xl font-bold text-foreground">
                {selectedVariant?.price.currencyCode} {" "}
                {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
