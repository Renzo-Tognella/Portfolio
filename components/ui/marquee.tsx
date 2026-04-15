"use client";
import { useEffect, useRef } from "react";
interface MarqueeProps { items: string[]; speed?: number; direction?: "left" | "right"; }
export default function Marquee({ items, speed = 40, direction = "left" }: MarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroller = scrollerRef.current; if (!scroller) return;
    const w = scroller.scrollWidth / 2;
    const from = direction === "left" ? "0" : `-${w}px`;
    const to = direction === "left" ? `-${w}px` : "0";
    const name = `mq-${Math.random().toString(36).slice(2)}`;
    const s = document.createElement("style");
    s.textContent = `@keyframes ${name}{0%{transform:translateX(${from})}100%{transform:translateX(${to})}}`;
    document.head.appendChild(s);
    scroller.style.animation = `${name} ${speed}s linear infinite`;
    return () => { s.remove(); };
  }, [speed, direction]);
  return (
    <div className="overflow-hidden w-full py-3">
      <div ref={scrollerRef} className="flex w-fit">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.15em] text-white/[0.04]">
            {item}<span className="mx-5 text-[#dc2626]/20">&#x2022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
