"use client";

import { useEffect, useState } from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

const Typewriter = ({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [text, setText] = useState(words[0]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let level = 1;
    const interval = setInterval(() => {
      setText(words[level++ % words.length]);
      setKey((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [words]);
  return (
    <div key={key}>
      <TypewriterEffectSmooth
        className={className}
        cursorClassName={cursorClassName}
        words={[text]}
      />
    </div>
  );
};

export default Typewriter;
