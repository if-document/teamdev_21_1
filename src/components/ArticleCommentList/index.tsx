"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Spinner } from "../ui/spinner";
import { type CommentsWithUser, getCommentsWithUser } from "./actions";

type CommentsResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

function convertElapsedTime(dateString: string) {
  const pastDate = new Date(dateString);
  return formatDistanceToNow(pastDate, { addSuffix: true });
}

export default function ArticleCommentList() {
  const [commentsLoading, setCommentsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentsWithUser[]>([]);
  const [commentsResponse, setCommentsResponse] = useState<CommentsResponse>({
    status: undefined,
    message: "",
  });

  const { id: post_id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      setCommentsLoading(true);
      const { success, message, result } = await getCommentsWithUser(
        Number(post_id),
      );
      setCommentsLoading(false);

      if (!success || !result) {
        setCommentsResponse({
          status: "error",
          message,
        });
      } else {
        setCommentsResponse({
          status: "success",
          message,
        });
        setComments(result);
      }
    })();
  }, [post_id]);

  return (
    <div className="space-y-8">
      {commentsLoading ? (
        <div className="flex justify-center my-8">
          <Spinner className="size-12" />
        </div>
      ) : (
        ""
      )}

      {commentsResponse.status === "success" ? (
        comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Card
              key={comment.id}
              className=" bg-stone-100 rounded-md p-4 shadow-none border-none"
            >
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-[74px] h-[74px]">
                    <AvatarImage
                      src={comment.user.image_path ?? undefined}
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
                  <p className="text-sky-300 text-lg">
                    {convertElapsedTime(comment.created_at)}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>投稿されたコメントはありません。</p>
        )
      ) : (
        <p>{commentsResponse.message}</p>
      )}
    </div>
  );
}
