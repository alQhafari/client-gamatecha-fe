import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import exampleImage from "../../public/assets/images/Silver iMac iPhone Photo.jpg";
import { ArticleStatus } from "../enums/article-status.enum";
import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Category } from "../types/category";
import { FaCircle } from "react-icons/fa";
import TimestampComponent from "./timestamp";

interface ArticleProps {
  className?: string;
  title?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  status?: ArticleStatus;
  categories?: Partial<Category>[];
  createdAt?: string;
}

export function ArticleCard({
  className,
  title,
  description,
  imageUrl,
  categories,
  createdAt,
  ...props
}: ArticleProps) {
  return (
    <Link href={`/articles/${props.slug}`} className="h-full w-full">
      <Card
        className={cn(
          "hover:bg-white/5 hover:cursor-pointer border-none h-full flex flex-col justify-between",
          className
        )}
        {...props}
      >
        <CardHeader className="p-0 rounded-lg h-full">
          <Image
            width={300}
            height={500}
            src={imageUrl || exampleImage}
            alt={`Card Image`}
            className="max-h-56 min-h-full w-full object-cover rounded-lg"
          />
        </CardHeader>
        <CardContent className="p-4 flex flex-col gap-4 justify-center">
          <TimestampComponent createdAt={createdAt} />
          <div className="flex justify-between">
            <CardTitle className="line-clamp-3">
              {title || "Title Article"}
            </CardTitle>
            <ArrowUpRight />
          </div>
          <CardDescription
            className={`line-clamp-3 text-justify text-xs`}
            dangerouslySetInnerHTML={{
              __html: description || "Description Article",
            }}
          />
          <CardFooter className="p-0">
            {categories?.map((category) => (
              <span
                key={category.id}
                className="text-violet-600 text-sm bg-white/75 rounded-full px-1 py sm:px-2 sm:py-1"
              >
                <FaCircle className="h-4 w-4 inline-block mr-2" />
                {category.name}
              </span>
            ))}
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
}
