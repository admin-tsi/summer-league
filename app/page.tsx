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

const figmaImageUrl =
  "https://s3-alpha-sig.figma.com/img/3945/62bd/832db2e7b7823ce3f4c4110714e1b220?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ftC8xnewSf0DcsFgp~86I9pLl-YNXtyW0sjcxTV2Lpo~1wuvPCwPtiIC1C7IkHfvHK-9DawjkZSwyffSFR10u4V~5I53x9I9UE9saa5FzvFkigzRnO9aashq2XzdSi8ABODZ3effiLBGvByL~IsUbGN4aUoO8Msp-Cw7CMoBpbKDBPhW2rF9l0qCN2zywkbOwD5mAzg7uHLOdCjcvUf9uqDn5ZTLUSLWcNSost~uCudnuhlZBzuJSE6KxUpgUIX8t34-wCkoXZbGkTyeDUHLOSQOu4~8d4wfR1s3QjshnH1wcyBQ8t9NVVF8vjgATwHWkoRzRUKlrjtWaUhWI3padA__";

const Headlines: React.FC = () => (
  <Card className="bg-card text-card-foreground">
    <CardHeader>
      <CardTitle>Headlines</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <li key={i} className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const SocialLinks: React.FC = () => (
  <Card className="bg-card text-card-foreground">
    <CardHeader>
      <CardTitle>Follow the Summer League</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-around">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-10 h-10 bg-border rounded-full"></div>
      ))}
    </CardContent>
  </Card>
);

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

const FeatureCardSkeleton: React.FC = () => (
  <Card className="lg:col-span-2 bg-border text-secondary">
    <CardContent className="p-0 relative">
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 md:p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-10 w-32" />
      </div>
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <MatchScores />

      <main className="container mx-auto px-4 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {isLoading ? (
            <>
              <FeatureCardSkeleton />
              <div className="space-y-8">
                <Skeleton className="h-[200px]" />
                <Skeleton className="h-[150px]" />
                <Skeleton className="h-[200px]" />
              </div>
            </>
          ) : (
            <>
              <Card className="lg:col-span-2 bg-border text-secondary">
                <CardContent className="p-0 relative">
                  <div className="relative w-full h-full md:h-[400px]">
                    <Image
                      src={figmaImageUrl}
                      alt="Basketball"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      Launch of the Summer League by the I AM Foundation
                    </h2>
                    <p className="mb-4 text-sm md:text-base">
                      I AM FOUNDATION SUMMER League: I AM FOUNDATION launches
                      its first season for U16 youngsters
                    </p>
                    <Button>Read More</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Headlines />
                <SocialLinks />
                <QuickLinks />
              </div>
            </>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading
              ? [...Array(4)].map((_, i) => <StorySkeleton key={i} />)
              : [...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-0">
                      <Image
                        src={figmaImageUrl}
                        alt={`Story ${i + 1}`}
                        className="w-full h-40 object-cover"
                        width={300}
                        height={200}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Story Title</h3>
                        <p className="text-sm">
                          Brief description of the story...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">Around the Summer League</h2>
          <div className="space-y-4">
            {isLoading
              ? [...Array(7)].map((_, i) => <ArticleSkeleton key={i} />)
              : [...Array(7)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="flex items-center space-x-4">
                      <Image
                        src={figmaImageUrl}
                        alt={`Article ${i + 1}`}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">Article Title</h3>
                        <p className="text-sm">
                          Brief description of the article...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
