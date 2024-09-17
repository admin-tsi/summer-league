import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { cn } from "@/lib/utils";
import React from "react";
import { Toaster } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const cabinetGroteskFont = localFont({
  variable: "--cabinet-grotesk-font",
  display: "swap",
  src: [
    {
      path: "../fonts/CabinetGrotesk-Variable.ttf",
      weight: "variable",
    },
  ],
});

const satoshiFont = localFont({
  variable: "--satoshi-font",
  display: "swap",
  src: [
    {
      path: "../fonts/Satoshi-Variable.ttf",
      weight: "variable",
    },
  ],
});

export const metadata: Metadata = {
  title: "Ian Mahinmi -  I Am Foundation",
  description:
    "Ian Mahinmi is empowering youth through basketball since 2016. Join us in fostering leadership, well-being, and professional growth for young athletes. Don't miss our Summer League in Benin, where emerging talents shine. Be a part of positive change today!",
  twitter: {
    card: "summary_large_image",
    site: "https://iamfoundation.bj",
    title: "I Am Foundation By Ian Mahinmi",
    images: {
      url: "https://firebasestorage.googleapis.com/v0/b/iam-foundation.appspot.com/o/website-banner.png?alt=media&token=50931897-bf53-44f2-aa5a-47a7dd7fe6de",
    },
  },
  openGraph: {
    title: "Iam Mahinmi -I Am Foundation",
    url: "https://iamfoundation.bj",
    description:
      "Iam Mahinmi - I Am Foundation: Empowering youth through basketball since 2016. Join us in fostering leadership, well-being, and professional growth for young athletes. Don't miss our Summer League in Benin, where emerging talents shine. Be a part of positive change today!",
    siteName: "Iam Mahinmi - I Am Foundation",
    type: "website",
    images:
      "https://firebasestorage.googleapis.com/v0/b/iam-foundation.appspot.com/o/website-banner.png?alt=media&token=50931897-bf53-44f2-aa5a-47a7dd7fe6de",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn(cabinetGroteskFont.className, satoshiFont.className)}>
        <div className="relative">
          <Header />
          {children}
          <Footer />
          <Toaster className="font-satoshi" />
        </div>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-QP9ZECX5X2" />
      </body>
    </html>
  );
}
