import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../services/articles/fetchArticles";
import { ArticleCard } from "./article-card";

export function Recommendations() {
  const { data } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles({ page: 1, limit: 3 }),
  });

  return (
    <div className="flex flex-row justify-between gap-4 mb-8 overflow-scroll">
      {data?.data?.map((article, key) => (
        <ArticleCard
          key={key}
          title={article.title}
          slug={article.slug}
          description={article.content}
          imageUrl={article.mediaUrl}
          categories={article.categories}
          createdAt={article.createdAt}
        />
      ))}
    </div>
  );
}
