import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const ScheduleSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <Skeleton className="h-10 w-3/4 mx-auto mb-8" />

      <Skeleton className="h-10 w-[300px] mb-6" />

      {[1, 2, 3].map((groupIndex) => (
        <div key={groupIndex} className="mb-8">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="overflow-x-auto">
            <Table>
              <TableBody>
                {[1, 2, 3].map((rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="border-b border-border/50"
                  >
                    <TableCell className="w-[100px]">
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <Skeleton className="h-4 w-8 mb-1" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-24 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleSkeleton;
