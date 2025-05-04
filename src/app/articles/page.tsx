"use client";

import { Categories } from "@/src/components/categories";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArticleCard } from "../../components/article-card";
import { PaginationComponent } from "../../components/pagination";
import { Input } from "../../components/ui/input";
import { fetchArticles } from "../../services/articles/fetchArticles";
import { ArticleType } from "../../types/article";

export default function Article() {
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
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-black from-0%  via-gray-900 via-50% to-black to-100% h-screen text-white mb-8">
        <p className="text-sm uppercase tracking-widest text-gray-400">
          Welcome to <span className="text-red-500">Gamatecha</span>
        </p>
        <h1 className="text-5xl font-extrabold text-center leading-snug mt-4">
          Your Gateway to <span className="text-red-500">Tech Insights</span>{" "}
          <br /> & Innovations
        </h1>
        <div className="mt-8">
          <button className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all">
            Explore Articles
          </button>
        </div>
      </div>

      <div className="px-12 md:px-24">
        <div className=" items-center justify-items-center pb-20 gap-4 md:gap-2 font-[family-name:var(--font-geist-sans)]">
          <ArticleCard
            className="grid grid-cols- md:grid-cols-2 h-full w-full"
            slug={data?.data[0]?.slug}
            title={data?.data[0]?.title}
            description={data?.data[0]?.content}
            imageUrl={data?.data[0]?.mediaUrl}
            status={data?.data[0]?.status}
            categories={data?.data[0]?.categories}
            createdAt={data?.data[0]?.createdAt}
          />
        </div>

        <h2 className={`text-3xl font-bold mb-8`}>Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-items-center pb-20 gap-4 font-[family-name:var(--font-geist-sans)]">
          {data?.data?.slice(1, 5).map((item, index) => (
            <ArticleCard
              key={index}
              slug={item.slug}
              title={item.title}
              description={item.content}
              imageUrl={item.mediaUrl}
              status={item.status}
              categories={item.categories}
              createdAt={item.createdAt}
            />
          ))}
        </div>

        <h2 className={`text-xl font-bold mb-8`}>All Blogs</h2>

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
