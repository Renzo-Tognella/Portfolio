"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/ui/project-card";
import { projects } from "@/lib/data";
gsap.registerPlugin(ScrollTrigger);

const cats = [
  { key: "all", label: "Todos" },
  { key: "ai-ml", label: "AI & ML" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
];

export default function Projects() {
  const [active, setActive] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(".project-card-wrapper");
      if (!cards.length) return;
      gsap.fromTo(cards,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current!, start: "top 75%", toggleActions: "play none none none" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <section id="projetos" ref={sectionRef} className="py-32 md:py-40 px-6 section-dark">
      <div className="max-w-[1200px] mx-auto">
        <span className="text-micro tracking-[0.2em] text-[#6e6e73] mb-4 block">Projetos</span>
        <h2 className="text-headline text-[#f5f5f7] mb-3">Trabalhos selecionados</h2>
        <p className="text-body-lg mb-14 max-w-lg">Do backend ao machine learning, cada projeto resolve um problema real.</p>

        {/* Filter tabs - Apple pill style */}
        <div className="flex flex-wrap gap-2 mb-12">
          {cats.map((c) => (
            <button key={c.key} onClick={() => setActive(c.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-400 ${
                active === c.key
                  ? "bg-[#f5f5f7] text-[#1d1d1f]"
                  : "text-[#6e6e73] border border-white/[0.06] hover:border-white/[0.12] hover:text-[#86868b]"
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <div key={p.id} className={`project-card-wrapper ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}>
                <ProjectCard {...p} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
