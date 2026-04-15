"use client";
import { useRef, MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, GitlabIcon } from "@/components/ui/social-icons";

interface ProjectCardProps {
  title: string; description: string; tags: string[]; category: string;
  github?: string; gitlab?: string; live?: string; impact?: string; index?: number;
}

export default function ProjectCard({ title, description, tags, github, gitlab, live, impact }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const c = cardRef.current; if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
  };

  const accentColors: Record<string, string> = {
    "backend": "#dc2626", "ai-ml": "#a855f7", "frontend": "#2997ff", "mobile": "#f97316", "academic": "#22c55e",
  };
  const accent = accentColors[tags[0]?.toLowerCase()] || "#2997ff";

  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
      className="card group relative overflow-hidden cursor-default"
      style={{ transform: "perspective(1200px)", transition: "transform 0.2s ease-out, box-shadow 0.5s ease" }}>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

      <div className="p-7">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-micro px-2.5 py-1 rounded-full bg-white/[0.04] text-[#6e6e73]">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-title text-[#f5f5f7] mb-2">{title}</h3>

        {/* Description */}
        <p className="text-caption text-[#86868b] leading-relaxed line-clamp-2 mb-4">{description}</p>

        {/* Impact badge */}
        {impact && (
          <div className="inline-flex items-center gap-1.5 mb-5">
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-micro" style={{ color: accent }}>{impact}</span>
          </div>
        )}

        {/* Footer with links */}
        <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
          <div className="flex gap-3">
            {github && <a href={github} target="_blank" rel="noopener noreferrer" className="text-[#6e6e73] hover:text-[#f5f5f7] transition-colors duration-300"><GithubIcon size={15} /></a>}
            {gitlab && <a href={gitlab} target="_blank" rel="noopener noreferrer" className="text-[#6e6e73] hover:text-[#f5f5f7] transition-colors duration-300"><GitlabIcon size={15} /></a>}
            {live && <a href={live} target="_blank" rel="noopener noreferrer" className="text-[#6e6e73] hover:text-[#f5f5f7] transition-colors duration-300 text-micro">Live</a>}
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#6e6e73] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}
