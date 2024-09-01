import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { BasketballTeamStats } from "@/lib/types/players/players";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PlayerStatsTableProps {
  playerStats: BasketballTeamStats;
}

interface HoverPosition {
  x: number;
  y: number;
}

const PlayerStatsTable: React.FC<PlayerStatsTableProps> = ({ playerStats }) => {
  const [hoverInfo, setHoverInfo] = useState<{
    visible: boolean;
    position: HoverPosition;
    player: BasketballTeamStats[number] | null;
  }>({
    visible: false,
    position: { x: 0, y: 0 },
    player: null,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = useCallback(
    (
      e: React.MouseEvent<HTMLTableRowElement>,
      player: BasketballTeamStats[number]
    ) => {
      if (!isMobile) {
        setHoverInfo({
          visible: true,
          position: { x: e.clientX, y: e.clientY },
          player,
        });
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setHoverInfo((prev) => ({ ...prev, visible: false }));
    }
  }, [isMobile]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement>) => {
      if (!isMobile) {
        setHoverInfo((prev) => ({
          ...prev,
          position: { x: e.clientX, y: e.clientY },
        }));
      }
    },
    [isMobile]
  );

  const calculateAge = useCallback((birthdate: string): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }, []);

  return (
    <>
      <Table>
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="text-background uppercase">Player</TableHead>
            <TableHead className="text-background uppercase">
              Position
            </TableHead>
            <TableHead className="text-background uppercase">Points</TableHead>
            <TableHead className="text-background uppercase">
              Rebounds
            </TableHead>
            <TableHead className="text-background uppercase">Assists</TableHead>
            <TableHead className="text-background uppercase">Steals</TableHead>
            <TableHead className="text-background uppercase">Blocks</TableHead>
            <TableHead className="text-background uppercase">
              Turnovers
            </TableHead>
            <TableHead className="text-background uppercase">Fouls</TableHead>
            <TableHead className="text-background uppercase">Games</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playerStats.map((stat) => (
            <TableRow
              key={stat.player._id}
              className={isMobile ? "" : "cursor-pointer"}
              onMouseEnter={(e) => handleMouseEnter(e, stat)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <span>{`${stat.player.firstName} ${stat.player.lastName}`}</span>
                </div>
              </TableCell>
              <TableCell>{stat.player.position}</TableCell>
              <TableCell>{stat.stats.points}</TableCell>
              <TableCell>{stat.stats.rebonds}</TableCell>
              <TableCell>{stat.stats.assists}</TableCell>
              <TableCell>{stat.stats.steal}</TableCell>
              <TableCell>{stat.stats.blocks}</TableCell>
              <TableCell>{stat.stats.turnOver}</TableCell>
              <TableCell>{stat.stats.fouls}</TableCell>
              <TableCell>{stat.stats.totalGames}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!isMobile && hoverInfo.visible && hoverInfo.player && (
        <div
          className="fixed z-50 bg-white p-4 rounded-lg shadow-lg"
          style={{
            left: `${hoverInfo.position.x + 10}px`,
            top: `${hoverInfo.position.y + 10}px`,
            pointerEvents: "none",
          }}
        >
          <div className="flex items-center space-x-4">
            <Image
              src={hoverInfo.player.player.playerImage}
              alt={`${hoverInfo.player.player.firstName} ${hoverInfo.player.player.lastName}`}
              width={200}
              height={200}
              className="rounded-lg"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
            <div>
              <h3 className="text-lg font-bold">
                {`${hoverInfo.player.player.firstName} ${hoverInfo.player.player.lastName} - ${calculateAge(hoverInfo.player.player.birthdate)} years old`}
              </h3>
              <p>{hoverInfo.player.player.position}</p>
              <p>{`${hoverInfo.player.player.height}cm, ${hoverInfo.player.player.weight}kg`}</p>
              <p>{`#${hoverInfo.player.player.dorseyNumber}`}</p>
              <p className="mt-2">Points: {hoverInfo.player.stats.points}</p>
              <p>Rebounds: {hoverInfo.player.stats.rebonds}</p>
              <p>Assists: {hoverInfo.player.stats.assists}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerStatsTable;
