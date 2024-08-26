"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import MatchScores from "@/components/home/match-scores";
import { getAllCompetition } from "@/api/competition/competition";
import { getAllGameResults, getTodayGame } from "@/api/games/games";
import { GamesResult, Matchs } from "@/types/games/games";
import FeatureCardSkeleton from "@/components/skeleton/featureCardSkeleton";
import mediaday from "../public/mediaday.jpg";
import Headlines from "@/components/home/headlines";
import { Articles } from "@/types/blog/blog";
import { getAllBlogArticles } from "@/api/blog/blog";
import SocialLinks from "@/components/home/socialLinks";
import MacthOfTheDay from "@/components/home/matchOfTheDay";
import LoopingVideo from "@/components/home/loopingVideo";
import Hero from "@/components/home/hero";
import MatchesList from "@/components/home/todayList";
import LatestNews from "@/components/home/latestNews";

const figmaImageUrl =
  "https://s3-alpha-sig.figma.com/img/3945/62bd/832db2e7b7823ce3f4c4110714e1b220?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ftC8xnewSf0DcsFgp~86I9pLl-YNXtyW0sjcxTV2Lpo~1wuvPCwPtiIC1C7IkHfvHK-9DawjkZSwyffSFR10u4V~5I53x9I9UE9saa5FzvFkigzRnO9aashq2XzdSi8ABODZ3effiLBGvByL~IsUbGN4aUoO8Msp-Cw7CMoBpbKDBPhW2rF9l0qCN2zywkbOwD5mAzg7uHLOdCjcvUf9uqDn5ZTLUSLWcNSost~uCudnuhlZBzuJSE6KxUpgUIX8t34-wCkoXZbGkTyeDUHLOSQOu4~8d4wfR1s3QjshnH1wcyBQ8t9NVVF8vjgATwHWkoRzRUKlrjtWaUhWI3padA__";

const QuickLinks: React.FC = () => (
  <Card className="bg-card text-card-foreground">
    <CardHeader>
      <CardTitle>Quick Links</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <li key={i} className="text-sm">
            Lorem ipsum dolor sit amet
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const StorySkeleton: React.FC = () => (
  <Card>
    <CardContent className="p-0">
      <Skeleton className="w-full h-40" />
      <div className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </CardContent>
  </Card>
);

const ArticleSkeleton: React.FC = () => (
  <Card>
    <CardContent className="flex items-center space-x-4">
      <Skeleton className="w-20 h-20" />
      <div className="flex-1">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </CardContent>
  </Card>
);

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
        console.log(todayGames);

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
      <Hero />
      <MatchesList matches={todayGames} />
      <LoopingVideo />
      <LatestNews />
    </div>
  );
};

export default HomePage;
