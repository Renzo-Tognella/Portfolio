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

      // Animate skill bars on scroll
      gsap.utils.toArray<HTMLElement>(".skill-bar-fill").forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width") || "0%";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: targetWidth,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          }
        );
      });

      // Fade in category blocks
      gsap.utils.toArray<HTMLElement>(".skill-category").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
      id="skills"
      className="section-void relative px-6 py-[120px] md:py-[160px]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-label">Skills</div>

        <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl">
          Technical<br />
          <span className="text-[#666]">Arsenal</span>
        </h2>

        {/* Bento grid layout */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skills.map((category) => (
            <div
              key={category.category}
              className="skill-category shadow-border p-8 transition-all duration-300 hover:bg-[#0a0a0a]"
            >
              {/* Category header */}
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-mono text-sm tracking-widest uppercase text-white">
                  {category.category}
                </h3>
              </div>

              {/* Skills list with bars */}
              <div className="space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm text-[#a3a3a3]">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-[#444]">
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

        <div className="reveal-line mt-20" />
      </div>
    </section>
  );
}
