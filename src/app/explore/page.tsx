"use client";

import { ArticleCard } from "@/src/components/article-card";
import { Categories } from "@/src/components/categories";
import { PaginationComponent } from "@/src/components/pagination";
import { Input } from "@/src/components/ui/input";
import { fetchArticles } from "@/src/services/articles/fetchArticles";
import { ArticleType } from "@/src/types/article";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(1);

  const { data, isError, error } = useQuery({
    queryKey: ["articles", { search, category, page }],
    queryFn: async () =>
      fetchArticles({ search, categories_id: category, page }),
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="px-12 md:px-24">
        <Input
          className={`mb-8 bg-white/5 rounded-full`}
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            const search = e.target.value;
            setSearch(search);
          }}
        />

        <Categories selected={category} setSelected={setCategory} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-items-center pb-20 gap-4 md:gap-2 font-[family-name:var(--font-geist-sans)]">
          {data?.data?.map((article: Partial<ArticleType>) => (
            <ArticleCard
              slug={article.slug}
              key={article.id}
              title={`${article?.title?.slice(0, 50)}...`}
              description={`${article?.content?.slice(0, 100)}...`}
              imageUrl={article.mediaUrl}
              status={article.status}
              categories={article.categories}
              createdAt={article.createdAt}
            />
          ))}
        </div>

        <PaginationComponent
          currentPage={data?.meta.page || 1}
          totalPage={data?.meta.totalPage || 1}
          setPage={setPage}
        />
      </div>
    </>
  );
}
