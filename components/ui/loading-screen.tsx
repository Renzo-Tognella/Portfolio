"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 3400; // 3.4s counting
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;

      // Eased progress — starts slow, accelerates, then eases at end
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const value = Math.min(Math.round(eased * 100), 100);
      setCount(value);

      if (value >= 100) {
        clearInterval(timer);
        // Hold at 100 for 100ms then exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800); // Exit animation duration
        }, 100);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#000",
        transition: "clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        clipPath: isExiting
          ? "inset(50% 50% 50% 50%)" // Shrinks to center point
          : "inset(0 0 0 0)",
      }}
    >
      {/* Counter */}
      <div className="relative">
        <span
          ref={counterRef}
          className="font-mono text-[120px] font-light tracking-tight text-white tabular-nums"
          style={{
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {count}
        </span>
        <span className="absolute -right-8 top-8 font-mono text-2xl text-[#dc2626]">
          %
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-8 h-[1px] w-[200px] bg-[#222]">
        <div
          className="h-full bg-[#dc2626] transition-all duration-75"
          style={{ width: count + "%" }}
        />
      </div>

      {/* Subtitle */}
      <p
        className="mt-6 font-mono text-xs tracking-[0.3em] uppercase text-[#444]"
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
