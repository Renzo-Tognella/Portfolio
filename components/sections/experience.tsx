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

      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 60%", end: "bottom 40%", scrub: 1 },
        }
      );

      gsap.utils.toArray<HTMLElement>(".experience-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
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
      id="experience"
      className="section-elevated relative py-16 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="container-section">
        <div className="section-label">Experience</div>

        <h2 className="text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Where I&apos;ve<br />
          <span className="text-[#666]">Worked</span>
        </h2>

        {/* Timeline */}
        <div className="relative mt-10 sm:mt-12 md:mt-16">
          {/* Vertical line — always left on mobile, center on md+ */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-[#1a1a1a] md:left-1/2 md:-translate-x-1/2">
            <div className="timeline-line-fill h-full w-full origin-top bg-[#dc2626]" />
          </div>

          <div className="space-y-8 md:space-y-10">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`experience-item relative pl-8 md:w-[calc(50%-16px)] ${
                  i % 2 === 0 ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute top-0 flex h-[14px] w-[14px] items-center justify-center rounded-full border border-[#222] bg-[#0a0a0a] md:top-1 ${
                    i % 2 === 0
                      ? "left-0 md:-right-[calc(50%+22px)]"
                      : "left-0 md:-left-[calc(50%+22px)]"
                  }`}
                >
                  <div className="scale-75 text-[#dc2626]">
                    {typeIcons[exp.type]}
                  </div>
                </div>

                {/* Content card */}
                <div className="shadow-border p-4 transition-all duration-300 hover:bg-[#1a1a1a] sm:p-5 md:p-6">
                  <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#444] sm:text-[11px]">
                    {exp.period}
                  </span>

                  <h3 className="mt-2 text-base font-light text-white sm:text-lg">
                    {exp.role}
                  </h3>

                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-[#dc2626] transition-opacity hover:opacity-70 sm:text-xs"
                    >
                      {exp.company}
                      <ArrowUpRight size={10} />
                    </a>
                  ) : (
                    <p className="mt-1 font-mono text-[11px] text-[#dc2626] sm:text-xs">
                      {exp.company}
                    </p>
                  )}

                  <p className="mt-3 text-xs leading-relaxed text-[#666] sm:text-sm sm:leading-[1.6]">
                    {exp.description}
                  </p>

                  <ul className="mt-3 space-y-1">
                    {exp.highlights.map((h, hi) => (
                      <li key={hi} className="text-[11px] text-[#555] sm:text-xs">
                        &rarr; {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-line mt-12 sm:mt-16 md:mt-20" />
      </div>
    </section>
  );
}
