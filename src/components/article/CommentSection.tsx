"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { Card } from "../ui/card";
import { Comment } from "@/types/types";

interface CommentSectionProps {
  comments: Comment[];
  postId: number;
}

export function CommentSection({ comments, postId }: CommentSectionProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please enter a comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login to comment");
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from("comments")
        .insert({
          user_id: user.id,
          post_id: postId,
          content: content.trim(),
        })
        .select();

      console.log("insert result:", { data, error });

      if (error) throw error;

      setContent("");

      window.location.reload();
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-4 max-w-[800px] mx-auto w-full">
      <h2 className="text-3xl font-semibold mb-6">Comments</h2>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between mb-6 gap-10"
      >
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your Comment..."
          className="min-h-[40px] resize-none border-black/50 focus-visible:ring-0"
          rows={1}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="min-w-[180px] w-auto bg-sky-500 text-white text-base disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Comment"}
        </Button>
      </form>
      <div className="space-y-8">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            className="bg-stone-100 rounded-md p-4 shadow-none border-none"
          >
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-[74px] h-[74px]">
                  <AvatarImage
                    src={comment.user.avatarUrl ?? undefined}
                    alt={comment.user.name}
                  />
                  <AvatarFallback>
                    <Image
                      src="/images/defaultUserIcon.svg"
                      alt="User"
                      width={74}
                      height={74}
                    />
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg">{comment.user.name}</p>
              </div>
              <div className="flex flex-col h-full">
                <p className="text-lg leading-relaxed mt-2 mb-2">
                  {comment.content}
                </p>
                <p className="text-sky-300 text-lg">{comment.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
