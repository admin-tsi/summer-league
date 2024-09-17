import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Articles } from "@/lib/types/blog/blog";

interface HeadlinesProps {
  headlines: Articles | null;
}

const Headlines: React.FC<HeadlinesProps> = ({ headlines }) => {
  const publishedHeadlines =
    headlines?.filter((article) => article.status === "published") || [];

  return (
    <Card className="bg-card h-fit text-card-foreground">
      <CardHeader>
        <CardTitle>Headlines</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 flex-col">
          {publishedHeadlines.length > 0 ? (
            publishedHeadlines.slice(0, 8).map((article) => (
              <li key={article._id} className="text-sm py-1">
                <Link href={`/articles/${article._id}`} passHref>
                  <span className="cursor-pointer hover:text-primary transition-colors duration-200 ease-in-out">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Headlines;
