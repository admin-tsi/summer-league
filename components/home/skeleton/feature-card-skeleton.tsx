import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

type Props = {};

const FeatureCardSkeleton = () => {
  return (
    <Card className="lg:col-span-2 bg-border text-secondary">
      <CardContent className="p-0 relative">
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 md:p-6">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCardSkeleton;
