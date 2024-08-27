import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <Card className="mb-8 overflow-x-auto">
      <CardHeader>
        <CardTitle className="text-xl">
          <Skeleton className="h-6 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead className="w-[140px]">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                {[...Array(7)].map((_, i) => (
                  <TableHead key={i} className="text-right">
                    <Skeleton className="h-4 w-8 ml-auto" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(8)].map((_, i) => (
                <TableRow key={i} className="text-xs">
                  <TableCell className="font-medium">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j} className="text-right">
                      <Skeleton className="h-4 w-8 ml-auto" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonLoader;
