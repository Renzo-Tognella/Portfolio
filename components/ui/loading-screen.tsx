"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const interval = 50;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const value = Math.min(Math.round(eased * 100), 100);
      setCount(value);

      if (value >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 500);
        }, 100);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      style={{
        transition: "clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        clipPath: isExiting
          ? "inset(50% 50% 50% 50%)"
          : "inset(0 0 0 0)",
      }}
    >
      {/* Counter — responsive sizing */}
      <div className="relative">
        <span
          className="font-mono text-[60px] font-light tracking-tight text-white tabular-nums sm:text-[80px] md:text-[120px]"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {count}
        </span>
        <span className="absolute -right-5 top-3 font-mono text-lg text-[#dc2626] sm:-right-7 sm:top-5 sm:text-xl md:-right-8 md:top-8 md:text-2xl">
          %
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-px w-[140px] bg-[#222] sm:mt-8 sm:w-[200px]">
        <div
          className="h-full bg-[#dc2626] transition-all duration-75"
          style={{ width: count + "%" }}
        />
      </div>

      {/* Subtitle */}
      <p
        className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-[#444] sm:mt-5 sm:text-xs"
        style={{
          opacity: count > 20 ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        Loading experience
      </p>
    </div>
  );
}
