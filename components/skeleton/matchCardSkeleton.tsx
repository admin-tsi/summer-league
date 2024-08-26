import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

function MatchCardSkeleton({}: Props) {
  return (
    <Card className="rounded-none border-l first:border-l-0 flex-1 min-w-[150px]">
      <CardContent className="p-2 h-full flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-3 w-20 mt-2" />
      </CardContent>
    </Card>
  );
}

export default MatchCardSkeleton;
