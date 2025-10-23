import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ArticleCommentList from "../ArticleCommentList";

export function CommentSection() {
  return (
    <section className="p-4 max-w-[800px] mx-auto w-full">
      <h2 className="text-3xl font-semibold mb-6">Comments</h2>
      <form className="flex justify-between mb-6 gap-10">
        <Textarea
          placeholder="Your Comment..."
          className="min-h-[40px] resize-none border-black/50 focus-visible:ring-0"
          rows={1}
        />
        <Button className="min-w-[180px] w-auto bg-sky-500 text-white text-base">
          Comment
        </Button>
      </form>
      <ArticleCommentList />
    </section>
  );
}
