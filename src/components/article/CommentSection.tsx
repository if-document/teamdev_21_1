import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { Comment } from "@/types/types";

export function CommentSection({ comments }: { comments: Comment[] }) {
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
      <div className="space-y-8">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            className=" bg-stone-100 rounded-md p-4 shadow-none border-none"
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
