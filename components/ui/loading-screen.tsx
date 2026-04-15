"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface LoadingScreenProps { onComplete: () => void; }

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "revealing" | "done">("counting");
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stableOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline();

    // Phase 1: Counter 0-100 with easing
    tl.to(counter, {
      val: 100, duration: 2.8, ease: "power3.inOut",
      onUpdate: () => setCount(Math.round(counter.val)),
    });

    // Phase 2: Shrink counter + expand reveal line
    tl.to(counterRef.current, {
      scale: 0.6, opacity: 0, duration: 0.4, ease: "power2.in",
      onComplete: () => setPhase("revealing"),
    }, "-=0.1");

    // Phase 3: Reveal line expands
    tl.to(lineRef.current, {
      scaleX: 1, duration: 0.6, ease: "power4.inOut",
    }, "-=0.2");

    // Phase 4: Overlay slides up like Apple product reveal
    tl.to(overlayRef.current, {
      yPercent: -100, duration: 1.0, ease: "power4.inOut",
      onComplete: () => { setPhase("done"); stableOnComplete(); },
    }, "-=0.2");

    return () => { tl.kill(); };
  }, [stableOnComplete]);

  if (phase === "done") return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] bg-black flex items-center justify-center flex-col">
      {/* Counter */}
      <div ref={counterRef} className="relative">
        <span className="font-mono text-[clamp(4rem,10vw,7rem)] font-light text-[#f5f5f7]/20 tabular-nums tracking-tight">
          {count}
        </span>
        {/* Subtle ruby accent line below counter */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[#dc2626]/40" />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[1px]">
        <div className="h-full bg-gradient-to-r from-transparent via-[#f5f5f7]/20 to-transparent" style={{ width: `${count}%` }} />
      </div>

      {/* Center reveal line */}
      <div ref={lineRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[1px] bg-gradient-to-b from-transparent via-[#f5f5f7]/10 to-transparent origin-center scale-x-0" />
    </div>
  );
}
