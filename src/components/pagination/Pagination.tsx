"use client";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getPageNumbers } from "@/lib/pagination";

type Props = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="max-w-[1200px] mx-auto py-10">
      <PaginationContainer className="w-full">
        <PaginationContent className="flex justify-center gap-[140px]">
          {/* Previous Button */}
          <PaginationItem className="w-[200px] flex justify-center">
            <PaginationLink
              href={createPageURL(currentPage - 1)}
              aria-disabled={isFirstPage}
              className={
                isFirstPage
                  ? "pointer-events-none opacity-50"
                  : "flex items-center gap-3 w-[200px] hover:bg-gray-200"
              }
            >
              <Image
                src="/images/arrow-left.svg"
                alt="Previous"
                width={20}
                height={21}
              />
              <span className="font-bold text-[22px]">Previous Page</span>
            </PaginationLink>
          </PaginationItem>
          {/* Page Numbers */}
          <div className="flex items-center gap-x-4">
            {pageNumbers.map((pageNumber) =>
              typeof pageNumber === "string" ? (
                <PaginationItem key={pageNumber}>
                  <PaginationEllipsis className="w-10 h-10 flex items-center justify-center text-[15px] font-bold text-gray-500" />
                </PaginationItem>
              ) : (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={createPageURL(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold transition-colors ${
                      pageNumber === currentPage
                        ? "bg-black text-white border-black hover:bg-black hover:text-white"
                        : "border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
          </div>
          {/* Next Button */}
          <PaginationItem className="w-[200px] flex justify-center">
            <PaginationLink
              href={createPageURL(currentPage + 1)}
              aria-disabled={isLastPage}
              className={
                isLastPage
                  ? "pointer-events-none opacity-50"
                  : "flex items-center gap-3 w-[200px] hover:bg-gray-200"
              }
            >
              <span className="font-bold text-[22px]">Next Page</span>
              <Image
                src="/images/arrow-right.svg"
                alt="Next"
                width={20}
                height={21}
              />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </PaginationContainer>
    </div>
  );
};
