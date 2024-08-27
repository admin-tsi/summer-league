import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import SkeletonLoader from "@/components/schedules/view/skeleton-loader";

const BoxScoreSkeletonLoader: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        <span className="inline-block">
          <Skeleton className="h-8 w-64" />
        </span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    </div>
  );
};

export default BoxScoreSkeletonLoader;
