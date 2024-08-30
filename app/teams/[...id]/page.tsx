"use client";
import React, { useEffect, useState } from "react";
import { Player } from "@/lib/types/players/players";
import PlayerTable from "@/components/teams/playerTable";
import { getSpecificTeamPlayer } from "@/lib/api/players/players";
import { getTeamStats } from "@/lib/api/teams/teams";
import Image from "next/image";
import img from "../../../public/basketball.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableSkeleton from "@/components/home/skeleton/table-skeleton";
import { TeamStats } from "@/lib/types/teams/teams";
import TeamStatsTable from "@/components/teams/teamStatsTable";

const Page: React.FC<{ params: { id: string[] } }> = ({ params }) => {
  const [teamName, city, gender, division, teamId] = params.id;
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const competitionId = localStorage.getItem("competitionId");
        if (!competitionId) {
          throw new Error("Competition ID not found");
        }

        const [playersData, statsData] = await Promise.all([
          getSpecificTeamPlayer(teamId, competitionId),
          getTeamStats(teamId, competitionId),
        ]);

        setPlayers(Array.isArray(playersData) ? playersData : [playersData]);
        setTeamStats(statsData);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [teamId]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-[20vh]">
        <Image src={img} alt="basketball" fill className="object-cover" />
        <div className="absolute top-0 left-0 w-full h-full z-30 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <span className="text-3xl font-bold text-background">
            {teamName.replace("-", " ").toUpperCase()}
          </span>
          <div className="text-background text-sm">
            {capitalizeFirstLetter(city)}, {capitalizeFirstLetter(gender)},{" "}
            {capitalizeFirstLetter(division)}
          </div>
        </div>
      </div>
      <div className="">
        <Tabs defaultValue="players" className="w-full">
          <TabsList className="w-full flex justify-start items-center bg-background rounded-none shadow-md">
            <div className="w-full container mx-auto">
              <TabsTrigger
                value="players"
                className="data-[state=active]:border-b-4 rounded-none shadow-none"
              >
                Players
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="data-[state=active]:border-b-4 rounded-none shadow-none"
              >
                Team Stats
              </TabsTrigger>
            </div>
          </TabsList>
          <div className="container mx-auto mt-8">
            <TabsContent value="players">
              <h2 className="text-3xl font-bold mb-4">Team Players</h2>
              {loading ? (
                <TableSkeleton />
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <PlayerTable players={players} />
              )}
            </TabsContent>
            <TabsContent value="stats">
              <h2 className="text-3xl font-bold mb-4">Team Statistics</h2>
              {loading ? (
                <TableSkeleton />
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : teamStats ? (
                <div className="w-full h-96">
                  <TeamStatsTable stats={teamStats} />
                </div>
              ) : (
                <p>No team statistics available.</p>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
