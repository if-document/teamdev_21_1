import { supabase } from "./supabaseClient";

/**
 * 指定した ID の投稿を削除
 * @param id 削除対象の投稿ID
 * @returns 成功・失敗の結果
 */
export async function deletePost(id: number) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Delete failed:", error.message);
    throw new Error(error.message);
  }

  console.log(`Post ${id} deleted successfully`);
  return true;
}
