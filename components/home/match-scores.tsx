import MatchCardSkeleton from "@/components/skeleton/matchCardSkeleton";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GamesResult } from "@/types/games/games";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import TeamScore from "./TeamScore";

interface MatchScoresProps {
  matchResult: GamesResult | null;
}

const MatchScores: React.FC<MatchScoresProps> = ({ matchResult }) => {
  const [hideScores, setHideScores] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const isLoading = !matchResult;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const scheduleDates = useMemo(() => {
    if (!matchResult) return [];
    const dates = Array.from(
      new Set(matchResult.map((match) => formatDate(match.scheduleId.date)))
    );
    return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [matchResult]);

  const recentMatches = useMemo(() => {
    if (!matchResult) return [];
    let filteredMatches = matchResult;
    if (selectedDate) {
      filteredMatches = matchResult.filter(
        (match) => formatDate(match.scheduleId.date) === selectedDate
      );
    }
    return filteredMatches
      .sort(
        (a, b) =>
          new Date(b.scheduleId.date).getTime() -
          new Date(a.scheduleId.date).getTime()
      )
      .slice(0, 3);
  }, [matchResult, selectedDate]);

  return (
    <div className="border-t border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col space-y-2 w-full lg:w-auto">
            <Select
              value={selectedDate || undefined}
              onValueChange={(value) => setSelectedDate(value)}
            >
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                {scheduleDates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {formatDisplayDate(date)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="hidden md:flex items-center space-x-2">
              <Switch
                id="hide-scores"
                checked={hideScores}
                onCheckedChange={setHideScores}
              />
              <Label htmlFor="hide-scores">Hide Scores</Label>
            </div>
          </div>
          <div className="w-full lg:flex-grow lg:mx-4 overflow-x-auto">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {isLoading ? (
                Array(3)
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
                        {formatDisplayDate(match.scheduleId.date)}
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
          <Link
            href="#"
            className="text-red-600 font-semibold text-sm whitespace-nowrap lg:ml-4"
          >
            SEE ALL GAMES
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MatchScores;
