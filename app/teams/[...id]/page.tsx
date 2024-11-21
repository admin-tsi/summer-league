"use client";
import React, { useEffect, useState, useCallback } from "react";
import { BasketballTeamStats, Player } from "@/lib/types/players/players";
import {
  getPlayerStats,
  getSpecificTeamPlayer,
} from "@/lib/api/players/players";
import { getTeamStats } from "@/lib/api/teams/teams";
import Image from "next/image";
import img from "../../../public/basketball.jpg";
import TableSkeleton from "@/components/home/skeleton/table-skeleton";
import { TeamStats } from "@/lib/types/teams/teams";
import TeamStatsTable from "@/components/teams/teamStatsTable";
import PlayerStatsTable from "@/components/teams/playerStatsTable";

interface PageProps {
  params: {
    id: string[];
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [teamName, city, gender, division, teamId] = params.id;
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [playerStats, setPlayerStats] = useState<BasketballTeamStats | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const competitionId = localStorage.getItem("competitionId");
      if (!competitionId) {
        throw new Error("Competition ID not found");
      }

      const [playersData, statsData, playerStatsData] = await Promise.all([
        getSpecificTeamPlayer(teamId, competitionId),
        getTeamStats(teamId, competitionId),
        getPlayerStats(teamId, competitionId),
      ]);

      setPlayers(Array.isArray(playersData) ? playersData : [playersData]);
      setTeamStats(statsData);
      setPlayerStats(playerStatsData);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const capitalizeFirstLetter = useCallback((string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }, []);

  const renderContent = (title: string, content: React.ReactNode) => (
    <>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        content
      )}
    </>
  );

  return (
    <div className="w-full">
      <div className="relative w-full h-[20vh]">
        <Image src={img} alt="basketball" fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <span className="text-3xl font-bold text-background">
            {teamName.replace("-", " ").toUpperCase()}
          </span>
          <div className="text-background text-sm">
            {capitalizeFirstLetter(city)}, {capitalizeFirstLetter(gender)},{" "}
            {capitalizeFirstLetter(division)}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full bg-background shadow-md">
          <div className="container mx-auto">
            <div className="py-2 px-4 font-semibold">Team Stats</div>
          </div>
        </div>
        <div className="container mx-auto mt-8">
          <div className="grid grid-cols-1 gap-4">
            {renderContent(
              "Player Statistics",
              playerStats ? (
                <PlayerStatsTable playerStats={playerStats} />
              ) : (
                <p>No player statistics available.</p>
              ),
            )}
            {renderContent(
              "Team Statistics",
              teamStats ? (
                <TeamStatsTable stats={teamStats} />
              ) : (
                <p>No team statistics available.</p>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
