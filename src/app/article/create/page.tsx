import type { Metadata } from "next";
import ArticleCreateForm from "@/components/ArticleCreateForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "投稿画面",
  };
}

export default function ArticleCreatePage() {
  return (
    <div className="w-full max-w-[1492px] mx-auto px-[16px]">
      <ArticleCreateForm />
    </div>
  );
}
