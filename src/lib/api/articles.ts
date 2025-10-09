import { supabase } from "@/lib/supabaseClient";
import { Article } from "@/lib/types";

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
      if (error.code === "PGRST116") {
        return null;
      }
      console.error("Error fetching article:", error);
      return null;
    }

    const article: Article = {
      id: data.id,
      title: data.title,
      content: data.content,
      category: data.category?.name || "",
      articleImageUrl: data.image_path || "",
      time: data.created_at,
      author: {
        id: data.author.id,
        name: data.author.name,
        avatarUrl: data.author.image_path,
      },
    };

    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}
