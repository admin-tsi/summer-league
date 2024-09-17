import React, { useEffect } from "react";
import { TeamRanking } from "@/lib/types/ranking/ranking";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export const WinnerTeam: React.FC<{ team: TeamRanking }> = ({ team }) => {
  useEffect(() => {
    triggerConfetti();
  }, []);

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#d4af37", "#cba135", "#f5c242", "#e2b13c"];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <motion.div
      className="flex items-center space-x-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex-shrink-0 w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center cursor-pointer"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={triggerConfetti}
      >
        <span className="text-xl">🏆</span>
      </motion.div>
      <motion.div
        className="flex-1 bg-primary-yellow text-primary-green-foreground p-4 sm:p-6 relative overflow-hidden"
        animate={{
          boxShadow: [
            "0 0 0 rgba(255, 215, 0, 0)",
            "0 0 20px rgba(255, 215, 0, 0.7)",
            "0 0 0 rgba(255, 215, 0, 0)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
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
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(45deg, transparent, #ffffff, transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};
