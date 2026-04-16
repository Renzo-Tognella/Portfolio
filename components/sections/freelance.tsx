"use client";

import { useRef, useEffect } from "react";
import { freelanceData } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Freelance() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        ".freelance-content",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".freelance-service").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="freelance"
      className="section-surface relative py-16 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="container-section">
        <div className="section-label">Freelance</div>

        <div className="freelance-content grid gap-10 sm:gap-12 md:grid-cols-2 md:gap-16">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {freelanceData.company}
            </h2>
            <p className="mt-2 font-mono text-[11px] tracking-[0.1em] uppercase text-[#dc2626] sm:text-xs">
              {freelanceData.role}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#a3a3a3] sm:mt-5 sm:text-base sm:leading-[1.7]">
              {freelanceData.description}
            </p>
            <a
              href={freelanceData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-[#666] transition-colors hover:text-white sm:mt-6 sm:text-sm"
            >
              Visit site
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right — Services */}
          <div className="space-y-0">
            {freelanceData.services.map((service, i) => (
              <div
                key={i}
                className="freelance-service flex items-center justify-between border-b border-[#1a1a1a] py-4 transition-all duration-300 hover:pl-3 hover:border-[#dc2626] sm:py-5"
              >
                <span className="text-xs text-[#a3a3a3] sm:text-sm">{service}</span>
                <ArrowUpRight size={14} className="shrink-0 text-[#444]" />
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-line mt-12 sm:mt-16 md:mt-20" />
      </div>
    </section>
  );
}
