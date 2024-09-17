"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllBlogArticles } from "@/lib/api/blog/blog";
import { Articles } from "@/lib/types/blog/blog";
import FeaturedArticles from "@/components/home/featured-articles";

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Articles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const competitionId = localStorage.getItem("competitionId");
      if (competitionId) {
        const fetchedArticles = await getAllBlogArticles(competitionId);
        setArticles(fetchedArticles);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Articles
      </motion.h1>
      <FeaturedArticles
        articles={articles}
        loading={isLoading}
        showAll={true}
      />
    </div>
  );
};

export default ArticlesPage;
