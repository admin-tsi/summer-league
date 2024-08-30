import React from "react";
import { Player } from "@/lib/types/players/players";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PlayerTableProps {
  players: Player[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-black text-background hover:bg-black">
          <TableHead className="text-background">Name</TableHead>
          <TableHead className="text-background">Position</TableHead>
          <TableHead className="text-background">Height (cm)</TableHead>
          <TableHead className="text-background">Weight (kg)</TableHead>
          <TableHead className="text-background">Jersey Number</TableHead>
          <TableHead className="text-background">College</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player._id}>
            <TableCell>{`${player.firstName} ${player.lastName}`}</TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.height}</TableCell>
            <TableCell>{player.weight}</TableCell>
            <TableCell>{player.dorseyNumber}</TableCell>
            <TableCell>{player.college}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerTable;
