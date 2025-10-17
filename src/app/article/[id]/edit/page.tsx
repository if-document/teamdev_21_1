import { notFound, redirect } from "next/navigation";
import { getArticleForEdit, getCategories } from "@/app/api/article/route";
import ArticleEditForm from "@/components/article/ArticleEditForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type ArticleEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticleEditPage({
  params,
}: ArticleEditPageProps) {
  const supabase = await createServerSupabaseClient();
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.id, 10);
  if (Number.isNaN(articleId)) {
    notFound();
  }

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/article/${articleId}/edit`);
  }

  const [categories, parsedArticle] = await Promise.all([
    getCategories(),
    getArticleForEdit(articleId, user.id),
  ]).catch((error) => {
    // getArticleForEdit内で権限エラーや存在しない場合のエラーがthrowされる
    console.error("記事またはカテゴリの取得中にエラーが発生しました:", error);
    notFound();
  });

  return (
    <ArticleEditForm
      articleId={articleId}
      userId={user.id}
      initialArticleData={parsedArticle}
      categories={categories}
    />
  );
}
