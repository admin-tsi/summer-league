"use client";
import React from "react";
import HeroChampions2024 from "@/components/home/heroes-champions-2024";
import ChampionsPodium from "@/components/home/champions-podium";
import EpicStats2024 from "@/components/home/epic-stats-2024";
import SeasonHighlights from "@/components/home/season-highlights";

const Champions2024Page: React.FC = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section with Champions */}
      <HeroChampions2024 />

      {/* Champions Podium */}
      <ChampionsPodium />

      {/* Epic Statistics */}
      <EpicStats2024 />

      {/* Season Highlights & Articles */}
      <SeasonHighlights />
    </div>
  );
};

export default Champions2024Page;