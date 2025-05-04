import { ArticleType } from "./article";

export type Category = {
  id: number;
  name: string;
  totalPost?: number;
  createdAt?: string;
  updatedAt?: string;
  articles?: ArticleType[];
};
