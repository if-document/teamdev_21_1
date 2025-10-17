// 時間を「〇 min ago」「〇 hours ago」などの形式で表示するヘルパー関数
export function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // 秒差

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  return date.toLocaleDateString(); // 1か月以上前は日付を表示
}

// バケット内のパスを抽出するヘルパー関数
export const extractPathFromUrl = (
  url: string | null | undefined,
  bucket: string,
): string | null => {
  if (!url) return null;
  // supabaseのストレージを使用しているので、
  // URLはhttps://<yourProject>.supabase.co/storage/v1/object/public/<bucket>/<userId>/<imageName>の形式
  const parts = url.split(`/${bucket}/`);
  return parts.length > 1 ? parts[1] : null; // <userId>/<imageName>の部分を返す
};
