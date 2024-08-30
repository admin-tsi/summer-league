import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const TableSkeleton = (props: Props) => {
  return (
    <div className="animate-pulse">
      <Skeleton className="h-4 w-full" />
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-x-4 mb-4 mt-5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
