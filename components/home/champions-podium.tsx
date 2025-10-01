"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { getAllCompetition } from "@/lib/api/competition/competition";
import { getGirlsTeamRanking, getBoysTeamRanking } from "@/lib/api/team/team";

type TeamRanking = {
  teamId: {
    _id: string;
    teamName: string;
    city: string;
    divisionName: string;
    teamGender: string;
  };
  stats: {
    points: number;
    wins: number;
    losses: number;
    rebonds: number;
    assists: number;
    steals: number;
  };
};

const ChampionsPodium: React.FC = () => {
  const [boysRankings, setBoysRankings] = useState<TeamRanking[]>([]);
  const [girlsRankings, setGirlsRankings] = useState<TeamRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const competitions = await getAllCompetition();
        const competition2024 = competitions.find(
          (competition) =>
            new Date(competition.createdAt).getFullYear() === 2024
        );

        if (competition2024) {
          const [boysData, girlsData] = await Promise.all([
            getBoysTeamRanking(competition2024._id),
            getGirlsTeamRanking(competition2024._id)
          ]);

          setBoysRankings(boysData.slice(0, 3));
          setGirlsRankings(girlsData.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching rankings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 1:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 2:
        return <Award className="h-8 w-8 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBorder = (position: number) => {
    switch (position) {
      case 0:
        return "border-l-4 border-l-yellow-500 bg-yellow-50";
      case 1:
        return "border-l-4 border-l-gray-400 bg-gray-50";
      case 2:
        return "border-l-4 border-l-amber-600 bg-amber-50";
      default:
        return "border-l-4 border-l-gray-200 bg-white";
    }
  };

  const PodiumSection = ({ title, rankings }: {
    title: string;
    rankings: TeamRanking[];
  }) => (
    <Card className="border-0 shadow-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rankings.map((team, index) => (
          <div
            key={team.teamId._id}
            className={`p-6 rounded-lg ${getRankBorder(index)} flex items-center gap-4`}
          >
            <div className="flex-shrink-0">
              {getRankIcon(index)}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {team.teamId.teamName}
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {team.stats.wins}-{team.stats.losses}
                  </div>
                  <div className="text-sm text-gray-500">W-L</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Points: </span>
                  <span className="font-semibold text-gray-900">{team.stats.points}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500">{team.teamId.city} • {team.teamId.divisionName}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="w-full container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">🏆 Podium des Champions 2024</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-20 bg-gray-100 rounded"></div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full container mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Relive the Magic
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Dive into the heart of the action with the most intense moments of Summer League 2024.
          A total immersion in the electrifying atmosphere of the competition.
        </p>
      </div>

      <div className="rounded-lg overflow-hidden shadow-lg">
        <video
          src="/intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ChampionsPodium;