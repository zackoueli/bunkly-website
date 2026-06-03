import { AdminNav } from "@/components/admin/AdminNav";
import { SeoSettings } from "@/components/admin/SeoSettings";
import { adminDb } from "@/lib/firebase-admin";

export const revalidate = 0;

async function getSeoConfig() {
  try {
    const doc = await adminDb.collection("site_config").doc("seo").get();
    return doc.exists ? doc.data() : {};
  } catch {
    return {};
  }
}

export default async function SeoPage() {
  const config = await getSeoConfig();

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900">SEO global</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Parametres SEO de la page d&apos;accueil et du site
          </p>
        </div>
        <SeoSettings initialConfig={config ?? {}} />
      </main>
    </div>
  );
}
