"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleList, type PostRecord } from "@/components/article/ArticleList";
import { Pagination } from "@/components/pagination/Pagination";
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";

/**
 * ISO形式日付文字列 書式変換
 * @param isoString  ISO形式日付文字列
 * @returns YYYY/MM/DD HH:MM 文字列
 */
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return ""; // 無効日付を防止

  return (
    `${date.getFullYear()}/` +
    `${String(date.getMonth() + 1).padStart(2, "0")}/` +
    `${String(date.getDate()).padStart(2, "0")} ` +
    `${String(date.getHours()).padStart(2, "0")}:` +
    `${String(date.getMinutes()).padStart(2, "0")}`
  );
};

export default function Home() {

  const [articles, setArticles] = useState<PostRecord[]>([]);
  // 取得された全記事データ
  // ページを更新する際は PostRecord 型配列 articles
  // から必要範囲の要素を、表示用配列に切り出して更新の際、参照する

  useEffect(() => {
    // 記事データをすべて取得する
    ArticleList().then((data) => setArticles(data));
  }, []);

  // Page数 取得
  const params = useSearchParams();
  const currentPage = Number(params.get("page")) || 1;
  const { paginatedPosts, totalPages } = usePaginatedPosts(
    articles,
    currentPage, 9,
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-[90px] px-[20px] pb-[25px]">
      {/* Search Bar */}
      <div className="flex justify-center items-center mb-[90px] gap-x-[20px]">
        <input
          type="text"
          placeholder="Search ..."
          className="w-full text-[26px] font-medium placeholder-[#000000] px-[65px] py-3 bg-gray-200 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#18A0FB] max-w-[740px] h-[60px]"
        />
        <button
          type="button"
          className="p-2 hover:bg-gray-300 rounded-full transition-colors"
          title="Search"
          aria-label="Search"
        >
          <Image
            src="/images/search-icon.svg"
            alt="Search Icon"
            width={30}
            height={30}
          />
        </button>
      </div>

      {/* Posts Grid */}
      <div className="max-w-[1580px] mx-auto mb-[25px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[90px] gap-y-[70px]">
          {paginatedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/article/${post.id}`}
              className="bg-white rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-[300px] relative">
                <Image
                  src={post.image_path}
                  alt={`${post.title} Thumb Nail`}
                  width={500}
                  height={500}
                  className="object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-[25px]">
                <div className="flex justify-between items-center mb-[20px]">
                  <h3 className="text-[30px] font-bold">{post.title}</h3>
                  <span className="text-[#18A0FB] text-[18px]">
                    {post.categories.name}
                  </span>
                </div>
                <div className="flex items-center gap-x-[20px] mb-[10px] text-[16px]">
                  <span className="text-[#18A0FB]">{post.users.name}</span>
                  <span className="text-gray-400">
                    {formatDate(post.created_at)}
                  </span>
                </div>
                <p>{post.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
