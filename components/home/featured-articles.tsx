import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Articles } from "@/lib/types/blog/blog";
import FeatureCardSkeleton from "@/components/home/skeleton/feature-card-skeleton";
import TiptapParser from "tiptap-parser";

interface FeaturedArticlesProps {
  articles: Articles | null;
  loading: boolean;
  showAll?: boolean;
}

const DEFAULT_IMAGE_URL =
  "https://live.staticflickr.com/65535/53962232697_58e31dfac0_h.jpg";

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
  articles,
  loading,
  showAll = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(showAll ? 9 : 3)].map((_, index) => (
          <FeatureCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return <p>No published articles available.</p>;
  }

  const displayedArticles = showAll
    ? articles.filter((article) => article.status === "published")
    : articles.filter((article) => article.status === "published").slice(0, 3);

  if (displayedArticles.length === 0) {
    return <p>No published articles available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-16">
      {displayedArticles.map((article) => (
        <Card key={article._id} className="flex flex-col h-[500px]">
          <CardHeader className="h-[80px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardTitle className="text-lg truncate cursor-help">
                    {article.title}
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{article.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="h-[200px] mb-4 relative">
              <Image
                src={article.featuredImage || DEFAULT_IMAGE_URL}
                alt={article.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {article.author
                ? `${article.author.firstName} ${article.author.lastName}`
                : "Unknown Author"}{" "}
              • {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm line-clamp-3 flex-grow">
              <TiptapParser
                content={
                  article.excerpt || article.content.slice(0, 100) + "..."
                }
              />
            </p>
          </CardContent>
          <CardFooter>
            <Link href={`/articles/${article._id}`} className="w-full">
              <Button variant="outline" className="w-full">
                Read More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedArticles;
