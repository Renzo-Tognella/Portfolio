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
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".freelance-service").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
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
      id="freelance"
      className="section-surface relative px-6 py-[120px] md:py-[160px]"
    >
      <div className="mx-auto max-w-5xl">
        <div className="section-label">Freelance</div>

        <div className="freelance-content grid gap-16 md:grid-cols-2">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl">
              {freelanceData.company}
            </h2>
            <p className="mt-2 font-mono text-sm tracking-wider uppercase text-[#dc2626]">
              {freelanceData.role}
            </p>
            <p className="mt-6 text-base leading-relaxed text-[#a3a3a3]">
              {freelanceData.description}
            </p>
            <a
              href={freelanceData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-[#666] transition-colors hover:text-white"
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
                className="freelance-service flex items-center justify-between border-b border-[#1a1a1a] py-5 transition-all duration-300 hover:pl-4 hover:border-[#dc2626]"
              >
                <span className="text-sm text-[#a3a3a3]">{service}</span>
                <ArrowUpRight size={14} className="text-[#444]" />
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-line mt-20" />
      </div>
    </section>
  );
}
