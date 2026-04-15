"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "@/components/ui/counter";
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, suffix: "+", label: "Anos de experiencia", color: "#f5f5f7" },
  { value: 99.7, suffix: "%", label: "Reducao operacional", color: "#dc2626" },
  { value: 21, suffix: "", label: "Projetos entregues", color: "#f5f5f7" },
  { value: 1, suffix: "", label: "Artigo IEEE publicado", color: "#f5f5f7", special: "IEEE" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
      // Bio text slides in from left
      tl.fromTo(".about-bio", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" });
      // Stats cards scale in with stagger
      tl.fromTo(".about-stat", { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.4)" }, "-=0.5");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="py-32 md:py-40 px-6 section-surface">
      <div className="max-w-[1200px] mx-auto">
        {/* Section label */}
        <span className="text-micro tracking-[0.2em] text-[#6e6e73] mb-6 block">Sobre</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Bio - 7 cols */}
          <div className="lg:col-span-7">
            <p className="about-bio text-display text-[#f5f5f7] mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              Transformo regras complexas de negocio em solucoes confiaveis e escalaveis.
            </p>
            <p className="about-bio text-body-lg mb-6">
              Engenheiro de software com 3+ anos em backend e sistemas criticos. Reduzi processos de 30 horas para 5 minutos, integrei IA generativa a fluxos corporativos e coautorei pesquisa em visao computacional publicada no IEEE.
            </p>
            <p className="about-bio text-body-lg">
              Atualmente no Tradener desenvolvendo sistemas de energia, e freelancer na Modulus Engenharia com pipeline LLM. Sempre buscando o proximo desafio.
            </p>
          </div>

          {/* Stats - 5 cols */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className={`about-stat card p-6 ${i === 3 ? "col-span-2" : ""}`}>
                <div className="text-[2.5rem] font-semibold leading-none tracking-tight" style={{ color: stat.color }}>
                  {stat.special ? stat.special : <Counter target={stat.value} suffix={stat.suffix} />}
                </div>
                <p className="text-caption mt-2 text-[#6e6e73]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
