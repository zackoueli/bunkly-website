"use client";

import { useState } from "react";

type Config = {
  siteTitle?: string;
  siteDescription?: string;
  ogImage?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
};

export function SeoSettings({ initialConfig }: { initialConfig: Config }) {
  const [config, setConfig] = useState<Config>({
    siteTitle: initialConfig.siteTitle ?? "Bunkly - Livrets d'accueil digitaux pour vos locations",
    siteDescription: initialConfig.siteDescription ?? "Creez un livret d'accueil professionnel pour votre Airbnb, gite ou camping en quelques minutes.",
    ogImage: initialConfig.ogImage ?? "",
    twitterHandle: initialConfig.twitterHandle ?? "@bunkly_co",
    canonicalUrl: initialConfig.canonicalUrl ?? "https://bunkly.co",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-zinc-700 border-b border-zinc-100 pb-4">
          Page d&apos;accueil
        </h2>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Title tag
            </label>
            <span className={`text-xs font-mono ${config.siteTitle && config.siteTitle.length > 60 ? "text-red-500" : "text-zinc-400"}`}>
              {config.siteTitle?.length ?? 0}/60
            </span>
          </div>
          <input
            type="text"
            value={config.siteTitle}
            onChange={(e) => setConfig((c) => ({ ...c, siteTitle: e.target.value }))}
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Meta description
            </label>
            <span className={`text-xs font-mono ${config.siteDescription && config.siteDescription.length > 160 ? "text-red-500" : "text-zinc-400"}`}>
              {config.siteDescription?.length ?? 0}/160
            </span>
          </div>
          <textarea
            value={config.siteDescription}
            onChange={(e) => setConfig((c) => ({ ...c, siteDescription: e.target.value }))}
            rows={3}
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Image Open Graph (1200x630px)
          </label>
          <input
            type="url"
            value={config.ogImage}
            onChange={(e) => setConfig((c) => ({ ...c, ogImage: e.target.value }))}
            placeholder="https://..."
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
          />
          {config.ogImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={config.ogImage} alt="OG preview" className="mt-2 h-32 w-full object-cover rounded-lg border border-zinc-100" />
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-zinc-700 border-b border-zinc-100 pb-4">
          Divers
        </h2>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            URL canonique
          </label>
          <input
            type="url"
            value={config.canonicalUrl}
            onChange={(e) => setConfig((c) => ({ ...c, canonicalUrl: e.target.value }))}
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Twitter/X Handle
          </label>
          <input
            type="text"
            value={config.twitterHandle}
            onChange={(e) => setConfig((c) => ({ ...c, twitterHandle: e.target.value }))}
            placeholder="@bunkly_co"
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
          />
        </div>
      </div>

      {/* Google preview */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6">
        <h2 className="text-sm font-semibold text-zinc-700 border-b border-zinc-100 pb-4 mb-4">
          Apercu Google
        </h2>
        <div className="max-w-lg">
          <p className="text-xs text-zinc-400">{config.canonicalUrl}</p>
          <p className="text-base font-medium text-blue-700 mt-1">{config.siteTitle}</p>
          <p className="text-sm text-zinc-600 mt-1 leading-relaxed line-clamp-2">{config.siteDescription}</p>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className={`font-semibold px-6 py-3 rounded-xl text-sm transition-all active:scale-[0.98] ${
          saved
            ? "bg-green-500 text-white"
            : "bg-orange-500 text-white hover:bg-orange-600"
        } disabled:opacity-50`}
      >
        {saving ? "Enregistrement..." : saved ? "Enregistre !" : "Enregistrer les modifications"}
      </button>
    </div>
  );
}
