import { ArticleSection } from "@/components/article/ArticleSection";
import { CommentSection } from "@/components/article/CommentSection";
import { articleData, commentListData } from "@/lib/sampleData";

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-[60px] pb-[35px]">
      {/* Navbar */}
      <ArticleSection article={articleData} />
      <CommentSection comments={commentListData} />
    </div>
  );
}
