import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Article } from "@/lib/types";

const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export function ArticleSection({ article }: { article: Article }) {
  const hasValidImage = isValidUrl(article.articleImageUrl);

  return (
    <section className="p-4 mb-8">
      <Card className="max-w-[1320px] mx-auto bg-stone-100 rounded-2xl pt-[25px] px-[60px] pb-[50px] shadow-none">
        <article>
          <header className="flex justify-between mb-6">
            <div className="flex flex-col">
              <h1 className="text-6xl font-bold mb-4">{article.title}</h1>
              <span className="text-sm text-muted-foreground rounded-full px-3 py-1 border border-muted-foreground w-fit">
                {article.category}
              </span>
            </div>
            <div className="flex-shrink-0">
              <Avatar className="w-[96px] h-[96px]">
                <AvatarImage
                  src={article.author.avatarUrl ?? undefined}
                  alt={article.author.name}
                />
                <AvatarFallback>
                  <Image
                    src="/images/defaultAuthorIcon.svg"
                    alt="Author"
                    width={96}
                    height={96}
                  />
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <div className="relative w-full mx-auto aspect-[2/1] bg-stone-300 flex items-center justify-center mb-12 overflow-hidden">
            {hasValidImage ? (
              <Image
                src={article.articleImageUrl}
                alt="Article image"
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-xl text-muted-foreground">No Image</span>
            )}
          </div>
          <div className="leading-loose whitespace-pre-line">
            {article.content}
          </div>
        </article>
      </Card>
    </section>
  );
}
