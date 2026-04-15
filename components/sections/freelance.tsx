"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, ChevronRight } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "10", label: "Usuarios ativos" },
  { value: "~50", label: "Propostas/dia" },
  { value: "83%", label: "Reducao de tempo" },
  { value: "1h→10m", label: "Geracao relatorios" },
];

export default function Freelance() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
      });
      // Video container reveals with clip-path
      tl.fromTo(".fl-video", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power4.inOut" });
      // Content slides in from right
      tl.fromTo(".fl-text", { x: 40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out" }, "-=1.0");
      // Metrics pop in
      tl.fromTo(".fl-metric", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.4)" }, "-=0.4");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 section-surface">
      <div className="max-w-[1200px] mx-auto">
        <span className="text-micro tracking-[0.2em] text-[#6e6e73] mb-4 block">Freelance</span>
        <h2 className="text-headline text-[#f5f5f7] mb-16">Problemas reais.<br/>Solucoes mensuraveis.</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video placeholder */}
          <div className="fl-video relative rounded-2xl overflow-hidden aspect-video bg-[#1d1d1f] flex items-center justify-center"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.5)" }}>
            <div className="w-20 h-20 rounded-full bg-white/[0.06] backdrop-blur-sm flex items-center justify-center border border-white/[0.08] group cursor-pointer hover:bg-white/[0.1] transition-all duration-300 hover:scale-105">
              <Play className="text-[#f5f5f7] w-7 h-7 ml-1" />
            </div>
            <span className="absolute top-5 right-5 text-micro px-3 py-1.5 rounded-full bg-[#dc2626]/15 text-[#dc2626] border border-[#dc2626]/20">Demo em breve</span>
          </div>

          {/* Content */}
          <div>
            <p className="fl-text text-micro tracking-[0.2em] text-[#dc2626] mb-3">Modulus Engenharia</p>
            <h3 className="fl-text text-headline text-[#f5f5f7] mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>Plataforma SaaS de Propostas</h3>

            {/* Problem / Solution */}
            <div className="fl-text space-y-6 mb-8">
              <div className="relative pl-5">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[#dc2626]/40" />
                <span className="text-micro text-[#6e6e73] mb-1 block">Problema</span>
                <p className="text-body">Processo manual disperso em planilhas e emails. Sem rastreabilidade, sem governanca.</p>
              </div>
              <div className="relative pl-5">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[#22c55e]/40" />
                <span className="text-micro text-[#6e6e73] mb-1 block">Solucao</span>
                <p className="text-body">Pipeline LLM le emails, extrai dados e abre fluxo comercial automaticamente com validacao human-in-the-loop.</p>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {metrics.map((m) => (
                <div key={m.label} className="fl-metric card p-4">
                  <div className="text-xl font-semibold text-[#f5f5f7] tracking-tight">{m.value}</div>
                  <p className="text-micro text-[#6e6e73] mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="fl-text flex flex-wrap gap-2">
              {["Rails", "Python", "LLMs", "PostgreSQL", "Analytics"].map((t) => (
                <span key={t} className="text-micro px-3 py-1.5 rounded-full bg-white/[0.03] text-[#6e6e73] border border-white/[0.04]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
