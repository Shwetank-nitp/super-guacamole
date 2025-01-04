"use client";

import * as React from "react";

function CircularProgress({
  progress,
  bgColor = "text-slate-400",
  color = "text-blue-600",
}: {
  progress: number;
  color?: string;
  bgColor?: string;
}) {
  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className={bgColor}
          strokeWidth="2"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={color}
          strokeWidth="2"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: `${2 * Math.PI * 45}`,
            strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`,
            transition: "stroke-dashoffset 0.5s ease 0s",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

export default CircularProgress;
