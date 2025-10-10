import { supabase } from "@/lib/supabaseClient";

/**
 * テーブルレコード型 [PostRecord]
 * @/types/supabase
 *  Database.public.Tables.posts.Row より
 */
export type PostRecord = {
  category_id: number;
  content: string;
  created_at: string;
  id: number;
  image_path: string;
  title: string;
  updated_at: string;
  user_id: string;
};

/**
 * 記事一覧 取得
 * @param start 取得開始位置（省略可）
 * @param end 取得終了位置（省略可）
 * @returns PostRecord 配列　（なければ空行列）
 */
export async function ArticleList(
  start?: number,
  end?: number,
): Promise<PostRecord[]> {
  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  // created_at が新しい順 (降順)

  if (start !== undefined && end !== undefined) {
    query = query.range(start, end);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching PostsTable:", error.message);
    return [];
  }

  return data ?? [];
}
