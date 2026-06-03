import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { adminDb } from "@/lib/firebase-admin";
import type { Article } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog Bunkly — Conseils pour hotes Airbnb et gites",
  description:
    "Conseils pratiques pour ameliorer l'accueil de vos voyageurs, booster vos avis et optimiser votre location saisonniere.",
};

export const revalidate = 60;

async function getArticles(): Promise<Article[]> {
  try {
    const snap = await adminDb
      .collection("blog_articles")
      .where("published", "==", true)
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article));
  } catch (e) {
    console.error("BLOG ERROR:", e);
    return [];
  }
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <Navbar forceSolid />
      <main className="min-h-screen bg-stone-50 pt-16">
        {/* Header */}
        <div className="bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <p className="text-sm font-medium text-orange-500 mb-3">Blog</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
              Conseils pour hotes
            </h1>
            <p className="mt-4 text-zinc-500 text-lg max-w-xl leading-relaxed">
              Ameliorez l&apos;experience de vos voyageurs, boostez vos avis et gagnez du temps avec votre location.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {articles.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-zinc-400 text-lg">Aucun article pour l&apos;instant.</p>
              <p className="text-zinc-400 text-sm mt-2">Revenez bientot !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-lg hover:shadow-zinc-200/60 transition-all"
                >
                  {article.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-orange-50 to-stone-100 flex items-center justify-center">
                      <span className="text-4xl">📖</span>
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h2 className="mt-2 text-lg font-semibold text-zinc-900 leading-snug group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-500 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-zinc-400">
                      {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
