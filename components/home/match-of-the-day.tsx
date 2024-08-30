import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Matchs } from "@/lib/types/games/games";

type MatchOfTheDayProps = {
  matches: Matchs | null;
};

const MatchOfTheDay: FC<MatchOfTheDayProps> = ({ matches }) => (
  <Card className="bg-card text-card-foreground">
    <CardHeader>
      <CardTitle>Match of today</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      {matches?.slice(0, 3).map((match) => (
        <div key={match._id} className="flex justify-between w-full">
          <div className="w-full flex justify-between items-center">
            <div className="text-sm font-semibold w-1/2 flex justify-between items-center">
              <span>
                {match.homeTeam.teamName} VS {match.awayTeam.teamName}
              </span>
              <span></span>
            </div>
            <div className="text-sm font-semibold w-1/2 flex flex-col justify-between items-end">
              <span>{match.stadiumLocation}</span>
              <span>
                {match.startTime} - {match.endTime}
              </span>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default MatchOfTheDay;
