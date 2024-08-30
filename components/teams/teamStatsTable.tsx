import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TeamStats = {
  [key: string]: string | number;
};

const TeamStatsTable: React.FC<{ stats: TeamStats }> = ({ stats }) => {
  const keys = Object.keys(stats);

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-black hover:bg-black">
          <TableHead className="text-background">Stats</TableHead>
          {keys.map((key) => (
            <TableHead className="text-background" key={key}>
              {key}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Value</TableCell>
          {keys.map((key) => (
            <TableCell key={key}>{stats[key]}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TeamStatsTable;
