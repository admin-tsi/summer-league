"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/loading-spinner";
import { getGameStats } from "@/lib/api/games/games";

type PlayerStats = {
  player: {
    _id: string;
    firstName: string;
    lastName: string;
    position: string;
    dorseyNumber: number;
    playerTeam: {
      _id: string;
      teamName: string;
    };
  };
  stats: {
    points: number;
    rebonds: number;
    fouls: number;
    assists: number;
    turnover: number;
    blocks: number;
    steal: number;
  };
};

type GameStats = PlayerStats[];

const BoxScorePage: React.FC = () => {
  const { teamId, gameId } = useParams<{ teamId: string; gameId: string }>();
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const competitionId = "66cbbc31b450ee0e0b089f88";

  useEffect(() => {
    const fetchGameStats = async () => {
      try {
        const stats = await getGameStats(teamId, gameId, competitionId);
        console.log(stats);
        // @ts-ignore
        setGameStats(stats);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch game stats");
        setLoading(false);
      }
    };

    fetchGameStats();
  }, [gameId, teamId, competitionId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!gameStats) return <div>No data available</div>;

  const teamName = gameStats[0]?.player.playerTeam.teamName || "Team";

  const renderTeamStats = (stats: GameStats) => (
    <Card>
      <CardHeader>
        <CardTitle>{teamName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Player</TableHead>
              <TableHead>PTS</TableHead>
              <TableHead>REB</TableHead>
              <TableHead>AST</TableHead>
              <TableHead>STL</TableHead>
              <TableHead>BLK</TableHead>
              <TableHead>TO</TableHead>
              <TableHead>PF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((playerStat) => (
              <TableRow key={playerStat.player._id}>
                <TableCell className="font-medium">
                  {playerStat.player.firstName} {playerStat.player.lastName}{" "}
                  <span className="text-muted-foreground">
                    #{playerStat.player.dorseyNumber}
                  </span>
                </TableCell>
                <TableCell>{playerStat.stats.points}</TableCell>
                <TableCell>{playerStat.stats.rebonds}</TableCell>
                <TableCell>{playerStat.stats.assists}</TableCell>
                <TableCell>{playerStat.stats.steal}</TableCell>
                <TableCell>{playerStat.stats.blocks}</TableCell>
                <TableCell>{playerStat.stats.turnover}</TableCell>
                <TableCell>{playerStat.stats.fouls}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const calculateTeamTotals = (stats: GameStats = []) => {
    return stats.reduce(
      (totals, player) => {
        Object.keys(player.stats).forEach((key) => {
          // @ts-ignore
          totals[key] = (totals[key] || 0) + player.stats[key];
        });
        return totals;
      },
      {} as { [key: string]: number },
    );
  };

  const teamTotals = calculateTeamTotals(gameStats);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Box Score: {teamName}</h1>
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Totals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-lg">
              <span>PTS: {teamTotals.points}</span>
              <span>REB: {teamTotals.rebonds}</span>
              <span>AST: {teamTotals.assists}</span>
              <span>STL: {teamTotals.steal}</span>
              <span>BLK: {teamTotals.blocks}</span>
              <span>TO: {teamTotals.turnover}</span>
              <span>PF: {teamTotals.fouls}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {renderTeamStats(gameStats)}
    </div>
  );
};

export default BoxScorePage;
