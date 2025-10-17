import type { Article, Comment, User } from "@/types/types";

const authorData: User = {
  id: 1,
  name: "Author",
  avatarUrl: null,
};

const userData: User = {
  id: 1,
  name: "User",
  avatarUrl: null,
};

export const articleData: Article = {
  id: 1,
  title: "Blog Title",
  content:
    "これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。\n\nこれはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。",
  category: "Category",
  articleImageUrl: "",
  time: "a min ago",
  author: authorData,
};

export const postsData: Article[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  title: `Post Title ${i + 1}`,
  content:
    "text text text text text text text text text text text text text text text text text text text...",
  category: "Category",
  articleImageUrl: "/images/post-thumbnail.jpg",
  time: "a min ago",
  author: authorData,
}));

export const commentListData: Comment[] = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
    time: "a min ago",
    user: userData,
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
    time: "a min ago",
    user: userData,
  },
];
