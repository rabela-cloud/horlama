import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { IMAGE_SLOTS, siteImagesQuery } from "@/hooks/use-site-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Bildverwaltung – Horlama" },
      { name: "description", content: "Bilder der Horlama-Website verwalten und austauschen." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Bildverwaltung – Horlama" },
      { property: "og:description", content: "Bilder der Horlama-Website verwalten und austauschen." },
    ],
  }),
  component: AdminPage,
});

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const { data: images } = useQuery(siteImagesQuery);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) navigate({ to: "/auth" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!session) return;
    supabase.rpc("claim_admin").then(({ data, error }) => {
      if (error) {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(Boolean(data));
    });
  }, [session]);

  const upload = async (key: string, file: File) => {
    setBusy(key);
    try {
      const path = `${key}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
      const { error: uploadError } = await supabase.storage.from("site-images").upload(path, file, {
        cacheControl: "31536000",
        upsert: true,
      });
      if (uploadError) throw uploadError;
      const { data: signed, error: signError } = await supabase.storage
        .from("site-images")
        .createSignedUrl(path, TEN_YEARS);
      if (signError || !signed) throw signError ?? new Error("URL konnte nicht erstellt werden");
      const { error: dbError } = await supabase
        .from("site_images")
        .upsert({ key, url: signed.signedUrl, updated_at: new Date().toISOString() });
      if (dbError) throw dbError;
      await queryClient.invalidateQueries({ queryKey: ["site-images"] });
      toast.success("Bild aktualisiert");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload fehlgeschlagen");
    } finally {
      setBusy(null);
    }
  };

  const reset = async (key: string) => {
    setBusy(key);
    const { error } = await supabase.from("site_images").delete().eq("key", key);
    setBusy(null);
    if (error) return toast.error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["site-images"] });
    toast.success("Originalbild wiederhergestellt");
  };

  if (!session) return null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bildverwaltung</h1>
          <p className="text-sm text-muted-foreground">Angemeldet als {session.user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/">Zur Website</Link>
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            Abmelden
          </Button>
        </div>
      </div>

      {isAdmin === false && (
        <p className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
          Dieses Konto hat keine Administratorrechte. Nur das zuerst registrierte Konto kann Bilder ändern.
        </p>
      )}

      <div className="space-y-4">
        {IMAGE_SLOTS.map((slot) => {
          const current = images?.[slot.key] ?? slot.fallback;
          const isCustom = Boolean(images?.[slot.key]);
          return (
            <Card key={slot.key}>
              <CardHeader>
                <CardTitle className="text-base">{slot.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-6">
                <img
                  src={current}
                  alt={slot.label}
                  className="h-24 w-24 rounded-md border border-border object-contain"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isAdmin !== true || busy === slot.key}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void upload(slot.key, file);
                      event.target.value = "";
                    }}
                    className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:text-primary-foreground"
                  />
                  {isCustom && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isAdmin !== true || busy === slot.key}
                      onClick={() => void reset(slot.key)}
                    >
                      Zurücksetzen
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
