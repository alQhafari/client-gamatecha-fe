import { ArticleStatus } from "../enums/article-status.enum";
import { Category } from "./category";

export type ArticleType = {
  id: number;
  title: string;
  slug: string;
  mediaUrl: string;
  status?: ArticleStatus;
  content: string;
  categories?: Category[];
  publishedAt?: string;
  postInstagram?: unknown;
  createdAt?: string;
  updatedAt?: string;
};
