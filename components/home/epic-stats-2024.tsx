"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Users,
  Trophy,
  Zap,
  MapPin,
  Calendar,
  TrendingUp,
  Star
} from "lucide-react";
import { getAllCompetition } from "@/lib/api/competition/competition";
import { getAllGameResults } from "@/lib/api/games/games";
import { getTeamRankingGirls, getTeamRankingBoys } from "@/lib/api/team/team";

type GameResult = {
  matchScore: {
    home: number;
    away: number;
  };
  homeTeam: {
    teamName: string;
    teamGender: string;
  };
  awayTeam: {
    teamName: string;
    teamGender: string;
  };
};

const EpicStats2024: React.FC = () => {
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalMatches: 0,
    totalTeams: 0,
    totalPlayers: 0,
    topScoreMatch: { score: 0, teams: "" },
    avgPointsPerMatch: 0,
    departments: 12,
    days: 5
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const competitions = await getAllCompetition();
        const competition2024 = competitions.find(
          (competition) =>
            new Date(competition.createdAt).getFullYear() === 2024
        );

        if (competition2024) {
          const [gamesData, boysData, girlsData] = await Promise.all([
            getAllGameResults(competition2024._id),
            getTeamRankingBoys(competition2024._id),
            getTeamRankingGirls(competition2024._id)
          ]);

          // Calcul des statistiques
          let totalPoints = 0;
          let topScore = 0;
          let topScoreTeams = "";

          gamesData.forEach((game: GameResult) => {
            const homeScore = game.matchScore?.home || 0;
            const awayScore = game.matchScore?.away || 0;
            totalPoints += homeScore + awayScore;

            const matchTotal = homeScore + awayScore;
            if (matchTotal > topScore) {
              topScore = matchTotal;
              topScoreTeams = `${game.homeTeam.teamName} vs ${game.awayTeam.teamName}`;
            }
          });

          const totalTeams = boysData.length + girlsData.length;
          const avgPointsPerMatch = gamesData.length > 0 ? Math.round(totalPoints / gamesData.length) : 0;

          setStats({
            totalPoints,
            totalMatches: gamesData.length,
            totalTeams,
            totalPlayers: totalTeams * 8, // Estimation 8 joueurs par équipe
            topScoreMatch: { score: topScore, teams: topScoreTeams },
            avgPointsPerMatch,
            departments: 12,
            days: 5
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle
  }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle: string;
  }) => (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-8 text-center">
        <Icon className="h-8 w-8 mx-auto mb-4 text-gray-600" />
        <h3 className="text-3xl font-bold mb-2 text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        <p className="text-gray-600 font-medium mb-1">
          {title}
        </p>
        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="w-full container mx-auto py-12">
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-100 rounded w-3/4 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-gray-200 rounded mx-auto mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded mb-1"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Genesis of Legends
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Here were born the future giants of Beninese basketball. On these sacred courts,
            dreams took shape and legends began to be written.
            Relive this explosion of talent that will resonate in hearts for generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={Users}
            title="Teams"
            value={24}
            subtitle="Boys & Girls U16"
          />

          <StatCard
            icon={Star}
            title="Young Talents"
            value="200+"
            subtitle="Revealed"
          />

          <StatCard
            icon={MapPin}
            title="Departments"
            value={12}
            subtitle="Represented"
          />
        </div>
      </div>


    </div>
  );
};

export default EpicStats2024;