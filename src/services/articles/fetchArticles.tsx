import { BasePaginatedApiResponse } from "@/src/types/api";
import { ArticleType } from "@/src/types/article";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchArticles = async (queryParams?: {
  search?: string;
  categories_id?: number;
  page?: number;
  limit?: number;
}): Promise<BasePaginatedApiResponse<ArticleType>> => {
  return await request(generateUrl(`articles`, queryParams), {
    method: "GET",
  });
};
