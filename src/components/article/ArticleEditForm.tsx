"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useImagePreview } from "@/hooks/useImagePreview";
import { updateArticle } from "@/lib/api/article";
import type { ArticleUpdateData } from "@/lib/validation/article";
import { articleUpdateSchema } from "@/lib/validation/article";
import type { Article, Category } from "@/types/types";

type ArticleEditFormProps = {
  articleId: number;
  userId: string;
  initialArticleData: Article;
  categories: Category[];
};

export default function ArticleEditForm({
  articleId,
  userId,
  initialArticleData,
  categories,
}: ArticleEditFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ArticleUpdateData>({
    resolver: zodResolver(articleUpdateSchema),
    defaultValues: {
      title: initialArticleData.title,
      content: initialArticleData.content,
      categoryId: initialArticleData.category.id,
      articleImageUrl: initialArticleData.articleImageUrl,
    },
  });

  // フォームの値の監視
  const newImageFile = watch("newImageFile");

  // 画像プレビューの取得
  const previewImageUrl = useImagePreview(
    initialArticleData.articleImageUrl,
    newImageFile,
  );

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<ArticleUpdateData> = async (
    data: ArticleUpdateData,
  ) => {
    setErrorMessage(null);

    try {
      const success = await updateArticle(articleId, data, userId);

      if (!success) {
        setErrorMessage("記事の更新に失敗しました。");
        return;
      }
      router.push(`/article/${articleId}`);
    } catch (error) {
      console.error("記事更新中にエラーが発生しました:", error);

      if (error instanceof ZodError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("記事の更新中に予期せぬエラーが発生しました。");
      }
    }
  };

  return (
    <div className="w-full max-w-[1492px] mx-auto px-[16px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Title"
          className="text-[clamp(32px,5.2vw,75px)] font-bold leading-[1.1] my-[1em] h-[1.5em] border-0 bg-[#F5F5F5] focus-visible:outline-none focus-visible:bg-[#fff] focus-visible:ring-0 shadow-none"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}

        <div className="border-dotted border-[2px] border-[#000] rounded-[clamp(16px,2.8vw,40px)] [aspect-ratio:73/30] flex flex-col items-center justify-evenly bg-[#fff] p-[60px] gap-[2em] my-[2.5em]">
          {previewImageUrl ? (
            <div className="relative w-full h-full max-h-[300px]">
              <Image
                src={previewImageUrl}
                alt="Article Preview"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-[clamp(16px,2.8vw,40px)]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <svg
              role="img"
              width="100"
              height="100"
              viewBox="0 0 102 108"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[clamp(50px,7vw,100px)] h-[clamp(50px,7vw,100px)]"
            >
              <title>↑</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.85833 49.1852C0.286807 51.8162 0.286807 56.0812 2.85833 58.7122C5.42985 61.341 9.59256 61.3425 12.1641 58.7161L44.3949 25.7883V101.221C44.3949 104.949 47.351 107.974 50.9933 107.974C54.6357 107.974 57.5918 104.949 57.5918 101.221V25.7883L89.7321 58.7369C92.3112 61.388 96.5115 61.3896 99.0981 58.7416C101.685 56.0943 101.685 51.8031 99.0981 49.1558L51.5137 0.457904C51.2271 0.162307 50.7596 0.162307 50.473 0.457904L2.85833 49.1852Z"
                fill="#94A2AB"
              />
            </svg>
          )}
          <Button
            asChild
            className="text-[clamp(16px,2.3vw,33px)] text-[#fff] bg-[#18A0FB] px-[2em] py-[1em] font-bold block rounded-full h-auto cursor-pointer"
          >
            <label htmlFor="upload_image">Upload Image</label>
          </Button>
          <Controller
            name="newImageFile"
            control={control}
            render={({ field }) => (
              <Input
                type="file"
                accept="image/*"
                id="upload_image"
                className="hidden"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            )}
          />
        </div>
        {errors.newImageFile && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newImageFile.message as string}
          </p>
        )}

        <div className="flex justify-end my-8">
          <div className="flex flex-col gap-[6px] w-full max-w-[240px] min-w-[fit-content]">
            <label htmlFor="category_id">Category</label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(parseInt(value, 10))}
                >
                  <SelectTrigger id="categoryId">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="text-[clamp(18px,1.8vw,26px)] w-full">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        <Textarea
          placeholder="Content"
          className="bg-[#F5F5F5] text-[#555] border-0 rounded-[clamp(16px,2.8vw,40px)] [aspect-ratio:73/30] p-[0.5em] md:p-[1em] text-[clamp(18px,1.8vw,26px)] md:text-[clamp(18px,1.8vw,26px)] min-h-[14em] mt-[1em] mb-[2em] placeholder:text-[#888] focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:bg-[#fff] shadow-md md:shadow-lg"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}

        {errorMessage && (
          <p className="text-red-500 text-center text-lg mb-4">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-center md:justify-end my-[2em]">
          <Button
            type="submit"
            className="px-[4em] py-[1.3em] bg-[#18A0FB] text-[#fff] text-[clamp(16px,1.5vw,22px)] font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
