"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "lucide-react";
import { experiences } from "@/lib/data";
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Timeline line draws vertically on scroll
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "bottom 30%", scrub: 0.5 }
          }
        );
      }

      // Dots pop in
      gsap.fromTo(".tl-dot", { scale: 0 }, {
        scale: 1, stagger: 0.3, duration: 0.4, ease: "back.out(2)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      });

      // Cards slide in from right with stagger
      gsap.fromTo(".tl-card", { x: 80, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.25, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencia" ref={sectionRef} className="py-32 md:py-40 px-6 section-surface">
      <div className="max-w-[1200px] mx-auto">
        <span className="text-micro tracking-[0.2em] text-[#6e6e73] mb-4 block">Trajetoria</span>
        <h2 className="text-headline text-[#f5f5f7] mb-20">Experiencia profissional</h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div ref={lineRef} className="absolute left-[23px] md:left-[calc(33.333%-1px)] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#f5f5f7]/10 via-[#f5f5f7]/06 to-transparent origin-top" />

          {experiences.map((exp) => (
            <div key={exp.id} className="relative mb-16 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Date column */}
                <div className="relative pl-12 md:pl-0 md:text-right md:pr-12">
                  {/* Dot */}
                  <div className="tl-dot absolute left-[18px] md:left-[calc(33.333%-5px)] top-1.5 w-[10px] h-[10px] rounded-full bg-[#0a0a0a] border-2 border-[#f5f5f7]/20 z-10" />
                  <span className="font-mono text-sm text-[#6e6e73] tracking-tight">{exp.period}</span>
                </div>

                {/* Content */}
                <div className="md:col-span-2 tl-card">
                  {/* Badge */}
                  <span className="inline-flex rounded-full px-3 py-1 text-micro tracking-wider"
                    style={{ backgroundColor: exp.badge.color + "12", color: exp.badge.color, border: `1px solid ${exp.badge.color}20` }}>
                    {exp.badge.text}
                  </span>

                  <h3 className="text-title text-[#f5f5f7] mt-3">{exp.role}</h3>
                  <p className="text-body-lg mt-1">{exp.company}</p>

                  {/* Description items */}
                  <div className="mt-5 space-y-3">
                    {exp.description.map((item, j) => (
                      <p key={j} className="text-sm text-[#86868b] leading-relaxed pl-4 border-l border-white/[0.04]">{item}</p>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-micro px-2.5 py-1 rounded-full bg-white/[0.03] text-[#6e6e73] border border-white/[0.04]">{tag}</span>
                    ))}
                  </div>

                  {/* IEEE card */}
                  {exp.id === "utfpr-pesquisa" && (
                    <div className="mt-6 card p-5" style={{ animation: "float 6s ease-in-out infinite" }}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-[#a855f7]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#f5f5f7]">Artigo publicado no IEEE LARS/SBR 2023</p>
                          <p className="text-caption text-[#6e6e73] mt-1">Estimating the 3D center point of an object with Kinect sensor RGB-D images</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
