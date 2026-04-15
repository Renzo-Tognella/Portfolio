"use client";
import { useEffect, useRef, useState } from "react";
interface CounterProps { target: number; suffix?: string; duration?: number; }
export default function Counter({ target, suffix = "", duration = 2 }: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const start = performance.now();
        const ms = duration * 1000;
        const tick = (now: number) => {
          const p = Math.min((now - start) / ms, 1);
          const e = 1 - Math.pow(1 - p, 4);
          setValue(e * target);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  const fmt = target % 1 !== 0 ? value.toFixed(1) : Math.round(value);
  return <span ref={ref}>{fmt}{suffix}</span>;
}
