export function usePaginatedPosts<T>(
  data: T[],
  currentPage: number,
  postsPerPage: number,
) {
  const totalPosts = data.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const startPost = (currentPage - 1) * postsPerPage;
  const endPost = startPost + postsPerPage;
  const paginatedPosts = data.slice(startPost, endPost);

  return { totalPages, paginatedPosts };
}
