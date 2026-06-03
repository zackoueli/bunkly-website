import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";
import type { Article } from "@/lib/types";
import { AdminNav } from "@/components/admin/AdminNav";
import { ArticleActions } from "@/components/admin/ArticleActions";

export const revalidate = 0;

async function getArticles(): Promise<Article[]> {
  try {
    const snap = await adminDb
      .collection("blog_articles")
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article));
  } catch {
    return [];
  }
}

export default async function AdminDashboard() {
  const articles = await getArticles();
  const published = articles.filter((a) => a.published).length;
  const drafts = articles.filter((a) => !a.published).length;

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Articles</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {published} publie{published > 1 ? "s" : ""} - {drafts} brouillon{drafts > 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/admin/articles/new"
            className="bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all text-sm"
          >
            + Nouvel article
          </Link>
        </div>

        {/* Articles table */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-100 p-16 text-center">
            <p className="text-zinc-400">Aucun article. Creez votre premier article !</p>
            <Link
              href="/admin/articles/new"
              className="inline-flex mt-4 bg-orange-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-orange-600 transition-all"
            >
              Creer un article
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Titre</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Categorie</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Statut</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-zinc-900 line-clamp-1">{article.title}</p>
                      <p className="text-xs text-zinc-400 mt-0.5 font-mono">/blog/{article.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-lg">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        article.published
                          ? "bg-green-50 text-green-700"
                          : "bg-zinc-100 text-zinc-500"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${article.published ? "bg-green-500" : "bg-zinc-400"}`} />
                        {article.published ? "Publie" : "Brouillon"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-400">
                      {new Date(article.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4">
                      <ArticleActions article={article} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
