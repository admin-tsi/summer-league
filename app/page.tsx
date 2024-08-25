"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <div key={i} className="w-10 h-10 bg-primary rounded-full"></div>
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

const HomePage: React.FC = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="bg-primary text-primary-foreground p-4">
        <nav className="flex justify-between items-center">
          <img src="/logo.svg" alt="I AM Foundation" className="h-8" />
          <ul className="flex space-x-4">
            {[
              "Games",
              "Schedules",
              "News",
              "Stats",
              "Teams",
              "Players",
              "Store",
            ].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-8"
        >
          <Card className="col-span-2 bg-primary text-primary-foreground">
            <CardContent className="p-0 relative">
              <img
                src="/basketball.jpg"
                alt="Basketball"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-6">
                <h2 className="text-2xl font-bold mb-2">
                  Launch of the Summer League by the I AM Foundation
                </h2>
                <p className="mb-4">
                  I AM FOUNDATION SUMMER League: I AM FOUNDATION launches its
                  first season for U16 youngsters
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
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">Stories</h2>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <img
                    src={`/story-${i + 1}.jpg`}
                    alt={`Story ${i + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Story Title</h3>
                    <p className="text-sm">Brief description of the story...</p>
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
            {[...Array(7)].map((_, i) => (
              <Card key={i}>
                <CardContent className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-secondary"></div>
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

      <footer className="bg-secondary text-secondary-foreground p-8 mt-8">
        <div className="container mx-auto grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-2">Summer League Organization</h3>
            <ul className="text-sm space-y-1">
              <li>Summer League Trust</li>
              <li>Summer League Officials</li>
              <li>Summer League Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">I AM Foundation Initiatives</h3>
            <ul className="text-sm space-y-1">
              <li>I AM Foundation</li>
              <li>I AM Foundation Youth Camp</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Shop</h3>
            <ul className="text-sm space-y-1">
              <li>Summer League Shop</li>
              <li>Summer League Auctions</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-muted-foreground flex justify-between items-center">
          <p>&copy; 2024 I Am Foundation. All rights reserved.</p>
          <div className="flex space-x-4">
            {["facebook", "instagram", "youtube", "twitch"].map((social) => (
              <Link
                key={social}
                href={`https://${social}.com`}
                className="text-2xl"
              >
                {/* Replace with actual icons */}
                <span>{social[0].toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
