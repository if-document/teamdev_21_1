// src/app/profile/[id]/page.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

type Post = {
  id: string;
  title: string;
  category: string;
  author: { id: string; name: string };
  createdAt: string;
  thumbnail?: string;
};

const MOCK_POSTS: Post[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `${i + 1}`,
  title: "Post Title",
  category: "Category",
  author: { id: "42", name: "Author" },
  createdAt: new Date(Date.now() - i * 60_000).toISOString(),
  thumbnail: "/images/post-thumbnail.jpg",
}));

const POSTS_PER_PAGE = 6;

export default function ProfilePage() {
  const _params = useParams<{ id: string }>();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const totalPages = Math.max(1, Math.ceil(MOCK_POSTS.length / POSTS_PER_PAGE));
  const pagedPosts = React.useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return MOCK_POSTS.slice(start, start + POSTS_PER_PAGE);
  }, [page]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="h-[120px] w-full bg-[#E0E0E0] flex items-center justify-end px-8 relative">
        <Link href="/article/create" className="mr-4">
          <Button className="w-[180px] h-[60px] rounded-full bg-[#2F2F2F] text-white text-xl hover:bg-[#232323]">
            Create
          </Button>
        </Link>

        <div className="relative">
          <button
            aria-label="Open user menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-300/80"
          >
            <User className="w-8 h-8 text-black" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-[92px] w-[262px] rounded-[20px] bg-[#B3B3B3] p-4 shadow-lg">
              <div className="text-center text-[26px] font-semibold text-black">
                User name
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  className="w-[203px] h-[50px] rounded-full bg-[rgba(255,49,49,0.56)] hover:bg-[rgba(255,49,49,0.7)] text-black text-[24px] font-semibold"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 mb-10">
        <h1 className="text-center text-[60px] font-semibold text-[#6B6B6B] mt-10">
          Your Post
        </h1>

        {/* Cards */}
        <section className="max-w-[1580px] mx-auto mt-[40px] mb-[70px] px-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[90px] gap-y-[70px]">
            {pagedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* 画像は個別に Link（外側に Link は置かない） */}
                <Link
                  href={`/article/${post.id}`}
                  className="block relative w-full h-[300px] bg-[#D8DDE5]"
                >
                  {post.thumbnail && (
                    <Image
                      src={post.thumbnail}
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
                      {post.category.name}
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

        {/* Pagination（Home と同じ見た目） */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-3 disabled:opacity-40"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <Image
                src="/images/arrow-left.svg"
                alt="Previous"
                width={20}
                height={20}
              />
              <span className="font-bold text-[22px]">Previous Page</span>
            </button>

            <div className="flex items-center gap-x-4">
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === page;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold transition-colors ${
                      active
                        ? "bg-black text-white border border-black"
                        : "border border-gray-300"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <button
              className="flex items-center gap-3 disabled:opacity-40"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <span className="font-bold text-[22px]">Next Page</span>
              <Image
                src="/images/arrow-right.svg"
                alt="Next"
                width={20}
                height={20}
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
