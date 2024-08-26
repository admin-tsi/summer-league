import Image from "next/image";
import React from "react";
import mediaday from "../../public/mediaday.jpg";

type Props = {};

function Hero({}: Props) {
  return (
    <div className="h-screen w-full relative">
      <Image
        src={mediaday}
        alt="Basketball"
        fill
        className="object-cover brightness-50"
      />
      <div className="absolute inset-0 container mx-auto flex flex-col items-start justify-end text-white py-20 md:py-36">
        <h1 className="text-3xl md:text-6xl font-bold md:w-2/3">
          LAUNCH OF THE SUMMER LEAGUE BY THE I AM FOUNDATION
        </h1>
        <p className="mt-4 text-lg md:hidden">
          Get ready to witness young talents showcase their skills and passion
          for basketball this summer.
        </p>
        <p className="mt-4 text-lg md:w-2/3 hidden md:block">
          This League is more than just a competition it&apos;s a celebration of
          dedication, teamwork, and the relentless pursuit of excellence. Over
          the coming weeks, young athletes from across the region will come
          together to challenge themselves, push their limits, and grow both on
          and off the court.
        </p>
      </div>
    </div>
  );
}

export default Hero;
