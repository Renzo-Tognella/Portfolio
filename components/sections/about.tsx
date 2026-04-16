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

      // Animate each paragraph
      gsap.utils.toArray<HTMLElement>(".about-text").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Animate stats
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
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
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
      className="section-surface relative px-6 py-[120px] md:py-[160px]"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <div className="section-label">About</div>

        {/* Two column layout */}
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left — Text */}
          <div className="space-y-6">
            {aboutData.paragraphs.map((text, i) => (
              <p
                key={i}
                className="about-text text-base leading-relaxed text-[#a3a3a3] md:text-lg"
              >
                {text}
              </p>
            ))}

            {/* Location & Status */}
            <div className="about-text mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-[#666]">
                <MapPin size={14} />
                <span>{aboutData.location}</span>
              </div>
              {aboutData.available && (
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <Circle size={8} fill="currentColor" />
                  <span>Open to opportunities</span>
                </div>
              )}
            </div>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-6">
            {aboutData.stats.map((stat, i) => (
              <div
                key={i}
                className="about-stat shadow-border group p-6 transition-all duration-300 hover:bg-[#111]"
              >
                <div className="text-3xl font-light text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-xs tracking-wider uppercase text-[#666]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div className="reveal-line mt-20" />
      </div>
    </section>
  );
}
