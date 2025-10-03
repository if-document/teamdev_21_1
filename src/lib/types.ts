export type Article = {
  id: number;
  title: string;
  content: string;
  category: string;
  articleImageUrl: string;
  time: string;
  authorName: string;
  authorAvatarUrl: string | null;
};

export type Comment = {
  id: number;
  content: string;
  time: string;
  userName: string;
  userAvatarUrl: string | null;
};

export type PageNumber = number | "ellipsisLeft" | "ellipsisRight";
