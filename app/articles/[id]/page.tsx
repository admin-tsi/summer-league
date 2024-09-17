"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getBlogArticleById } from "@/lib/api/blog/blog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TiptapParser from "tiptap-parser";

const DEFAULT_IMAGE_URL =
  "https://live.staticflickr.com/65535/53962232697_58e31dfac0_h.jpg";

export default function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getBlogArticleById(params.id);
        console.log(fetchedArticle);
        setArticle(fetchedArticle);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="w-full h-[400px] mb-8 rounded-lg" />
        <Skeleton className="w-3/4 h-10 mb-4" />
        <Skeleton className="w-1/2 h-6 mb-8" />
        <Skeleton className="w-full h-40 mb-4" />
        <Skeleton className="w-full h-40 mb-4" />
        <Skeleton className="w-full h-40" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Button
          onClick={handleGoBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>
      </motion.div>

      <Card className="overflow-hidden mb-8">
        <motion.div
          className="w-full h-[400px] relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={article.featuredImage || DEFAULT_IMAGE_URL}
            alt={article.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <CardContent className="p-6">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {article.title}
          </motion.h1>
          <motion.div
            className="text-gray-600 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>
              By{" "}
              {article.author
                ? `${article.author.firstName} ${article.author.lastName}`
                : "Unknown Author"}
              • {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div
        className="prose max-w-none mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <TiptapParser content={article.content} />
      </motion.div>

      {article.imagesGallery && article.imagesGallery.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {article.imagesGallery.map((image: string, index: number) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
