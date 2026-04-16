"use client";

import { useRef } from "react";
import { projects, type Project } from "@/lib/data";
import { ExternalLink, GitBranch } from "lucide-react";

const categoryColors: Record<string, string> = {
  engineering: "#dc2626",
  research: "#3b82f6",
  creative: "#8b5cf6",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="project-card group relative overflow-hidden shadow-border transition-all duration-500 hover:shadow-border-hover"
      style={{ animationDelay: index * 100 + "ms" }}
    >
      <div
        className="h-px w-0 transition-all duration-700 group-hover:w-full"
        style={{ backgroundColor: categoryColors[project.category] }}
      />
      <div className="p-5 sm:p-6 md:p-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase sm:text-[11px]" style={{ color: categoryColors[project.category] }}>
              {project.category}
            </span>
            <h3 className="mt-1.5 text-base font-light tracking-tight text-white sm:text-lg md:text-xl">{project.title}</h3>
            <p className="mt-0.5 text-xs text-[#666] sm:text-sm">{project.subtitle}</p>
          </div>
          <span className="shrink-0 font-mono text-[10px] text-[#444] sm:text-xs">{project.year}</span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[#a3a3a3] sm:mt-5 sm:text-sm sm:leading-[1.65]">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-[#111] px-2 py-0.5 font-mono text-[9px] tracking-[0.06em] uppercase text-[#666] sm:px-2.5 sm:py-1 sm:text-[10px]">{tag}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 sm:mt-5">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[32px] items-center gap-1.5 text-[11px] text-[#666] transition-colors hover:text-white sm:text-xs">
              <ExternalLink size={12} /><span>Live</span>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex min-h-[32px] items-center gap-1.5 text-[11px] text-[#666] transition-colors hover:text-white sm:text-xs">
              <GitBranch size={12} /><span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const categories = ["all", "engineering", "research", "creative"] as const;
  return (
    <section ref={sectionRef} id="projects" className="section-void relative py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="container-section">
        <div className="section-label">Projects</div>
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">Selected<br /><span className="text-[#666]">Work</span></h2>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button key={cat} data-filter={cat} className={`shrink-0 px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-300 min-h-[36px] sm:px-4 sm:py-2 sm:text-[11px] ${cat === "all" ? "bg-white text-black" : "text-[#666] hover:text-white"}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-12 md:mt-16 md:grid-cols-2 md:gap-5">
          {projects.filter((p) => p.featured).map((project, i) => (<ProjectCard key={project.id} project={project} index={i} />))}
        </div>
        <div className="mt-4 grid gap-4 sm:mt-5 md:mt-6 md:grid-cols-3 md:gap-5">
          {projects.filter((p) => !p.featured).map((project, i) => (<ProjectCard key={project.id} project={project} index={i} />))}
        </div>
        <div className="reveal-line mt-12 sm:mt-16 md:mt-20" />
      </div>
    </section>
  );
}
