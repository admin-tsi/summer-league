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
            <TableHead className="text-background uppercase" key={key}>
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
import OlokunDepths from "../../public/team-textures/OLOKUN-DEPTHS.png";
import OgunWarriors from "../../public/team-textures/OGUN-WARRIORS.png";
import XeviosoArtisans from "../../public/team-textures/XEVIOSO-ARTISANS.png";
import MawuSunrays from "../../public/team-textures/MAWU-SUNRAYS.png";
import GletiScholars from "../../public/team-textures/GLETI-SCHOLARS.png";
import ObatalaTitans from "../../public/team-textures/OBATALA-TITANS.png";
import LokoRoots from "../../public/team-textures/LOKO-ROOTS.png";
import LissaRainbows from "../../public/team-textures/LISSA-RAINBOWS.png";
import GbaduDancers from "../../public/team-textures/GBADU-DANCERS.png";
import OriDestinies from "../../public/team-textures/ORI-DESTINIES.png";
import IbejiYouth from "../../public/team-textures/IBEJI-YOUTH.png";
