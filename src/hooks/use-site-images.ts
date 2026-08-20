import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import heroImage from "@/assets/produkt-hero-neu.png.asset.json";
import productImage from "@/assets/produkt-hero.jpg.asset.json";
import anwendungImage from "@/assets/anwendung.jpg.asset.json";
import boxImage from "@/assets/box.jpg.asset.json";
import aufbauImage from "@/assets/aufbau.jpg.asset.json";
import studieImage from "@/assets/studie-chart.png.asset.json";
import anatomieImage from "@/assets/anatomie.png.asset.json";

export const IMAGE_SLOTS = [
  { key: "hero", label: "Titelbild (Hero)", fallback: heroImage.url },
  { key: "produkt", label: "Bild im Bestellbereich", fallback: productImage.url },
  { key: "anwendung", label: "Anwendung / Übungsgrafik", fallback: anwendungImage.url },
  { key: "box", label: "Aufbewahrungsbox", fallback: boxImage.url },
  { key: "anatomie", label: "Anatomische Darstellung", fallback: anatomieImage.url },
  { key: "studie", label: "Studien-Diagramm", fallback: studieImage.url },
  { key: "aufbau", label: "Aufbau & Funktion", fallback: aufbauImage.url },
] as const;

export type ImageSlotKey = (typeof IMAGE_SLOTS)[number]["key"];

export const siteImagesQuery = {
  queryKey: ["site-images"],
  queryFn: async () => {
    const { data, error } = await supabase.from("site_images").select("key,url");
    if (error) throw error;
    const map: Record<string, string> = {};
    for (const row of data ?? []) map[row.key] = row.url;
    return map;
  },
  staleTime: 60_000,
};

export function useSiteImages() {
  const { data } = useQuery(siteImagesQuery);
  return (key: ImageSlotKey) =>
    data?.[key] ?? IMAGE_SLOTS.find((slot) => slot.key === key)!.fallback;
}
