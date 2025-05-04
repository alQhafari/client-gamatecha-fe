"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { FaCircle } from "react-icons/fa";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchOneArticles } from "../../../services/articles/fetchOneArticle";
import TimestampComponent from "../../../components/timestamp";
import { Recommendations } from "../../../components/recommendations";

export default function Article() {
  const router = useRouter();

  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const { data, isError, error } = useQuery({
    queryKey: ["articles", { slug: slug }],
    queryFn: () => fetchOneArticles({ slug }),
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="h-dvh px-12 md:px-24">
        <div className="mb-8">
          <Button variant={"ghost"} onClick={router.back}>
            <ArrowLeft className="h-6 w-6" />
            Back
          </Button>
        </div>

        <Card
          style={{
            backgroundImage: `url(${data?.data?.mediaUrl})`,
          }}
          className={`bg-cover bg-center h-full flex flex-col justify-end`}
        >
          <div className="flex flex-col justify-between backdrop-blur h-2/5 p-2 sm:p-4">
            <CardHeader className="p-0">
              <div className="flex gap-3">
                {data?.data?.categories && data?.data?.categories.length > 0 ? (
                  data?.data?.categories?.map((category) => (
                    <span
                      key={category.id}
                      className="text-violet-600 text-sm bg-white/75 rounded-full px-1 py sm:px-2 sm:py-1"
                    >
                      <FaCircle className="h-4 w-4 inline-block mr-2" />
                      {category.name}
                    </span>
                  ))
                ) : (
                  <span className="text-violet-600 text-sm bg-white/75 rounded-full px-1 py sm:px-2 sm:py-1">
                    <FaCircle className="h-4 w-4 inline-block mr-2" />
                    Terbaru
                  </span>
                )}
              </div>
            </CardHeader>
            <CardTitle className="text-xl sm:text-3xl align-middle">
              {data?.data?.title}
            </CardTitle>
            <CardFooter className="p-0">
              <div>
                <TimestampComponent
                  createdAt={
                    data?.data?.publishedAt
                      ? data?.data?.publishedAt
                      : data?.data?.createdAt
                  }
                />
              </div>
            </CardFooter>
          </div>
        </Card>

        <article className="prose prose-lg sm:prose-xl max-w-none py-6 space-y-6">
          {data?.data?.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        <h2 className={`text-xl font-bold mb-8 mt-16`}>Recommendation</h2>

        <Recommendations />
      </div>
    </>
  );
}
