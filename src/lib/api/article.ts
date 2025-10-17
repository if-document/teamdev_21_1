import { extractPathFromUrl } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/client";
import type {
  ArticleUpdateData,
  FormattedArticleUpdateData,
} from "@/lib/validation/article";
import {
  articleDisplaySchema,
  articleFetchSchema,
  formattedArticleUpdateSchema,
} from "@/lib/validation/article";
import type { Article } from "@/types/types";

const supabase = createClient();
const bucketName = "post-image";

export async function getArticleById(id: number): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        author:users(*),
        category:categories(*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      if (error.code !== "PGRST116") {
        console.error("Error fetching article:", error);
      }
      return null;
    }

    // Zodスキーマでデータの検証と変換を行う
    const fetchedArticle = articleFetchSchema.parse(data);
    const article = articleDisplaySchema.parse(fetchedArticle);
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
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
      updated_at: new Date(),
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

// TODO:仮置きのため、後で削除
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { data, error };
}
