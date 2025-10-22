"use server";

import path from "node:path";
import type * as z from "zod";
import { supabase } from "@/lib/supabaseClient";
import { FormSchema } from "./FormSchema";

export async function addArticle(
  formData: z.infer<typeof FormSchema>,
): Promise<{ success: boolean; message: string }> {
  const result = FormSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "バリデーションエラー",
    };
  }

  const user_id = "3751a2f4-17fc-ad29-19de-2ae2fadde0de"; // 仮の値でセット
  const category_id = parseInt(formData.category_id, 10);
  const title = formData.title;
  const content = formData.content;
  const imageFile = formData.upload_image;

  // 画像ファイルをストレージにアップロード
  const crypto = require("node:crypto");
  const imageFileName = crypto.randomUUID();
  const imageFileExtName = path.extname(imageFile.name).toLowerCase();
  const uploadFilePath = `${user_id}/${imageFileName}${imageFileExtName}`;

  const { error: storageError } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .upload(uploadFilePath, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError)
    return {
      success: false,
      message: "画像のアップロードに失敗しました。",
    };

  // ストレージにアップロードした画像のURLを取得
  const { data } = supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .getPublicUrl(uploadFilePath);
  const image_path = data.publicUrl;

  // 入力情報をDBに追加
  const { error: dbError } = await supabase.from("posts").insert({
    user_id,
    category_id,
    title,
    content,
    image_path,
  });

  if (dbError)
    return {
      success: false,
      message: "入力内容に間違いがあるか、送信中にエラーが起こりました。",
    };

  return { success: true, message: "送信しました。" };
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select(`id, name`)
    .order("id", { ascending: true });

  if (error) return false;

  return data;
}
