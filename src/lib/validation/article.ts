import { z } from "zod";
import { formatTimeAgo } from "@/lib/helpers";
import type { Article } from "@/types/types";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  image_path: z.string().nullable(),
});

// posts,categories,usersから取得する記事データの型を定義
export const articleFetchSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  category: categorySchema.nullable(),
  image_path: z.string(),
  updated_at: z.string(),
  user: userSchema.nullable(),
});

// フロントエンドのArticle型に変換するZodスキーマ
export const articleDisplaySchema = articleFetchSchema.transform(
  (data): Article => {
    const categoryId = data.category?.id || 0;
    const categoryName = data.category?.name || "";
    const authorId = data.user?.id || "";
    const authorName = data.user?.name || "";
    const authorAvatarUrl = data.user?.image_path || null;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      category: { id: categoryId, name: categoryName },
      articleImageUrl: data.image_path,
      time: formatTimeAgo(data.updated_at),
      author: {
        id: authorId,
        name: authorName,
        avatarUrl: authorAvatarUrl,
      },
    };
  },
);

// 記事更新用のバリデーションスキーマ
export const articleUpdateSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルは必須です。" })
    .max(50, { message: "タイトルは50文字以内で入力してください。" }),
  content: z.string().min(1, { message: "コンテンツは必須です。" }),
  categoryId: z
    .number()
    .int()
    .positive({ message: "カテゴリを選択してください。" }),
  articleImageUrl: z.url().optional(),
  newImageFile: z.instanceof(File).optional(),
});
export type ArticleUpdateData = z.infer<typeof articleUpdateSchema>;

// postsテーブル型に変換するZodスキーマ
export const formattedArticleUpdateSchema = articleUpdateSchema.transform(
  (data) => ({
    title: data.title,
    content: data.content,
    category_id: data.categoryId,
  }),
);
export type FormattedArticleUpdateData = z.infer<
  typeof formattedArticleUpdateSchema
>;
