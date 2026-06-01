"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { PencilSimple, Trash, Eye } from "@phosphor-icons/react";

export function ArticleActions({ article }: { article: Article }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Supprimer "${article.title}" ?`)) return;
    await fetch(`/api/articles/${article.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 justify-end">
      {article.published && (
        <Link
          href={`/blog/${article.slug}`}
          target="_blank"
          className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
          title="Voir l'article"
        >
          <Eye size={16} />
        </Link>
      )}
      <Link
        href={`/admin/articles/${article.id}`}
        className="p-2 text-zinc-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
        title="Modifier"
      >
        <PencilSimple size={16} />
      </Link>
      <button
        onClick={handleDelete}
        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Supprimer"
      >
        <Trash size={16} />
      </button>
    </div>
  );
}
