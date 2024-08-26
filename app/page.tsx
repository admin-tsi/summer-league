"use client";
import { getAllBlogArticles } from "@/api/blog/blog";
import { getAllCompetition } from "@/api/competition/competition";
import { getAllGameResults, getTodayGame } from "@/api/games/games";
import Hero from "@/components/home/hero";
import LatestNews from "@/components/home/latestNews";
import MatchScores from "@/components/home/match-scores";
import MatchesList from "@/components/home/todayList";
import { Articles } from "@/types/blog/blog";
import { GamesResult, Matchs } from "@/types/games/games";
import React, { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [matchResult, setMatchResult] = useState<GamesResult | null>(null);
  const [headlines, setheadlines] = useState<Articles | null>(null);
  const [todayGames, setTodayGames] = useState<Matchs | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const competitions = await getAllCompetition();
      const currentYear = new Date().getFullYear();

      const currentYearCompetition = competitions.find(
        (competition) =>
          new Date(competition.createdAt).getFullYear() === currentYear
      );

      if (currentYearCompetition) {
        localStorage.setItem("competitionId", currentYearCompetition._id);
        const result = await getAllGameResults(currentYearCompetition._id);
        const headlines = await getAllBlogArticles(currentYearCompetition._id);
        const todayGames = await getTodayGame(currentYearCompetition._id);
        setMatchResult(result);
        setheadlines(headlines);
        setTodayGames(todayGames);
      }
    };

    fetchCompetitions();

    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <MatchScores matchResult={matchResult} />
      <Hero headlines={headlines} />
      <MatchesList matches={todayGames} />
      <LatestNews />
    </div>
  );
};

export default HomePage;
