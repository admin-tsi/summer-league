"use client";
import { getAllBlogArticles } from "@/lib/api/blog/blog";
import { getAllCompetition } from "@/lib/api/competition/competition";
// Version originale (gardée pour rollback)
import Hero from "@/components/home/hero";
import LatestNews from "@/components/home/latest-news";
import MatchesList from "@/components/home/today-list";
import FeaturedArticles from "@/components/home/featured-articles";
// Nouvelle version Champions 2024
import Hero2024 from "@/components/home/heroes-champions-2024";
import EpicStats2024 from "@/components/home/epic-stats-2024";
import ChampionsReveal2024 from "@/components/home/champions-reveal-2024";
import ChampionsPodium from "@/components/home/champions-podium";
import SeasonHighlights from "@/components/home/season-highlights";
import { Articles } from "@/lib/types/blog/blog";
import React, { useEffect, useState } from "react";
import { Matchs } from "@/lib/types/games/games";
import { getTodayGame } from "@/lib/api/games/games";

const HomePage: React.FC = () => {
  const [headlines, setHeadlines] = useState<Articles | null>(null);
  const [todayGames, setTodayGames] = useState<Matchs | null>(null);
  const [isLoadingHeadlines, setIsLoadingHeadlines] = useState(true);
  const [isLoadingGames, setIsLoadingGames] = useState(true);

  // Flag pour choisir la version (true = nouvelle, false = originale)
  const [useChampions2024, setUseChampions2024] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitions = await getAllCompetition();
        // Force utilisation de la compétition 2024 (saison terminée)
        const competition2024 = competitions.find(
          (competition) =>
            new Date(competition.createdAt).getFullYear() === 2024
        );
        if (competition2024) {
          localStorage.setItem("competitionId", competition2024._id);
          setIsLoadingHeadlines(true);
          const headlinesData = await getAllBlogArticles(
            competition2024._id
          );
          setHeadlines(headlinesData);
          setIsLoadingHeadlines(false);
          setIsLoadingGames(true);
          const todayGamesData = await getTodayGame(competition2024._id);
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

  // Version Champions 2024
  if (useChampions2024) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Hero2024 />
        <EpicStats2024 />
        <ChampionsReveal2024 />
        <ChampionsPodium />
        <SeasonHighlights />
        {/* Bouton de rollback en développement - MASQUÉ */}
        {/* <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setUseChampions2024(false)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
          >
            Version Originale
          </button>
        </div> */}
      </div>
    );
  }

  // Version originale (rollback)
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Hero headlines={headlines} isLoading={isLoadingHeadlines} />
      <MatchesList matches={todayGames} />
      <LatestNews />
      <FeaturedArticles articles={headlines} loading={isLoadingHeadlines} />
      {/* Bouton pour revenir à la nouvelle version */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setUseChampions2024(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700"
        >
          Version Champions 2024
        </button>
      </div>
    </div>
  );
};

export default HomePage;
