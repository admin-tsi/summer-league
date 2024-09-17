import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FeatureCardSkeleton = () => {
  return (
    <Card className="flex flex-col animate-pulse">
      <CardHeader>
        <Skeleton className="h-6  rounded w-3/4"></Skeleton>
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="w-full h-40 mb-4 rounded-md"></Skeleton>
        <Skeleton className="h-4 rounded w-2/3 mb-2"></Skeleton>
        <Skeleton className="h-4 rounded w-full mb-1"></Skeleton>
        <Skeleton className="h-4 rounded w-4/5"></Skeleton>
      </CardContent>
      <CardFooter>
        <Skeleton className="w-full h-10 rounded"></Skeleton>
      </CardFooter>
    </Card>
  );
};

export default FeatureCardSkeleton;
