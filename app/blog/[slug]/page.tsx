import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { adminDb } from "@/lib/firebase-admin";
import type { Article } from "@/lib/types";

export const revalidate = 60;

async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const snap = await adminDb
      .collection("blog_articles")
      .where("slug", "==", slug)
      .where("published", "==", true)
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...doc.data() } as Article;
  } catch {
    return null;
  }
}

async function getRelatedArticles(currentId: string, category: string): Promise<Article[]> {
  try {
    const snap = await adminDb
      .collection("blog_articles")
      .where("published", "==", true)
      .where("category", "==", category)
      .limit(4)
      .get();
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as Article))
      .filter((a) => a.id !== currentId)
      .slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      images: article.seo?.ogImage ? [article.seo.ogImage] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.id, article.category);

  const readingTime = Math.ceil((article.content?.split(" ").length ?? 0) / 200);

  return (
    <>
      <Navbar forceSolid />
      <main className="min-h-screen bg-white">

        {/* Hero cover */}
        {article.coverImage && (
          <div className="relative h-72 md:h-96 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)" }}
            />
            <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-10">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-white/60 mb-4">
                <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-white/80">{article.category}</span>
              </div>
              <span className="inline-flex w-fit text-xs font-semibold text-white bg-orange-500 px-3 py-1 rounded-full mb-3">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
                {article.title}
              </h1>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Breadcrumb si pas de cover */}
          {!article.coverImage && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
              <Link href="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-zinc-600">{article.category}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">

            {/* Colonne principale */}
            <article>
              {/* Meta */}
              {!article.coverImage && (
                <div className="mb-6">
                  <span className="inline-flex text-xs font-semibold text-white bg-orange-500 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mt-4">
                    {article.title}
                  </h1>
                </div>
              )}

              {/* Info ligne */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 pb-6 border-b border-zinc-100 mb-8">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-500 text-xs font-bold">B</span>
                  </div>
                  <span className="text-zinc-600 font-medium">Equipe Bunkly</span>
                </div>
                <span>
                  {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>{readingTime} min de lecture</span>
              </div>

              {/* Chapeau */}
              <p className="text-lg text-zinc-600 leading-relaxed border-l-4 border-orange-400 pl-5 mb-10 italic">
                {article.excerpt}
              </p>

              {/* Contenu HTML */}
              <div
                className="prose prose-zinc prose-lg max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:mb-5
                  prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-strong:text-zinc-900 prose-strong:font-semibold
                  prose-ul:my-4 prose-li:text-zinc-600 prose-li:my-1
                  prose-blockquote:border-orange-400 prose-blockquote:bg-orange-50 prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-700 prose-blockquote:not-italic
                  prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-zinc-800
                  prose-img:rounded-2xl prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* CTA dans article */}
              <div className="mt-12 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-3xl p-8 text-center">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Pret a commencer ?</p>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                  Creez votre premier livret gratuitement
                </h3>
                <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">
                  Rejoignez les hotes qui offrent une meilleure experience a leurs voyageurs.
                </p>
                <a
                  href="https://app.bunkly.co/fr"
                  className="inline-flex items-center justify-center font-semibold bg-orange-500 text-white px-7 py-3.5 rounded-2xl hover:bg-orange-600 active:scale-[0.97] transition-all text-sm shadow-lg shadow-orange-200"
                >
                  Commencer gratuitement
                </a>
                <p className="text-xs text-zinc-400 mt-3">Gratuit jusqu&apos;a 3 livrets - sans carte bancaire</p>
              </div>

              {/* Box auteur */}
              <div className="mt-10 flex gap-5 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <span className="text-orange-500 text-2xl font-black">B</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Auteur</p>
                  <p className="font-bold text-zinc-900">Equipe Bunkly</p>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                    Nous aidons les hotes Airbnb, gites et campings a creer des livrets d&apos;accueil digitaux professionnels en quelques minutes.
                  </p>
                  <a
                    href="https://app.bunkly.co/fr"
                    className="inline-flex mt-3 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Essayer Bunkly gratuitement
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col gap-6 sticky top-24">

              {/* CTA sidebar */}
              <div className="bg-zinc-900 rounded-2xl p-6 text-center">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">Essayez Bunkly</p>
                <p className="text-white font-semibold mb-4 leading-snug">
                  Creez votre livret d&apos;accueil en 10 minutes
                </p>
                <a
                  href="https://app.bunkly.co/fr"
                  className="block w-full font-semibold bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors text-sm"
                >
                  Commencer gratuitement
                </a>
                <p className="text-xs text-zinc-500 mt-2">Gratuit - sans carte bancaire</p>
              </div>

              {/* Articles lies */}
              {related.length > 0 && (
                <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 pb-3 border-b border-zinc-100">
                    A decouvrir aussi
                  </p>
                  <div className="flex flex-col gap-4">
                    {related.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blog/${rel.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-100">
                          {rel.coverImage && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={rel.coverImage}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-orange-500 font-semibold mb-1">{rel.category}</p>
                          <p className="text-sm font-semibold text-zinc-800 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                            {rel.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="block mt-4 pt-4 border-t border-zinc-100 text-xs font-semibold text-zinc-400 hover:text-orange-500 transition-colors text-center"
                  >
                    Voir tous les articles
                  </Link>
                </div>
              )}

              {/* Partage */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                  Partager cet article
                </p>
                <div className="flex gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://bunkly.co/blog/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-semibold text-zinc-600 border border-zinc-200 py-2.5 rounded-xl hover:bg-zinc-50 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://bunkly.co/blog/${article.slug}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-semibold text-zinc-600 border border-zinc-200 py-2.5 rounded-xl hover:bg-zinc-50 transition-colors"
                  >
                    X / Twitter
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
