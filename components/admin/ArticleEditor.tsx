"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Article } from "@/lib/types";

type Props = {
  article?: Article;
  isNew?: boolean;
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ArticleEditor({ article, isNew = false }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"content" | "seo">("content");

  const [form, setForm] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    excerpt: article?.excerpt ?? "",
    content: article?.content ?? "",
    coverImage: article?.coverImage ?? "",
    category: article?.category ?? "Conseils",
    published: article?.published ?? false,
    seo: {
      metaTitle: article?.seo?.metaTitle ?? "",
      metaDescription: article?.seo?.metaDescription ?? "",
      ogImage: article?.seo?.ogImage ?? "",
    },
  });

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: isNew ? slugify(title) : f.slug,
      seo: {
        ...f.seo,
        metaTitle: isNew ? title : f.seo.metaTitle,
      },
    }));
  }

  async function handleSave(published?: boolean) {
    setSaving(true);
    const payload = {
      ...form,
      published: published !== undefined ? published : form.published,
    };

    const url = isNew ? "/api/articles" : `/api/articles/${article!.id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    }
    setSaving(false);
  }

  const metaTitleLen = form.seo.metaTitle.length;
  const metaDescLen = form.seo.metaDescription.length;

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Main editor */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-zinc-100 px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin")}
              className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              Retour
            </button>
            <span className="text-zinc-200">/</span>
            <span className="text-sm font-medium text-zinc-700">
              {isNew ? "Nouvel article" : "Modifier l'article"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              form.published ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-500"
            }`}>
              {form.published ? "Publie" : "Brouillon"}
            </span>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="text-sm font-medium text-zinc-600 border border-zinc-200 px-4 py-2 rounded-xl hover:bg-zinc-50 transition-all disabled:opacity-50"
            >
              Enregistrer brouillon
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="text-sm font-semibold bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saving ? "Enregistrement..." : "Publier"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-zinc-100 px-8 flex gap-1">
          {(["content", "seo"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {t === "content" ? "Contenu" : "SEO"}
            </button>
          ))}
        </div>

        <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
          {tab === "content" && (
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Titre de l'article"
                  className="w-full text-2xl font-semibold text-zinc-900 border-0 border-b border-zinc-100 pb-3 outline-none focus:border-orange-400 transition-colors bg-transparent placeholder:text-zinc-300"
                />
              </div>

              {/* Slug & category row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Slug URL
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-zinc-400">/blog/</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                      className="flex-1 border border-zinc-200 rounded-lg px-3 py-2 text-sm font-mono text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Categorie
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                  >
                    {["Conseils", "Airbnb", "Gestion locative", "Experience voyageur", "Mise en avant"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover image */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Image de couverture (URL)
                </label>
                <input
                  type="url"
                  value={form.coverImage}
                  onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
                  placeholder="https://..."
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                />
                {form.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.coverImage} alt="preview" className="mt-2 h-32 w-full object-cover rounded-lg" />
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Extrait (chapeau)
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={2}
                  placeholder="Une phrase qui resume l'article..."
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Contenu (HTML)
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={20}
                  placeholder="<h2>Introduction</h2><p>Votre contenu ici...</p>"
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm font-mono text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all resize-y"
                />
                <p className="text-xs text-zinc-400 mt-1.5">Supporte le HTML : h2, h3, p, ul, li, strong, em, a, blockquote, code</p>
              </div>
            </div>
          )}

          {tab === "seo" && (
            <div className="flex flex-col gap-6">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <p className="text-sm font-semibold text-blue-800">Conseils SEO</p>
                <ul className="mt-2 text-xs text-blue-700 space-y-1 list-disc list-inside">
                  <li>Meta title : 50-60 caracteres idealement</li>
                  <li>Meta description : 120-160 caracteres</li>
                  <li>Incluez le mot-cle principal dans le titre et la description</li>
                </ul>
              </div>

              {/* Meta title */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Meta Title
                  </label>
                  <span className={`text-xs font-mono ${metaTitleLen > 60 ? "text-red-500" : metaTitleLen > 50 ? "text-orange-500" : "text-zinc-400"}`}>
                    {metaTitleLen}/60
                  </span>
                </div>
                <input
                  type="text"
                  value={form.seo.metaTitle}
                  onChange={(e) => setForm((f) => ({ ...f, seo: { ...f.seo, metaTitle: e.target.value } }))}
                  placeholder={form.title || "Titre SEO de la page"}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                />
              </div>

              {/* Meta description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Meta Description
                  </label>
                  <span className={`text-xs font-mono ${metaDescLen > 160 ? "text-red-500" : metaDescLen > 120 ? "text-orange-500" : "text-zinc-400"}`}>
                    {metaDescLen}/160
                  </span>
                </div>
                <textarea
                  value={form.seo.metaDescription}
                  onChange={(e) => setForm((f) => ({ ...f, seo: { ...f.seo, metaDescription: e.target.value } }))}
                  rows={3}
                  placeholder={form.excerpt || "Description qui apparait dans Google..."}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all resize-none"
                />
              </div>

              {/* OG Image */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Image Open Graph (partage reseaux sociaux)
                </label>
                <input
                  type="url"
                  value={form.seo.ogImage}
                  onChange={(e) => setForm((f) => ({ ...f, seo: { ...f.seo, ogImage: e.target.value } }))}
                  placeholder={form.coverImage || "https://... (1200x630px recommande)"}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                />
              </div>

              {/* Google preview */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Apercu Google
                </label>
                <div className="bg-white border border-zinc-200 rounded-2xl p-5 max-w-lg">
                  <p className="text-xs text-zinc-400">bunkly.co/blog/{form.slug || "slug-de-larticle"}</p>
                  <p className="text-base font-medium text-blue-700 mt-1 leading-snug">
                    {form.seo.metaTitle || form.title || "Titre de l'article"}
                  </p>
                  <p className="text-sm text-zinc-600 mt-1 leading-relaxed line-clamp-2">
                    {form.seo.metaDescription || form.excerpt || "Description de l'article qui apparait dans les resultats Google."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
