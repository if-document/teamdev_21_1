"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArticleList, type PostRecord } from "@/components/article/ArticleList";

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
    // 表示指定中の記事データを取得する
    ArticleList().then((data) => setArticles(data));
  }, []);

  const FIRST_GRID: number = 0; // 記事インデックス最小値 [固定]
  const GRIDS: number = 3 * 3; // ページ中グリッドにある記事数上限 [固定]
  let range: number[] = [FIRST_GRID, GRIDS - 1]; // 表示範囲のインデックス

  /**
   * 記事データ表示範囲 変更
   * @param amount  範囲シフト（０ならリセット）
   */
  const shiftRange = (amount: number) => {
    const newStart = range[0] + amount;
    const newEnd = range[1] + amount;
    // 上下限値チェック
    if (newStart < 0) return;
    if (newStart >= articles.length) return;

    // シフトかリセットか？
    if (amount === 0) {
      range[0] = FIRST_GRID;
      range[1] = GRIDS - 1;
    } else {
      range[0] = newStart;
      range[1] = newEnd;
    }
  };

  // 前ページ
  const prevPage = () => {
    shiftRange(-1 * GRIDS);
  };
  // 次ページ
  const nextPage = () => {
    shiftRange(GRIDS);
  };

  // デバッグ コンソール出力
  //   if (articles.length > 0) {
  //     console.log(`Post:[${articles.length}] (${index[0]} - ${index[1]})`)
  //     articles.map((data) => {
  //       console.log(` ID: ${data.id}`)
  //       console.log(`  UUID: ${data.user_id}`)
  //       console.log(`  Title: ${data.title}`)
  //       console.log(`  Contents: ${data.content}`)
  //       console.log(`  Contents: ${data.image_path}`)
  //       console.log(`  DateTime: ${formatDate(data.created_at)}`)
  //     })
  //   }

  // #ToDo 仮データと思われる 各要素と posts テーブルとの対応を確認
  // const posts = Array.from({ length: 9 }, (_, i) => ({
  //   id: i + 1,
  //   title: `Post Title ${i + 1}`,
  //   category: "Category",
  //   author: "Author",
  //   time: "a min ago",
  //   description:
  //     "text text text text text text text text text text text text text text text text text text text...",
  //   thumbnail: "/images/post-thumbnail.jpg",
  // }));

  return (
    <div className="min-h-screen bg-gray-50 py-[90px] px-[20px]">
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
      <div className="max-w-[1580px] mx-auto mb-[70px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[90px] gap-y-[70px]">
          {/* {posts.map((post) => ( */}
          {articles.map((post) => (
            <Link
              key={post.id}
              href={`/article/${post.id}`}
              className="bg-white rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-[300px] relative">
                <Image
                  //                src={post.thumbnail}
                  src={post.image_path}
                  alt={`${post.title} Thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-[25px]">
                <div className="flex justify-between items-center mb-[20px]">
                  <h3 className="text-[30px] font-bold">{post.title}</h3>
                  <span className="text-[#18A0FB] text-[18px]">
                    {/* {post.category} */}
                    {post.category_id}
                  </span>
                </div>
                <div className="flex items-center gap-x-[20px] mb-[10px] text-[16px]">
                  {/* <span className="text-[#18A0FB]">{post.author}</span> */}
                  {/* <span className="text-gray-400">{post.time}</span> */}
                  <span className="text-[#18A0FB]">{post.id}</span>
                  <span className="text-gray-400">
                    {formatDate(post.created_at)}
                  </span>
                </div>
                {/* <p>{post.description}</p> */}
                <p>{post.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-3" onClick={prevPage}>
            <Image
              src="/images/arrow-left.svg"
              alt="Previous"
              width={20}
              height={20}
            />
            <span className="font-bold text-[22px]">Previous Page</span>
          </button>

          <div className="flex items-center gap-x-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold transition-colors ${
                  page === 1
                    ? "bg-black text-white border border-black"
                    : "border border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-3" onClick={nextPage}>
            <span className="font-bold text-[22px]">Next Page</span>
            <Image
              src="/images/arrow-right.svg"
              alt="Next"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
