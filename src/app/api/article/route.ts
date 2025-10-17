import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  articleDisplaySchema,
  articleFetchSchema,
  categorySchema,
} from "@/lib/validation/article";
import type { Article, Category } from "@/types/types";

// 記事IDと所有者IDに基づいて記事データを取得する
export async function getArticleForEdit(
  articleId: number,
  currentUserId: string,
): Promise<Article> {
  const supabase = await createServerSupabaseClient();

  const { data: articleData, error: articleError } = await supabase
    .from("posts")
    .select(`*,
    category:categories(id, name),
    user:users(id, name, image_path)`)
    .eq("id", articleId)
    .eq("user_id", currentUserId) // user_idでの絞り込みを追加
    .single();

  if (articleError) {
    console.error("記事のフェッチエラー (getArticleForEdit):", articleError);
    // 記事が存在しないか、権限がない場合、SupabaseはPGRST116エラーを返す
    if (articleError.code === "PGRST116") {
      throw new Error(
        "編集対象の記事が見つからないか、編集する権限がありません。",
      );
    }
    throw new Error("記事の取得に失敗しました。");
  }

  try {
    const fetchedArticle = articleFetchSchema.parse(articleData);
    return articleDisplaySchema.parse(fetchedArticle);
  } catch (parseError) {
    console.error(
      "記事データのZodパースエラー (getArticleForEdit):",
      parseError,
    );
    throw new Error("記事データの形式が不正です。");
  }
}

// 全てのカテゴリデータを取得する
export async function getCategories(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();

  const { data: categoriesData, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name");

  if (categoriesError) {
    console.error("カテゴリのフェッチエラー (getCategories):", categoriesError);
    throw new Error("カテゴリの取得に失敗しました。");
  }

  const categories: Category[] = categoriesData
    ? categorySchema.array().parse(categoriesData)
    : [];
  return categories;
}
