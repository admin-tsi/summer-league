import React, { useState, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { GamesResult } from "@/types/games/games";
import MatchCardSkeleton from "@/components/skeleton/matchCardSkeleton";
import TeamScore from "./TeamScore";

interface MatchScoresProps {
  matchResult: GamesResult | null;
}

const MatchScores: React.FC<MatchScoresProps> = ({ matchResult }) => {
  const [hideScores, setHideScores] = useState(false);
  const isLoading = !matchResult;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const recentMatches = useMemo(() => {
    if (!matchResult) return [];
    return matchResult
      .sort(
        (a, b) =>
          new Date(b.scheduleId.date).getTime() -
          new Date(a.scheduleId.date).getTime()
      )
      .slice(0, 6);
  }, [matchResult]);

  return (
    <div className="">
      <div className="container grid grid-cols-1 gap-6 mx-auto px-4 py-10">
        <div className="w-full grid grid-cols-1">
          <span className="text-2xl font-bold">Schedule Score</span>
          <span className="text-xs">See All Schedule Score </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="w-full lg:flex-grow lg:mx-4 overflow-x-auto">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {isLoading ? (
                Array(6)
                  .fill(0)
                  .map((_, index) => <MatchCardSkeleton key={index} />)
              ) : recentMatches.length > 0 ? (
                recentMatches.map((match, index) => (
                  <div key={index} className="">
                    <CardContent className="p-2 h-full w-full flex flex-col justify-between text-xs">
                      <div>
                        <TeamScore
                          team={match.homeTeam}
                          score={match.matchScore.home}
                          hideScores={hideScores}
                        />
                        <TeamScore
                          team={match.awayTeam}
                          score={match.matchScore.away}
                          hideScores={hideScores}
                        />
                      </div>
                      <div className="text-[10px] text-gray-600">
                        {match.matchType}, {match.homeTeam.teamGender}{" "}
                        {formatDate(match.scheduleId.date)}
                      </div>
                    </CardContent>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-4 text-gray-500">
                  No matches available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScores;
