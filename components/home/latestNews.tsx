import Image from "next/image";
import img from "../../public/3.jpg";
import LoopingVideo from "./loopingVideo";
type Props = {};

const LatestNews = (props: Props) => {
  return (
    <div className="w-full container mx-auto py-6 h-fit grid grid-cols-1 gap-4">
      <div className="w-full grid grid-cols-1">
        <span className="text-2xl font-bold">Trending Now</span>
        <span className="text-xs">View all trends</span>
      </div>
      <div className="w-full">
        <LoopingVideo />
      </div>
    </div>
  );
};

export default LatestNews;
