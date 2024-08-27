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
  TableFooter,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGameStats } from "@/lib/api/games/games";
import { GameStats, TeamStats } from "@/lib/types/games/games";
import BoxScoreSkeletonLoader from "@/components/schedules/view/box-skeleton-score";

const BoxScorePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const competitionId = localStorage.getItem("competitionId");

  useEffect(() => {
    const fetchGameStats = async () => {
      try {
        const stats = await getGameStats(gameId, competitionId);
        setGameStats(stats);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch game stats");
        setLoading(false);
      }
    };

    fetchGameStats();
  }, [gameId, competitionId]);

  const calculateTeamTotals = (stats: TeamStats) => {
    return stats.reduce(
      (totals, player) => {
        Object.keys(player.stats).forEach((key) => {
          totals[key as keyof typeof player.stats] +=
            player.stats[key as keyof typeof player.stats];
        });
        return totals;
      },
      {
        points: 0,
        rebonds: 0,
        fouls: 0,
        assists: 0,
        turnover: 0,
        blocks: 0,
        steal: 0,
      },
    );
  };

  const renderTeamStats = (stats: TeamStats, teamName: string) => {
    const totals = calculateTeamTotals(stats);

    return (
      <Card className="mb-8 overflow-x-auto">
        <CardHeader>
          <CardTitle className="text-xl">{teamName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead className="w-[140px]">Player</TableHead>
                  <TableHead className="text-right">PTS</TableHead>
                  <TableHead className="text-right">REB</TableHead>
                  <TableHead className="text-right">AST</TableHead>
                  <TableHead className="text-right">STL</TableHead>
                  <TableHead className="text-right">BLK</TableHead>
                  <TableHead className="text-right">TO</TableHead>
                  <TableHead className="text-right">PF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.map((playerStat) => (
                  <TableRow key={playerStat.player._id} className="text-xs">
                    <TableCell className="font-medium whitespace-nowrap">
                      {playerStat.player.firstName} {playerStat.player.lastName}{" "}
                      <span className="text-muted-foreground">
                        #{playerStat.player.dorseyNumber}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {playerStat.stats.points}
                    </TableCell>
                    <TableCell className="text-right">
                      {playerStat.stats.rebonds}
                    </TableCell>
                    <TableCell className="text-right">
                      {playerStat.stats.assists}
                    </TableCell>
                    <TableCell className="text-right">
                      {playerStat.stats.steal}
                    </TableCell>
                    <TableCell className="text-right">
                      {playerStat.stats.blocks}
                    </TableCell>
                    <TableCell className="text-right">
                      {playerStat.stats.turnover}
                    </TableCell>
                    <TableCell className="text-right">
                      {playerStat.stats.fouls}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="text-xs font-bold">
                  <TableCell>Totals</TableCell>
                  <TableCell className="text-right">{totals.points}</TableCell>
                  <TableCell className="text-right">{totals.rebonds}</TableCell>
                  <TableCell className="text-right">{totals.assists}</TableCell>
                  <TableCell className="text-right">{totals.steal}</TableCell>
                  <TableCell className="text-right">{totals.blocks}</TableCell>
                  <TableCell className="text-right">
                    {totals.turnover}
                  </TableCell>
                  <TableCell className="text-right">{totals.fouls}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) return <BoxScoreSkeletonLoader />;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!gameStats) return <div>No data available</div>;

  const homeTeamName =
    gameStats.homeTeam[0]?.player.playerTeam.teamName || "Home Team";
  const awayTeamName =
    gameStats.awayTeam[0]?.player.playerTeam.teamName || "Away Team";
  const city = gameStats.awayTeam[0]?.player.playerTeam.city || "N/A";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        {homeTeamName} vs {awayTeamName} ({city})
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderTeamStats(gameStats.homeTeam, homeTeamName)}
        {renderTeamStats(gameStats.awayTeam, awayTeamName)}
      </div>
      <div></div>
    </div>
  );
};

export default BoxScorePage;
