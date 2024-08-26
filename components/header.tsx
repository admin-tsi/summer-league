"use client";
import React, { useState } from "react";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Image from "next/image";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    "Games",
    "Schedules",
    "News",
    "Stats",
    "Teams",
    "Players",
    "Store",
  ];

  return (
    <header className="bg-border text-secondary py-4 px-4 md:px-8">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="w-32 h-8 md:w-40 relative">
          <Image
            src={logo}
            alt="I AM Foundation Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <ul className="hidden md:flex md:space-x-8 lg:space-x-16 font-semibold">
          {navItems.map((item) => (
            <li key={item}>
              <Link href={`/${item.toLowerCase()}`} className="hover:underline">
                {item}
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
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="block py-2 px-4 hover:bg-secondary hover:text-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
