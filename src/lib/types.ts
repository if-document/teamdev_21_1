export type Article = {
  id: number;
  title: string;
  content: string;
  category: string;
  authorAvatarUrl: string | null;
  authorName: string;
  articleImageUrl: string;
};

export type Comment = {
  id: number;
  userName: string;
  userAvatarUrl: string | null;
  content: string;
  time: string;
};
