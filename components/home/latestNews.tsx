import { teams } from "@/constants/mediaDay/mediaDay";
import Image from "next/image";
import React from "react";

type Props = {};

const LatestNews = (props: Props) => {
  return (
    <div className="">
      <div className="container grid grid-cols-1 gap-6 mx-auto px-4 py-5">
        <div className="w-full grid grid-cols-1">
          <span className="text-2xl font-bold">Latest News</span>
          <span className="text-xs">Back to our media day</span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
          {teams.map((team, index) => (
            <div key={index} className="h-[60vh] bg-black relative">
              <Image
                src={team.image}
                alt={team.teamName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 h-full w-full bg-[#11111180] bg-opacity-50 text-white p-2"></div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end items-center text-sm">
          <span> IAM FOUNDATION SUMMER LEAGUE</span>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
