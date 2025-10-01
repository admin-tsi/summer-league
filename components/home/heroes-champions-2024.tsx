import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import mediaday from "../../public/mediaday.jpg";

const Hero2024: React.FC = () => {
  return (
    <div className="w-full container mx-auto pt-12 flex flex-col gap-12">
      {/* Hero Banner */}
      <div className="h-[70vh] w-full relative rounded-lg overflow-hidden">
        <Image
          src={mediaday}
          alt="Summer League Champions 2024"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-end text-white p-8 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              SUMMER LEAGUE 2024
            </h1>
            <p className="text-lg md:text-xl font-light opacity-90 leading-relaxed">
              The summer that transformed Beninese basketball forever.
              A legendary competition where dreams became reality.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero2024;