"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Unboxing: Name reveals from below with clip-path
      if (nameRef.current) {
        const lines = nameRef.current.querySelectorAll(".hero-line");
        gsap.set(lines, { y: 120, opacity: 0 });
        tl.to(lines, {
          y: 0, opacity: 1, stagger: 0.15,
          duration: 1.2, ease: "power4.out",
        }, 0.3);
      }

      // Subtitle fades up after name
      tl.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        1.2
      );

      // CTAs slide up
      if (ctasRef.current) {
        const btns = ctasRef.current.querySelectorAll("a, button");
        gsap.set(btns, { y: 20, opacity: 0 });
        tl.to(btns, {
          y: 0, opacity: 1, stagger: 0.12,
          duration: 0.6, ease: "power2.out",
        }, 1.5);
      }

      // Scroll indicator
      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        2.0
      );

      // Parallax: name drifts up on scroll
      if (nameRef.current) {
        gsap.to(nameRef.current, {
          y: -150, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", end: "bottom top",
            scrub: 0.5,
          },
        });
      }
      // Subtitle fades
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 0, y: -40, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", end: "50% top",
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="inicio" ref={sectionRef} className="relative min-h-screen flex items-center justify-center section-dark">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-8">
          <span className="text-micro tracking-[0.2em] text-[#6e6e73]">Engenheiro de Software</span>
        </div>

        {/* Name - Apple-style large display */}
        <div ref={nameRef} className="overflow-hidden">
          <div className="hero-line">
            <h1 className="text-display text-[#f5f5f7]">Renzo</h1>
          </div>
          <div className="hero-line">
            <h1 className="text-display text-[#f5f5f7]">Tognella<span className="text-[#dc2626]">.</span></h1>
          </div>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-6">
          <p className="text-body-lg max-w-md mx-auto">Backend · AI/ML · Sistemas Criticos</p>
        </div>

        {/* CTAs - Apple pill style */}
        <div ref={ctasRef} className="flex flex-wrap gap-4 justify-center mt-12">
          <button onClick={() => go("#projetos")} className="btn-primary">
            Ver projetos
          </button>
          <button onClick={() => go("#contato")} className="btn-secondary">
            Contato
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-[#f5f5f7]/15" />
        <span className="text-micro text-[#6e6e73]/50 tracking-[0.15em]">scroll</span>
      </div>
    </section>
  );
}
