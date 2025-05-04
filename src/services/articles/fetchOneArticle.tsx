import { BaseApiResponse } from "@/src/types/api";
import { ArticleType } from "@/src/types/article";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchOneArticles = async ({
  slug,
}: {
  slug: string;
}): Promise<BaseApiResponse<ArticleType>> => {
  return await request(generateUrl(`articles/${slug}`), {
    method: "GET",
  });
};
