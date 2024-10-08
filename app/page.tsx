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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitions = await getAllCompetition();
        const currentYear = new Date().getFullYear();

        const currentYearCompetition = competitions.find(
          (competition) =>
            new Date(competition.createdAt).getFullYear() === currentYear,
        );

        if (currentYearCompetition) {
          localStorage.setItem("competitionId", currentYearCompetition._id);
          const headlines = await getAllBlogArticles(
            currentYearCompetition._id,
          );
          const todayGames = await getTodayGame(currentYearCompetition._id);
          setHeadlines(headlines);
          setTodayGames(todayGames);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Hero headlines={headlines} />
      <MatchesList matches={todayGames} />
      <LatestNews />
      <FeaturedArticles articles={headlines} loading={loading} />
    </div>
  );
};

export default HomePage;
