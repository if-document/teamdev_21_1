// src/lib/api/comments.ts
import { supabase } from "@/lib/supabaseClient";
import { Comment } from "@/lib/types";

export async function getCommentsByArticleId(
  articleId: number,
): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select(`
        *,
        author:users(*)
      `)
      .eq("post_id", articleId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      return [];
    }

    const comments: Comment[] = data.map((comment) => ({
      id: comment.id,
      content: comment.content,
      time: comment.created_at,
      user: {
        id: comment.author.id,
        name: comment.author.name,
        avatarUrl: comment.author.image_path,
      },
    }));

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}
