"use client";
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { getTeamRankingBoys, getTeamRankingGirls } from "@/lib/api/team/team";
import { TeamRanking } from "@/lib/types/ranking/ranking";

const RankingPage: React.FC = () => {
  const [rankings, setRankings] = useState<TeamRanking[]>([]);
  const [isGirls, setIsGirls] = useState(true);
  const [loading, setLoading] = useState(true);
  const competitionId = "66cbbc31b450ee0e0b089f88";

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const data = isGirls
          ? await getTeamRankingGirls(competitionId)
          : await getTeamRankingBoys(competitionId);
        setRankings(data);
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [isGirls, competitionId]);

  const sortedRankings = [...rankings].sort(
    (a, b) => b.stats.wins - b.stats.losses - (a.stats.wins - a.stats.losses),
  );

  const getBackgroundColor = (index: number) => {
    if (index === 0) return "bg-primary-yellow";
    if (index === 1) return "bg-destructive/80";
    if (index === 2) return "bg-primary";
    return "bg-primary-green/80";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6"
      >
        Summer League Rankings
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center space-x-2 justify-center mb-8"
      >
        <Label htmlFor="gender-toggle" className="text-sm sm:text-base">
          Boys
        </Label>
        <Switch
          id="gender-toggle"
          checked={isGirls}
          onCheckedChange={setIsGirls}
        />
        <Label htmlFor="gender-toggle" className="text-sm sm:text-base">
          Girls
        </Label>
      </motion.div>

      <div className="space-y-4">
        {loading ? (
          <>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-16 w-full rounded" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <AnimatePresence>
            {sortedRankings.map((team, index) => (
              <motion.div
                key={team.teamId._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0 w-10 h-10 text-primary rounded-full flex items-center justify-center font-black text-lg">
                  #{index + 1}
                </div>
                <div
                  className={`flex-1 ${getBackgroundColor(index)} text-primary-green-foreground p-4 sm:p-6 relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-bold uppercase text-lg sm:text-xl mb-2 sm:mb-0">
                        {team.teamId.teamName}
                      </span>
                      <div className="flex space-x-6 text-base sm:text-lg">
                        <span>Wins: {team.stats.wins}</span>
                        <span>Losses: {team.stats.losses}</span>
                      </div>
                    </div>
                  </div>
                  <div className="noise-container absolute inset-0">
                    <div className="noise-inner"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default RankingPage;
