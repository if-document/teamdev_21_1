import { ArticleSection } from "@/components/article/ArticleSection";
import { CommentSection } from "@/components/article/CommentSection";
import { getArticleById } from "@/lib/api/articles";
import { getCommentsByArticleId } from "@/lib/api/comments";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId)) {
    notFound();
  }

  const [article, comments] = await Promise.all([
    getArticleById(articleId),
    getCommentsByArticleId(articleId),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[60px] pb-[35px]">
      <ArticleSection article={article} />
      <CommentSection comments={comments} postId={articleId} />
    </div>
  );
}

export const revalidate = 3600;
