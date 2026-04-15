"use client";
import { GithubIcon, LinkedinIcon, GitlabIcon } from "@/components/ui/social-icons";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <span className="font-mono text-lg font-medium text-[#f5f5f7] tracking-tight">
              rz<span className="text-[#dc2626]">.</span>
            </span>
            <p className="text-caption text-[#6e6e73] mt-3 max-w-xs">Engenheiro de software construindo sistemas criticos com Ruby on Rails, Python e AI/ML.</p>
          </div>

          {/* Links */}
          <div>
            <p className="text-micro tracking-[0.15em] text-[#6e6e73] mb-4">Navegacao</p>
            <div className="grid grid-cols-2 gap-2">
              {[{l:"Inicio",h:"#inicio"},{l:"Sobre",h:"#sobre"},{l:"Projetos",h:"#projetos"},{l:"Skills",h:"#skills"},{l:"Experiencia",h:"#experiencia"},{l:"Contato",h:"#contato"}].map((item) => (
                <button key={item.h} onClick={() => go(item.h)} className="text-sm text-[#6e6e73] hover:text-[#f5f5f7] transition-colors duration-300 text-left">{item.l}</button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-micro tracking-[0.15em] text-[#6e6e73] mb-4">Social</p>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#6e6e73] hover:text-[#f5f5f7] transition-colors duration-300">
                  {link.icon === "github" && <GithubIcon size={14} />}
                  {link.icon === "linkedin" && <LinkedinIcon size={14} />}
                  {link.icon === "gitlab" && <GitlabIcon size={14} />}
                  <span className="text-sm">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-micro text-[#6e6e73]/50">&copy; {year} Renzo Tognella. Todos os direitos reservados.</p>
          <p className="text-micro text-[#6e6e73]/50">Construido com Next.js, Tailwind CSS &amp; GSAP</p>
        </div>
      </div>
    </footer>
  );
}
