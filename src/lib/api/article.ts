import { extractPathFromUrl } from "@/lib/helpers";
import { supabase } from "@/lib/supabaseClient";
import type {
  ArticleUpdateData,
  FormattedArticleUpdateData,
} from "@/lib/validation/article";
import {
  articleDisplaySchema,
  articleFetchSchema,
  categorySchema,
  formattedArticleUpdateSchema,
} from "@/lib/validation/article";
import type { Article, Category } from "@/types/types";

const bucketName = "post-image";

// 記事IDと所有者IDに基づいて記事データを取得する
export async function getArticleForEdit(
  articleId: number,
  userId: string,
): Promise<Article> {
  const { data: articleData, error: articleError } = await supabase
    .from("posts")
    .select(`*,
    category:categories(id, name),
    user:users(id,name, image_path)`)
    .eq("id", articleId)
    .eq("user_id", userId)
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

// 記事IDに基づいて記事更新を行う
export async function updateArticle(
  articleId: number,
  payload: ArticleUpdateData,
  userId: string,
): Promise<boolean> {
  let formattedData: FormattedArticleUpdateData;
  let newImageUrl: string | undefined = payload.articleImageUrl;
  let newImageFilePath: string | null = null;

  // 入力値のバリデーションとフォーマット
  try {
    formattedData = formattedArticleUpdateSchema.parse(payload);
  } catch (error) {
    console.error("入力値のバリデーションエラー:", error);
    throw new Error("入力値が不正です。");
  }

  // 新しい画像ファイルが提供された場合、ストレージにアップロード
  if (payload.newImageFile) {
    const file: File = payload.newImageFile;
    const fileExt = (file.name.split(".").pop() || "").replace(/\?.*$/, "");
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;
    newImageFilePath = filePath;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("画像アップロードエラー:", uploadError);
      throw new Error("画像のアップロードに失敗しました。");
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    newImageUrl = publicUrlData.publicUrl;
  }

  // 記事データの更新
  const { error: updateError } = await supabase
    .from("posts")
    .update({
      ...formattedData,
      image_path: newImageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", articleId)
    .eq("user_id", userId);

  if (updateError) {
    console.error("記事更新エラー:", updateError);

    // DB更新に失敗した場合、アップロードした新しい画像を削除する
    if (newImageFilePath) {
      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([newImageFilePath]);
      if (deleteError) {
        console.warn(
          "アップロードした画像のクリーンアップ削除に失敗しました:",
          deleteError,
        );
      }
    }
    throw new Error("記事の更新に失敗しました。");
  }

  // DB更新が成功した後、古い画像が存在すれば削除する
  if (newImageFilePath) {
    const oldPathForDeletion = extractPathFromUrl(
      payload.articleImageUrl,
      bucketName,
    );

    if (oldPathForDeletion) {
      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([oldPathForDeletion]);

      if (deleteError) {
        console.warn("古い画像の削除に失敗しました:", deleteError);
      }
    }
  }
  return true;
}
