import React from "react";

const LoopingVideo = () => {
  return (
    <video
      src="/intro.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full"
    />
  );
};

export default LoopingVideo;
