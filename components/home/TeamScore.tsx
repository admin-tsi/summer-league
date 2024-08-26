import { Team } from "@/types/games/games";
import React from "react";

interface TeamScoreProps {
  team: Team;
  score: number;
  hideScores: boolean;
}

const TeamScore: React.FC<TeamScoreProps> = ({ team, score, hideScores }) => (
  <div className="w-full flex justify-between items-center mb-1">
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
      <span>{team.teamName}</span>
    </div>
    {!hideScores && <span className="font-bold">{score}</span>}
  </div>
);

export default TeamScore;
