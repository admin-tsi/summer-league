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
    <div className="min-h-screen bg-background">
      {/* Hero Image Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={article.featuredImage || DEFAULT_IMAGE_URL}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Navigation overlay */}
        <div className="absolute top-8 left-8">
          <Button
            onClick={handleGoBack}
            className="bg-white/90 hover:bg-white text-gray-900 border border-white shadow-lg backdrop-blur-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {article.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Meta */}
        <motion.div
          className="flex items-center gap-6 pb-8 mb-8 border-b border-border"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">
                {article.author
                  ? `${article.author.firstName[0]}${article.author.lastName[0]}`
                  : "ET"
                }
              </span>
            </div>
            <div>
              <div className="font-semibold text-foreground">
                {article.author
                  ? `${article.author.firstName} ${article.author.lastName}`
                  : "Équipe éditoriale"}
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <span>•</span>
            <span>{article.category}</span>
            <span>•</span>
            <span>{Math.ceil(article.content.split(" ").length / 200)} min de lecture</span>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          className="prose prose-lg prose-gray max-w-none dark:prose-invert"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {article.content.includes('<p>') ? (
            // Si l'article contient déjà des balises HTML
            <div
              className="space-y-6 [&>p]:text-lg [&>p]:leading-relaxed [&>p]:text-foreground [&>p]:mb-6"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/<p><\/p>/g, '') // Supprime les paragraphes vides
                  .replace(/<p>/g, '<p class="text-lg leading-relaxed text-foreground mb-6">')
              }}
            />
          ) : (
            // Si c'est du texte brut, on split sur \n\n
            <div className="space-y-6">
              {article.content
                .split('\n\n')
                .filter(paragraph => paragraph.trim())
                .map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-foreground">
                    {paragraph.trim()}
                  </p>
                ))}
            </div>
          )}
        </motion.article>

        {/* Image Gallery */}
        {article.imagesGallery && article.imagesGallery.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Galerie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {article.imagesGallery.map((image: string, index: number) => (
                <div key={index} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to articles */}
        <motion.div
          className="mt-16 pt-8 border-t border-border text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={() => router.push('/articles')}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Voir tous les articles
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
