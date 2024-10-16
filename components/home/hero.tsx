import Image from "next/image";
import React from "react";
import mediaday from "../../public/mediaday.jpg";
import SocialLinks from "./social-links";
import Headlines from "./headlines";
import { Articles } from "@/lib/types/blog/blog";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  headlines: Articles | null;
  isLoading: boolean;
};

function Hero({ headlines, isLoading }: Props) {
  return (
    <div className="w-full container mx-auto pt-12 flex flex-col md:flex-row gap-2">
      <div className="h-[70vh] w-full md:w-2/3 relative rounded-md">
        <Image
          src={mediaday}
          alt="Basketball"
          fill
          className="object-cover brightness-50 rounded-md"
        />
        <div className="absolute inset-0 container mx-auto flex flex-col items-start justify-end text-white py-10 md:py-16 gap-2">
          <h1 className="text-2xl md:text-4xl font-bold w-full md:w-2/3">
            LAUNCH OF THE SUMMER LEAGUE BY THE I AM FOUNDATION
          </h1>
          <p className="w-full md:w-1/2 text-lg">
            Get ready to witness young talents showcase their skills and passion
            for basketball this summer.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/3 h-fit md:h-[70vh] flex flex-col gap-3">
        <SocialLinks />
        {isLoading ? (
          <Skeleton className="w-full h-[calc(70vh-40px)] rounded-md" />
        ) : (
          <Headlines headlines={headlines} />
        )}
      </div>
    </div>
  );
}

export default Hero;
