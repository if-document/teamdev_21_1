"use server";

import { supabase } from "@/lib/supabaseClient";

export type CommentsWithUser = {
  id: number;
  user_id: string;
  post_id: number;
  content: string;
  created_at: string;
  user: {
    name: string;
    image_path: string | null;
  };
};

export async function getCommentsWithUser(
  post_id: number,
): Promise<{ success: boolean; message: string; result?: CommentsWithUser[] }> {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      id,
      user_id,
      post_id,
      content,
      created_at,
      user:users (
        name,
        image_path
      )
    `)
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });

  if (error)
    return {
      success: false,
      message: "コメントの取得に失敗しました。",
    };

  return {
    success: true,
    message: "コメントの取得に成功しました。",
    result: data,
  };
}
