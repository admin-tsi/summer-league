"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Trophy,
  Flame,
  Star,
  ExternalLink,
  Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllCompetition } from "@/lib/api/competition/competition";
import { getAllBlogArticles } from "@/lib/api/blog/blog";

type Article = {
  _id: string;
  title: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
  } | null;
  category: string;
  status: string;
  featuredImage: string;
  createdAt: string;
  excerpt: string;
};

const SeasonHighlights: React.FC = () => {
  const [highlights, setHighlights] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const competitions = await getAllCompetition();
        const competition2024 = competitions.find(
          (competition) =>
            new Date(competition.createdAt).getFullYear() === 2024
        );

        if (competition2024) {
          const articles = await getAllBlogArticles(competition2024._id);
          const publishedArticles = articles
            .filter((article: Article) => article.status === "published")
            .slice(0, 3);
          setHighlights(publishedArticles);
        }
      } catch (error) {
        console.error("Error fetching highlights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    return Math.ceil(words / wordsPerMinute);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "news":
        return <Flame className="h-4 w-4" />;
      case "opinion":
        return <Star className="h-4 w-4" />;
      case "review":
        return <Trophy className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "news":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "opinion":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "review":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="w-full container mx-auto py-12">
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-100 rounded w-3/4 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-100 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full container mx-auto py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Season Highlights
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          To conclude this epic, dive behind the scenes of the competition.
          Our journalists tell you about the moments that made Benin vibrate.
        </p>
      </div>

      {highlights.length > 0 && (
        <>
          {/* Tous les articles sur la même ligne */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((article) => (
              <div
                key={article._id}
                className="group relative bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-gray-300"
              >
                {/* Image avec overlay gradient */}
                {article.featuredImage && (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Badge flottant */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/90 text-foreground border-0 backdrop-blur-sm">
                        {getCategoryIcon(article.category)}
                        <span className="ml-1">{article.category}</span>
                      </Badge>
                    </div>

                    {/* Reading time */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {getReadingTime(article.content)} min
                      </div>
                    </div>
                  </div>
                )}

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-muted-foreground transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {article.content.replace(/<[^>]*>/g, "").slice(0, 120)}...
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {article.author
                            ? `${article.author.firstName} ${article.author.lastName}`
                            : "Équipe éditoriale"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(article.createdAt)}
                        </div>
                      </div>
                    </div>

                    <Link href={`/articles/${article._id}`}>
                      <Button
                        size="sm"
                        className="bg-gray-900 hover:bg-gray-800 text-white shadow-none group-hover:shadow-md transition-shadow"
                      >
                        Read
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <Link href="/articles">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                View All Articles
                <ExternalLink className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </>
      )}

      {highlights.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No articles available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default SeasonHighlights;