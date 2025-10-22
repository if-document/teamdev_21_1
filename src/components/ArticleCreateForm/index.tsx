"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Database } from "@/types/supabase";
import { addArticle, getCategories } from "./actions";
import { FormSchema } from "./FormSchema";

type Category = Pick<
  Database["public"]["Tables"]["categories"]["Row"],
  "id" | "name"
>;

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function ArticleCreateForm() {
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      category_id: "1",
      content: "",
      upload_image: undefined,
    },
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    const result = await addArticle(values);

    if (result.success) {
      setSubmitResponse({
        status: "success",
        message: result.message || "送信が完了しました。",
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setSubmitResponse({
        status: "error",
        message: "送信に失敗しました。",
      });
    }
  };

  // selectタグのカテゴリー表示
  useEffect(() => {
    (async () => {
      setCategoriesLoading(true);
      const result = await getCategories();
      setCategoriesLoading(false);

      if (result) {
        setCategories(result);
      }
    })();
  }, []);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="text-[clamp(32px,5.2vw,75px)] my-[1em]"
          >
            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Title"
              disabled={isSubmitting || isSubmitSuccessful}
              className="text-[clamp(32px,5.2vw,75px)] font-bold leading-[1.1] h-[1.5em] border-0 bg-[#F5F5F5] focus-visible:outline-none focus-visible:bg-[#fff] focus-visible:ring-0 shadow-none"
            />
            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="text-[clamp(18px,1.8vw,26px)]"
              />
            )}
          </Field>
        )}
      />

      <div className="border-dotted border-[2px] border-[#000] rounded-[clamp(16px,2.8vw,40px)] [aspect-ratio:73/30] flex flex-col items-center justify-center bg-[#fff] p-[60px] gap-[2em] md:gap-[3em] lg:gap-[4em] my-[2.5em] relative text-center">
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
        <div>
          <Controller
            name="upload_image"
            control={form.control}
            render={({ field: { value, onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <label
                  htmlFor="upload_image"
                  className="text-[clamp(16px,2.3vw,33px)] text-[#fff] bg-[#18A0FB] px-[2em] py-[1em] font-bold block rounded-full h-auto cursor-pointer hover:bg-[#171717e6] transition-colors"
                >
                  Upload Image
                </label>
                <Input
                  id={field.name}
                  type="file"
                  accept="image/*"
                  onChange={(event) => onChange(event.target.files?.[0])}
                  disabled={isSubmitting || isSubmitSuccessful}
                  className="hidden text-[#999] w-full my-[1em] shadow-none border-none"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[clamp(18px,1.8vw,26px)]"
                  />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {categoriesLoading ? (
        <div className="flex justify-end my-8">
          <div className="w-full max-w-[240px] flex justify-center">
            <Spinner className="size-12" />
          </div>
        </div>
      ) : categories && categories.length > 0 ? (
        <Controller
          name="category_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex justify-end my-8">
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-[6px] w-full max-w-[240px] min-w-[fit-content]"
              >
                <label htmlFor="category_id">Category</label>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting || isSubmitSuccessful}
                >
                  <SelectTrigger
                    id="category_id"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="text-[clamp(18px,1.8vw,26px)] w-full">
                    {categories.map((category) => {
                      return (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            </div>
          )}
        />
      ) : (
        <div className="flex justify-end my-8">
          <div className="w-full max-w-[240px] flex justify-center">
            <p className="text-[#666]">カテゴリーの読み込みに失敗しました</p>
          </div>
        </div>
      )}

      <Controller
        name="content"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="mt-[1em] mb-[2em]"
          >
            <Textarea
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Content"
              disabled={isSubmitting || isSubmitSuccessful}
              className="bg-[#F5F5F5] text-[#555] border-0 rounded-[clamp(16px,2.8vw,40px)] [aspect-ratio:73/30] p-[0.5em] md:p-[1em] text-[clamp(18px,1.8vw,26px)] md:text-[clamp(18px,1.8vw,26px)] min-h-[14em] placeholder:text-[#888] focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:bg-[#fff] shadow-md md:shadow-lg"
            />
            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="text-[clamp(18px,1.8vw,26px)]"
              />
            )}
          </Field>
        )}
      />

      <div className="flex justify-center md:justify-end my-[2em] items-center flex-col md:flex-row">
        {submitResponse.status === "success" && (
          <div className="text-[clamp(16px,1.5vw,22px)] flex items-center gap-0.5 p-3 md:mr-[1em] text-green-700">
            <CircleCheck className="!w-[1.3em] !h-[1.3em]" />
            <span>{submitResponse.message}</span>
          </div>
        )}
        {submitResponse.status === "error" && (
          <div className="text-[clamp(16px,1.5vw,22px)] flex items-center gap-0.5 p-3 md:mr-[1em] text-red-700">
            <CircleX className="!w-[1.3em] !h-[1.3em]" />
            <span>{submitResponse.message}</span>
          </div>
        )}
        <Button
          type="submit"
          className="min-w-[160px] md:min-w-[240px] flex justify-center items-center px-[2em] py-[1.3em] bg-[#18A0FB] text-[#fff] text-[clamp(16px,1.5vw,22px)] font-bold w-fit flex-nowrap"
          disabled={isSubmitting || isSubmitSuccessful}
        >
          {isSubmitting && (
            <Spinner className="!min-w-[1.2em] !min-h-[1.2em]" />
          )}
          <span className="whitespace-nowrap">
            {isSubmitting ? "Sending..." : "Create"}
          </span>
        </Button>
      </div>
    </form>
  );
}
