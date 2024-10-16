"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.svg";
import { getAllCompetition } from "@/lib/api/competition/competition";
import { GamesResult } from "@/lib/types/games/games";
import MatchScores from "@/components/home/match-scores";
import { getAllGameResults } from "@/lib/api/games/games";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [matchResult, setMatchResult] = useState<GamesResult | null>(null);
  const pathname = usePathname();

  const navItems = [
    { name: "Schedules", path: "/schedules" },
    { name: "Teams", path: "/teams" },
    { name: "Rankings", path: "/rankings" },
  ];

  useEffect(() => {
    const fetchMatchResults = async () => {
      try {
        const competitions = await getAllCompetition();
        const currentYear = new Date().getFullYear();

        const currentYearCompetition = competitions.find(
          (competition) =>
            new Date(competition.createdAt).getFullYear() === currentYear,
        );

        if (currentYearCompetition) {
          localStorage.setItem("competitionId", currentYearCompetition._id);
          const result = await getAllGameResults(currentYearCompetition._id);
          setMatchResult(result);
        }
      } catch (error) {
        console.error("Failed to fetch match results:", error);
      }
    };

    fetchMatchResults();
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-border text-secondary py-4 px-4 md:px-8">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="w-32 h-8 md:w-40 relative">
            <Image
              src={logo}
              alt="I AM Foundation Logo"
              layout="fill"
              objectFit="contain"
            />
          </Link>

          <ul className="hidden md:flex md:space-x-8 lg:space-x-16 font-semibold">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`hover:underline ${
                    isActive(item.path) ? "underline" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2 font-semibold">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`block py-2 px-4 hover:bg-secondary hover:text-border ${
                      isActive(item.path)
                        ? "bg-secondary text-primary"
                        : "text-secondary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <MatchScores matchResult={matchResult} />
    </header>
  );
};

export default Header;
