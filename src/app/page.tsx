import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Home() {
  const posts = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `Post Title ${i + 1}`,
    category: "Category",
    author: "Author",
    time: "a min ago",
    description:
      "text text text text text text text text text text text text text text text text text text text...",
    thumbnail: "/images/post-thumbnail.jpg",
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-[90px] px-[20px]">
      {/* Search Bar */}
      <div className="flex justify-center items-center mb-[90px] gap-x-[20px]">
        <input
          type="text"
          placeholder="Search ..."
          className="w-full text-[26px] font-medium placeholder-[#000000] px-[65px] py-3 bg-gray-200 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#18A0FB] max-w-[740px] h-[60px]"
        />
        <button className="p-2 hover:bg-gray-300 rounded-full transition-colors">
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
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/article/${post.id}`}
              className="bg-white rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-[300px] relative">
                <Image
                  src={post.thumbnail}
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
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center gap-x-[20px] mb-[10px] text-[16px]">
                  <span className="text-[#18A0FB]">{post.author}</span>
                  <span className="text-gray-400">{post.time}</span>
                </div>
                <p>{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-3">
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

          <button className="flex items-center gap-3">
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
