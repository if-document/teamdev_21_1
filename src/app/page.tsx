import Image from "next/image";
import Link from "next/link";
import { Pagination } from "@/components/pagination/Pagination";
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";
import { postsData } from "@/lib/sampleData";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const { paginatedPosts, totalPages } = usePaginatedPosts(
    postsData,
    currentPage,
    9,
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
                  src={post.articleImageUrl}
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
                    {post.category.name}
                  </span>
                </div>
                <div className="flex items-center gap-x-[20px] mb-[10px] text-[16px]">
                  <span className="text-[#18A0FB]">{post.author.name}</span>
                  <span className="text-gray-400">{post.time}</span>
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
