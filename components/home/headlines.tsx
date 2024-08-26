import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Articles } from "@/types/blog/blog";

interface HeadlinesProps {
  headlines: Articles | null;
}

const Headlines: React.FC<HeadlinesProps> = ({ headlines }) => {
  return (
    <Card className="bg-card h-fit text-card-foreground">
      <CardHeader>
        <CardTitle>Headlines</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 flex-col">
          {headlines && headlines.length > 0 ? (
            headlines.slice(0, 8).map((article, i) => (
              <li key={article._id} className="text-sm py-1">
                {article.title}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No headlines available</li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Headlines;
