"use client";

import { useRef, useEffect } from "react";
import { experiences } from "@/lib/data";
import { Briefcase, FlaskConical, GraduationCap, ArrowUpRight } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  work: <Briefcase size={14} />,
  research: <FlaskConical size={14} />,
  education: <GraduationCap size={14} />,
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Animate timeline line
      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      // Animate each item
      gsap.utils.toArray<HTMLElement>(".experience-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
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
      id="experience"
      className="section-elevated relative px-6 py-[120px] md:py-[160px]"
    >
      <div className="mx-auto max-w-4xl">
        <div className="section-label">Experience</div>

        <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl">
          Where I've<br />
          <span className="text-[#666]">Worked</span>
        </h2>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-0 h-full w-[1px] bg-[#1a1a1a] md:left-1/2 md:-translate-x-1/2">
            <div className="timeline-line-fill h-full w-full origin-top bg-[#dc2626]" />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`experience-item relative pl-10 md:w-1/2 ${
                  i % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#222] bg-[#0a0a0a] ${
                    i % 2 === 0
                      ? "left-0 md:left-auto md:-right-3"
                      : "left-0 md:-left-3"
                  }`}
                >
                  <div className="text-[#dc2626]">
                    {typeIcons[exp.type]}
                  </div>
                </div>

                {/* Content */}
                <div className="shadow-border p-6 transition-all duration-300 hover:bg-[#1a1a1a]">
                  <div
                    className={`flex items-center gap-2 ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="font-mono text-xs tracking-wider uppercase text-[#444]">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-light text-white">
                    {exp.role}
                  </h3>

                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 font-mono text-sm text-[#dc2626] transition-opacity hover:opacity-70"
                    >
                      {exp.company}
                      <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    <p className="mt-1 font-mono text-sm text-[#dc2626]">
                      {exp.company}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-relaxed text-[#666]">
                    {exp.description}
                  </p>

                  <ul
                    className={`mt-4 space-y-1.5 ${i % 2 === 0 ? "md:text-left" : ""}`}
                  >
                    {exp.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="text-xs text-[#555]"
                      >
                        → {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-line mt-20" />
      </div>
    </section>
  );
}
