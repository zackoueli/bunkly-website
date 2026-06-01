import { AdminNav } from "@/components/admin/AdminNav";
import { ArticleEditor } from "@/components/admin/ArticleEditor";

export default function NewArticlePage() {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <div className="flex-1 ml-64">
        <ArticleEditor isNew />
      </div>
    </div>
  );
}
