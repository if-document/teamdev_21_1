import * as z from "zod";

export const FormSchema = z.object({
  title: z
    .string()
    .max(100, { message: "タイトルは100文字までです。" })
    .nonempty({ message: "タイトルを入力してください。" }),
  category_id: z
    .string()
    .nonempty({ message: "カテゴリーを選択してください。" }),
  content: z
    .string()
    .max(1000, { message: "内容は1000文字までです。" })
    .nonempty({ message: "内容を入力してください。" }),
  upload_image: z
    .custom<File>()
    .refine((file) => file instanceof File && file.size > 0, {
      message: "ファイルを選択してください。",
    })
    .refine((file) => file?.size <= 5000000, {
      message: "画像の最大サイズは5MBまでです。",
    }),
});
