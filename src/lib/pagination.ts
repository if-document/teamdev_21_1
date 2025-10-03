import { PageNumber } from "@/lib/types";

/**
 * 指定範囲のページ番号を配列で返す
 */
const pageRange = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * ページネーションの表示用ページ番号を計算する
 *
 * - totalPages が maxDisplay 以下 → 全ページを表示
 * - totalPages が maxDisplay を超える → 省略記号(...) を含めて表示
 */
export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxDisplay: number = 11,
): PageNumber[] => {
  const halfDisplayRange = Math.ceil(maxDisplay / 2);
  const middlePageCount = maxDisplay - 4; // 先頭(1)と末尾(totalPages)、省略記号2つ分を除いた残り
  const middleStart = currentPage - Math.floor(middlePageCount / 2);
  const middleEnd = middleStart + middlePageCount - 1;

  const hasEllipsisRight = totalPages - currentPage > halfDisplayRange;
  const hasEllipsisLeft = currentPage > halfDisplayRange;

  // すべてのページを表示できる場合
  if (totalPages <= maxDisplay) {
    return pageRange(1, totalPages);
  }

  // 右側にだけ省略記号が必要な場合
  if (hasEllipsisRight && !hasEllipsisLeft) {
    return [...pageRange(1, maxDisplay - 2), "ellipsisRight", totalPages];
  }

  // 左側にだけ省略記号が必要な場合
  if (!hasEllipsisRight && hasEllipsisLeft) {
    return [
      1,
      "ellipsisLeft",
      ...pageRange(totalPages - (maxDisplay - 2) + 1, totalPages),
    ];
  }

  // 両側に省略記号が必要な場合
  return [
    1,
    "ellipsisLeft",
    ...pageRange(middleStart, middleEnd),
    "ellipsisRight",
    totalPages,
  ];
};
