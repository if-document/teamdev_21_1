export type User = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  category: string;
  articleImageUrl: string;
  time: string;
  author: User;
};

export type Comment = {
  id: number;
  content: string;
  time: string;
  user: User;
};

export type PageNumber = number | "ellipsisLeft" | "ellipsisRight";
