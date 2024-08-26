import React from "react";

const LoopingVideo = () => {
  return (
    <div className="w-full">
      <video
        src="/intro.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full"
      />
    </div>
  );
};

export default LoopingVideo;
