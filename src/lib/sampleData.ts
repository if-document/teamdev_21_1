import { Article, Comment } from "@/lib/types";

export const articleData: Article = {
  id: 1,
  title: "Blog Title",
  content:
    "これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。\n\nこれはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。これはサンプルの文章です。",
  category: "Sample Category",
  authorAvatarUrl: null,
  authorName: "Author",
  articleImageUrl: "",
};

export const commentListData: Comment[] = [
  {
    id: 1,
    userName: "user",
    userAvatarUrl: null,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
    time: "a min ago",
  },
  {
    id: 2,
    userName: "user",
    userAvatarUrl: null,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
    time: "a min ago",
  },
];
