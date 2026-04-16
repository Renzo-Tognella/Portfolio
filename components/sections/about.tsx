"use client";

import { useEffect, useRef } from "react";
import { aboutData } from "@/lib/data";
import { MapPin, Circle } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.utils.toArray<HTMLElement>(".about-text").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".about-stat").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-surface relative py-16 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="container-section">
        {/* Section label */}
        <div className="section-label">About</div>

        {/* Two column — stacks on mobile */}
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:gap-16">
          {/* Left — Text */}
          <div className="space-y-4 sm:space-y-5">
            {aboutData.paragraphs.map((text, i) => (
              <p
                key={i}
                className="about-text text-sm leading-relaxed text-[#a3a3a3] sm:text-base sm:leading-[1.7]"
              >
                {text}
              </p>
            ))}

            {/* Location & Status */}
            <div className="about-text flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#666] sm:text-sm">
                <MapPin size={14} className="shrink-0" />
                <span>{aboutData.location}</span>
              </div>
              {aboutData.available && (
                <div className="flex items-center gap-2 text-xs text-green-500 sm:text-sm">
                  <Circle size={8} fill="currentColor" className="shrink-0" />
                  <span>Open to opportunities</span>
                </div>
              )}
            </div>
          </div>

          {/* Right — Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {aboutData.stats.map((stat, i) => (
              <div
                key={i}
                className="about-stat shadow-border p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-[#111]"
              >
                <div className="text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-[#666] sm:text-[11px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="reveal-line mt-12 sm:mt-16 md:mt-20" />
      </div>
    </section>
  );
}
