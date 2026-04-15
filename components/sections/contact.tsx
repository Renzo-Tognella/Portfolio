"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, GitlabIcon } from "@/components/ui/social-icons";
import { socialLinks, aboutMe } from "@/lib/data";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
      tl.fromTo(".ct-form", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
      tl.fromTo(".ct-info", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
      tl.fromTo(".ct-link", { x: 20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.4 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contato" ref={sectionRef} className="py-32 md:py-40 px-6 section-dark">
      <div className="max-w-[1200px] mx-auto">
        <span className="text-micro tracking-[0.2em] text-[#6e6e73] mb-4 block">Contato</span>
        <h2 className="text-headline text-[#f5f5f7]">Vamos conversar?</h2>
        <p className="text-body-lg mt-3 mb-20 max-w-lg">Sempre aberto a novos projetos, oportunidades e ideias.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form */}
          <form className="ct-form" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8">
              <label className="text-micro tracking-[0.15em] text-[#6e6e73] mb-3 block">Nome</label>
              <input type="text" placeholder="Seu nome"
                className="w-full bg-transparent border-b border-white/[0.06] text-[#f5f5f7] text-base py-3 px-0 focus:border-[#f5f5f7]/30 focus:outline-none transition-colors duration-300 placeholder:text-[#6e6e73]/40" />
            </div>
            <div className="mb-8">
              <label className="text-micro tracking-[0.15em] text-[#6e6e73] mb-3 block">Email</label>
              <input type="email" placeholder="seu@email.com"
                className="w-full bg-transparent border-b border-white/[0.06] text-[#f5f5f7] text-base py-3 px-0 focus:border-[#f5f5f7]/30 focus:outline-none transition-colors duration-300 placeholder:text-[#6e6e73]/40" />
            </div>
            <div className="mb-8">
              <label className="text-micro tracking-[0.15em] text-[#6e6e73] mb-3 block">Mensagem</label>
              <textarea placeholder="Sua mensagem..."
                className="w-full bg-transparent border-b border-white/[0.06] text-[#f5f5f7] text-base py-3 px-0 focus:border-[#f5f5f7]/30 focus:outline-none transition-colors duration-300 h-32 resize-none placeholder:text-[#6e6e73]/40" />
            </div>
            <button type="submit" className="btn-primary mt-6 group">
              Enviar mensagem
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          {/* Info */}
          <div className="ct-info">
            <a href={`mailto:${aboutMe.email}`} className="flex items-center gap-4 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/[0.04] group-hover:border-[#dc2626]/30 transition-colors duration-300">
                <Mail className="w-4 h-4 text-[#6e6e73] group-hover:text-[#dc2626] transition-colors duration-300" />
              </div>
              <span className="text-base text-[#f5f5f7] group-hover:text-[#dc2626] transition-colors duration-300">{aboutMe.email}</span>
            </a>

            <div className="flex items-center gap-4 mb-12">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/[0.04]">
                <MapPin className="w-4 h-4 text-[#6e6e73]" />
              </div>
              <span className="text-base text-[#6e6e73]">{aboutMe.location}</span>
            </div>

            {/* Social links */}
            <div className="space-y-4 mb-12">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="ct-link flex items-center gap-4 text-[#6e6e73] hover:text-[#dc2626] hover:translate-x-2 transition-all duration-300 w-fit group">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/[0.04] group-hover:border-[#dc2626]/20 transition-colors duration-300">
                    {link.icon === "github" && <GithubIcon size={14} />}
                    {link.icon === "linkedin" && <LinkedinIcon size={14} />}
                    {link.icon === "gitlab" && <GitlabIcon size={14} />}
                  </div>
                  <span className="text-sm">{link.name}</span>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="inline-flex items-center gap-3 card px-5 py-3">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span className="text-micro text-[#6e6e73]">Disponivel para novos projetos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
