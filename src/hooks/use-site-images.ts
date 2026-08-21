import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import heroImage from "@/assets/produkt-hero-neu.png";
import productImage from "@/assets/horlama-produkt.jpg";
import anwendungImage from "@/assets/horlama-anwendung.jpg";
import boxImage from "@/assets/horlama-box.jpg";
import aufbauImage from "@/assets/gaumentrainer-aufbau.jpg";
import studieImage from "@/assets/horlama-studie-chart.png";
import anatomieImage from "@/assets/horlama-anatomie.png";

export const IMAGE_SLOTS = [
  { key: "hero", label: "Titelbild (Hero)", fallback: heroImage },
  { key: "produkt", label: "Bild im Bestellbereich", fallback: productImage },
  { key: "anwendung", label: "Anwendung / Übungsgrafik", fallback: anwendungImage },
  { key: "box", label: "Aufbewahrungsbox", fallback: boxImage },
  { key: "anatomie", label: "Anatomische Darstellung", fallback: anatomieImage },
  { key: "studie", label: "Studien-Diagramm", fallback: studieImage },
  { key: "aufbau", label: "Aufbau & Funktion", fallback: aufbauImage },
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
