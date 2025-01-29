"use client";
import { getAllBlogArticles } from "@/lib/api/blog/blog";
import { getAllCompetition } from "@/lib/api/competition/competition";
import Hero from "@/components/home/hero";
import LatestNews from "@/components/home/latest-news";
import MatchesList from "@/components/home/today-list";
import { Articles } from "@/lib/types/blog/blog";
import React, { useEffect, useState } from "react";
import { Matchs } from "@/lib/types/games/games";
import { getTodayGame } from "@/lib/api/games/games";
import FeaturedArticles from "@/components/home/featured-articles";

const HomePage: React.FC = () => {
  const [headlines, setHeadlines] = useState<Articles | null>(null);
  const [todayGames, setTodayGames] = useState<Matchs | null>(null);
  const [isLoadingHeadlines, setIsLoadingHeadlines] = useState(true);
  const [isLoadingGames, setIsLoadingGames] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitions = await getAllCompetition();
        console.log(competitions);
        const currentYearCompetition = competitions[0];
        /*     const currentYear = new Date().getFullYear();
        const currentYearCompetition = competitions.find(
          (competition) =>
            new Date(competition.createdAt).getFullYear() === currentYear,
        );*/
        if (currentYearCompetition) {
          localStorage.setItem("competitionId", currentYearCompetition._id);
          setIsLoadingHeadlines(true);
          const headlinesData = await getAllBlogArticles(
            currentYearCompetition._id,
          );
          setHeadlines(headlinesData);
          setIsLoadingHeadlines(false);
          setIsLoadingGames(true);
          const todayGamesData = await getTodayGame(currentYearCompetition._id);
          setTodayGames(todayGamesData);
          setIsLoadingGames(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoadingHeadlines(false);
        setIsLoadingGames(false);
      }
    };
    fetchCompetitions();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Hero headlines={headlines} isLoading={isLoadingHeadlines} />
      <MatchesList matches={todayGames} />
      <LatestNews />
      <FeaturedArticles articles={headlines} loading={isLoadingHeadlines} />
    </div>
  );
};

export default HomePage;
