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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Cover */}
        {article.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        )}

        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
            <Link href="/blog" className="hover:text-orange-500 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-zinc-600">{article.category}</span>
          </div>

          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
            {article.category}
          </span>

          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
            {article.title}
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mt-6 text-lg text-zinc-600 leading-relaxed border-l-4 border-orange-200 pl-4 italic">
            {article.excerpt}
          </p>

          {/* Content */}
          <div
            className="mt-10 prose prose-zinc prose-lg max-w-none
              prose-headings:font-semibold prose-headings:tracking-tight
              prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-zinc-900
              prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-blockquote:border-orange-300 prose-blockquote:text-zinc-600"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* CTA */}
          <div className="mt-16 bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-zinc-900">
              Pret a creer votre livret d&apos;accueil ?
            </h3>
            <p className="mt-2 text-zinc-500 text-sm">
              Rejoignez les hotes qui offrent une meilleure experience a leurs voyageurs.
            </p>
            <a
              href="https://app.bunkly.co/fr"
              className="inline-flex items-center justify-center mt-5 font-semibold bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 active:scale-[0.97] transition-all text-sm"
            >
              Commencer gratuitement
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
