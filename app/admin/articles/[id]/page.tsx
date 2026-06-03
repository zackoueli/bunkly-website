import { notFound } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { adminDb } from "@/lib/firebase-admin";
import type { Article } from "@/lib/types";

export const revalidate = 0;

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let article: Article | null = null;
  try {
    const doc = await adminDb.collection("blog_articles").doc(id).get();
    if (doc.exists) article = { id: doc.id, ...doc.data() } as Article;
  } catch {}

  if (!article) notFound();

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <div className="flex-1 ml-64">
        <ArticleEditor article={article} />
      </div>
    </div>
  );
}
