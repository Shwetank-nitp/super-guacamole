"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SlideImage = ({ list }: { list: StaticImageData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (list.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [list, loading]);

  return (
    <div className="w-full h-full overflow-hidden relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="w-full h-full flex items-center justify-center absolute"
        >
          {loading && (
            <div className="w-full h-full animate-pulse bg-slate-600"></div>
          )}
          <Image
            style={{
              width:
                list[currentIndex].width > list[currentIndex].height
                  ? "100%"
                  : "auto",
              height:
                list[currentIndex].width > list[currentIndex].height
                  ? "auto"
                  : "100%",
            }}
            src={list[currentIndex]}
            alt="image"
            className="rounded-lg object-contain"
            loading="lazy"
            onLoadingComplete={() => setLoading(false)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SlideImage;
