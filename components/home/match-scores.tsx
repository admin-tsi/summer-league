import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const MatchScores: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [hideScores, setHideScores] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMatches([
        {
          team1: "TEAM1",
          score1: 100,
          team2: "TEAM1",
          score2: 100,
          gameInfo: "GAME 2: MIN LEADS 2 - 0",
        },
        {
          team1: "TEAM1",
          score1: 100,
          team2: "TEAM1",
          score2: 100,
          gameInfo: "GAME 2: MIN LEADS 2 - 0",
        },
        {
          team1: "TEAM1",
          score1: 100,
          team2: "TEAM1",
          score2: 100,
          gameInfo: "GAME 2: MIN LEADS 2 - 0",
        },
        {
          team1: "TEAM1",
          score1: 100,
          team2: "TEAM1",
          score2: 100,
          gameInfo: "GAME 2: MIN LEADS 2 - 0",
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const MatchCardSkeleton = () => (
    <Card className="rounded-none border-l first:border-l-0 flex-1 min-w-[150px]">
      <CardContent className="p-2 h-full flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  );

  return (
    <div className="border-t border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col space-y-2 w-full lg:w-auto">
            <Select defaultValue="sun-apr-21">
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sun-apr-21">Sun, Apr 21</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch
                id="hide-scores"
                checked={hideScores}
                onCheckedChange={setHideScores}
              />
              <Label htmlFor="hide-scores">Hide Scores</Label>
            </div>
          </div>
          <div className="w-full lg:flex-grow lg:mx-4 overflow-x-auto">
            <div className="flex min-w-full lg:w-full lg:max-w-3xl rounded-md overflow-hidden">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => <MatchCardSkeleton key={index} />)
                : matches.map((match, index) => (
                    <Card
                      key={index}
                      className="rounded-none border-none flex-1 min-w-[150px]"
                    >
                      <CardContent className="p-2 h-full flex flex-col justify-between text-xs">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                              <span>{match.team1}</span>
                            </div>
                            {!hideScores && (
                              <span className="font-bold">{match.score1}</span>
                            )}
                          </div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                              <span>{match.team2}</span>
                            </div>
                            {!hideScores && (
                              <span className="font-bold">{match.score2}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-600">
                          {match.gameInfo}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
