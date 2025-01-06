import Link from "next/link";
import Typewriter from "../typewriter/Typewriter";
import LoadingDefault from "../loading/loading";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { lazy, Suspense } from "react";

import image1 from "../../../public/photo-1.webp";
import image2 from "../../../public/photo-2.jpeg";
import image3 from "../../../public/photo-3.jpeg";
import image4 from "../../../public/photo-4.jpeg";

const SlideImage = lazy(
  () => import("@/components/slide-image/sliding-window")
);

const monerat = Montserrat({
  weight: ["700", "500", "300", "100"],
  subsets: ["latin"],
});

const words = [
  {
    text: "Image Generation",
    className:
      "text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold",
  },
  {
    text: "Music Generation",
    className:
      "text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold",
  },
  {
    className:
      "text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold",
    text: "Chat Bot",
  },
];

const listOfImages = [image1, image2, image3, image4];

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-8 gap-x-2 justify-between items-center">
      {/** app discription */}
      <div
        className={cn(
          monerat.className,
          "font-bold flex flex-col items-center text-center lg:block lg:text-start"
        )}
      >
        <h2 className="capitalize md:text-4xl text-2xl text-white">
          Get started with the AI.
        </h2>
        <Typewriter words={words} className="p-0 m-0" />
        <p className="max-w-[250px] text-sm text-muted-foreground font-normal my-4">
          Empower you imagination and creativity with the help of AI. Use our
          platform to create heigh quality images and music to show world you
          creativity.
        </p>
        <Link href={"/dashboard"}>
          <Button className="bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold">
            Try for Free
          </Button>
        </Link>
      </div>
      {/** animated logo */}
      <div className="sm:w-[512px] h-[420px] w-[100%]">
        <Suspense fallback={<LoadingDefault />}>
          <SlideImage list={listOfImages} />
        </Suspense>
      </div>
    </div>
  );
};

export default Hero;
