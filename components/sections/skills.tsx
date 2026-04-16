"use client";

import { useRef, useEffect } from "react";
import { skills } from "@/lib/data";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.utils.toArray<HTMLElement>(".skill-bar-fill").forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width") || "0%";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: targetWidth, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 92%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".skill-category").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, delay: i * 0.15, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-void relative py-16 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="container-section">
        <div className="section-label">Skills</div>

        <h2 className="text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Technical<br />
          <span className="text-[#666]">Arsenal</span>
        </h2>

        {/* Bento grid — 1 col mobile, 2 col md+ */}
        <div className="mt-10 grid gap-4 sm:mt-12 md:mt-16 md:grid-cols-2 md:gap-5">
          {skills.map((category) => (
            <div
              key={category.category}
              className="skill-category shadow-border p-5 transition-all duration-300 hover:bg-[#0a0a0a] sm:p-6 md:p-8"
            >
              {/* Category header */}
              <div className="mb-5 flex items-center gap-2.5 sm:mb-6">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-mono text-[11px] tracking-[0.1em] uppercase text-white sm:text-xs">
                  {category.category}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-3 sm:space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-[#a3a3a3] sm:text-sm">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#444] sm:text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-[2px] w-full bg-[#1a1a1a]">
                      <div
                        className="skill-bar-fill h-full"
                        data-width={skill.level + "%"}
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal-line mt-12 sm:mt-16 md:mt-20" />
      </div>
    </section>
  );
}
