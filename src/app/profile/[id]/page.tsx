// src/app/profile/[id]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";
import { postsData } from "@/lib/sampleData";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;
  const { paginatedPosts, totalPages } = usePaginatedPosts(
    postsData,
    currentPage,
    6,
  );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Main */}
      <main className="flex-1 mb-10">
        <h1 className="text-center text-[60px] font-semibold text-[#6B6B6B] mt-10">
          Your Post
        </h1>

        {/* Cards */}
        <section className="max-w-[1580px] mx-auto mt-[40px] mb-[70px] px-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[90px] gap-y-[70px]">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* 画像は個別に Link（外側に Link は置かない） */}
                <Link
                  href={`/article/${post.id}`}
                  className="block relative w-full h-[300px] bg-[#D8DDE5]"
                >
                  {post.articleImageUrl && (
                    <Image
                      src={post.articleImageUrl}
                      alt={`${post.title} Thumbnail`}
                      fill
                      className="object-cover"
                    />
                  )}
                </Link>

                <div className="p-[25px]">
                  <div className="mb-[20px] flex items-center justify-between">
                    {/* タイトルも個別に Link */}
                    <Link
                      href={`/article/${post.id}`}
                      className="text-[30px] font-extrabold leading-tight hover:underline"
                    >
                      {post.title}
                    </Link>
                    <span className="text-[#18A0FB] text-[18px]">
                      {post.category}
                    </span>
                  </div>

                  <div className="mb-[10px] flex items-center gap-x-[20px] text-[16px]">
                    {/* 著者 Link（ネスト回避OK） */}
                    <Link
                      href={`/profile/${post.author.id}`}
                      className="text-[#18A0FB] hover:underline"
                    >
                      {post.author.name}
                    </Link>
                    <span className="text-gray-400">a min ago</span>
                  </div>

                  {/* 簡易スケルトン */}
                  <div className="h-[18px] w-[411px] max-w-full rounded bg-[#E0E7EC]" />
                  <div className="mt-2 h-[18px] w-[300px] max-w-[80%] rounded bg-[#E0E7EC]" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <Pagination totalPages={totalPages} />
      </main>
    </div>
  );
}
