"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "@/components/ui/bento-card";
import Marquee from "@/components/ui/marquee";
import { techMarquee } from "@/lib/data";
gsap.registerPlugin(ScrollTrigger);

const backendSkills = [
  { name: "Ruby on Rails", level: 90 },
  { name: "Python", level: 85 },
  { name: "REST APIs", level: 90 },
  { name: "PostgreSQL", level: 85 },
  { name: "RSpec / TDD", level: 85 },
  { name: "Sidekiq", level: 80 },
];

const Dot = ({ color }: { color: string }) => (
  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
      });
      tl.fromTo(".sk-card", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.5, ease: "back.out(1.4)" });
      tl.fromTo(".sk-marquee", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-32 md:py-40 px-6 section-dark">
      <div className="max-w-[1200px] mx-auto">
        <span className="text-micro tracking-[0.2em] text-[#6e6e73] mb-4 block">Competencias</span>
        <h2 className="text-headline text-[#f5f5f7] mb-16">Stack &amp; Ferramentas</h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {/* BACKEND - large card */}
          <BentoCard colSpan={2} rowSpan={2} accent="#dc2626" className="sk-card">
            <p className="text-micro tracking-[0.15em] text-[#dc2626] mb-6">BACKEND</p>
            <div className="space-y-4">
              {backendSkills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-[#86868b]">{s.name}</span>
                    <span className="font-mono text-[10px] text-[#6e6e73] tabular-nums">{s.level}%</span>
                  </div>
                  <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#dc2626]/60 to-[#dc2626]"
                      style={{ width: `${s.level}%`, transition: "width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* AI & ML */}
          <BentoCard accent="#a855f7" className="sk-card">
            <p className="text-micro tracking-[0.15em] text-[#a855f7] mb-4">AI &amp; ML</p>
            <div className="space-y-2">
              {["Machine Learning", "NLP / PLN", "LLMs / GenAI", "Computer Vision", "BERTopic"].map((s) => (
                <p key={s} className="text-sm text-[#86868b] flex items-center gap-2"><Dot color="#a855f7" />{s}</p>
              ))}
            </div>
          </BentoCard>

          {/* FRONTEND */}
          <BentoCard accent="#2997ff" className="sk-card">
            <p className="text-micro tracking-[0.15em] text-[#2997ff] mb-4">FRONTEND</p>
            <div className="space-y-2">
              {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((s) => (
                <p key={s} className="text-sm text-[#86868b] flex items-center gap-2"><Dot color="#2997ff" />{s}</p>
              ))}
            </div>
          </BentoCard>

          {/* DATABASES */}
          <BentoCard colSpan={2} accent="#22c55e" className="sk-card">
            <p className="text-micro tracking-[0.15em] text-[#22c55e] mb-4">DATABASES</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {[{n:"PostgreSQL",l:"Advanced"},{n:"Redis",l:"Intermediate"},{n:"MySQL",l:"Advanced"}].map((d) => (
                <span key={d.n} className="text-sm text-[#86868b] flex items-center gap-2">
                  <Dot color="#22c55e" />{d.n} <span className="font-mono text-[10px] text-[#6e6e73]">({d.l})</span>
                </span>
              ))}
            </div>
          </BentoCard>

          {/* DEVOPS */}
          <BentoCard accent="#f97316" className="sk-card">
            <p className="text-micro tracking-[0.15em] text-[#f97316] mb-4">DEVOPS</p>
            <div className="space-y-2">
              {["Docker", "Git / GitHub", "AWS", "CI/CD"].map((s) => (
                <p key={s} className="text-sm text-[#86868b] flex items-center gap-2"><Dot color="#f97316" />{s}</p>
              ))}
            </div>
          </BentoCard>

          {/* ENG. SOFTWARE */}
          <BentoCard accent="#f5f5f7" className="sk-card">
            <p className="text-micro tracking-[0.15em] text-[#f5f5f7] mb-4">ENG. SOFTWARE</p>
            <div className="space-y-2">
              {["Clean Code / SOLID", "Design Patterns", "Scrum / Kanban"].map((s) => (
                <p key={s} className="text-sm text-[#86868b] flex items-center gap-2"><Dot color="#f5f5f7" />{s}</p>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* Marquee */}
        <div className="sk-marquee">
          <Marquee items={techMarquee} />
          <Marquee items={techMarquee} direction="right" speed={50} />
        </div>
      </div>
    </section>
  );
}
