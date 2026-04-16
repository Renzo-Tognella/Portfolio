"use client";

import { useRef } from "react";
import { projects, type Project } from "@/lib/data";
import { ExternalLink, Github } from "lucide-react";

// ── Project Card ──
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const categoryColors: Record<string, string> = {
    engineering: "#dc2626",
    research: "#3b82f6",
    creative: "#8b5cf6",
  };

  return (
    <div
      ref={cardRef}
      className="project-card group relative overflow-hidden shadow-border transition-all duration-500 hover:shadow-border-hover"
      style={{
        animationDelay: index * 100 + "ms",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[1px] w-0 transition-all duration-700 group-hover:w-full"
        style={{ backgroundColor: categoryColors[project.category] }}
      />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: categoryColors[project.category] }}
            >
              {project.category}
            </span>
            <h3 className="mt-2 text-xl font-light text-white">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-[#666]">{project.subtitle}</p>
          </div>
          <span className="font-mono text-xs text-[#444]">{project.year}</span>
        </div>

        {/* Description */}
        <p className="mt-6 text-sm leading-relaxed text-[#a3a3a3]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#111] px-3 py-1 font-mono text-[10px] tracking-wider uppercase text-[#666]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex items-center gap-4">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#666] transition-colors hover:text-white"
            >
              <ExternalLink size={12} />
              <span>Live</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#666] transition-colors hover:text-white"
            >
              <Github size={12} />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Projects Section ──
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const categories = ["all", "engineering", "research", "creative"] as const;
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-void relative px-6 py-[120px] md:py-[160px]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <div className="section-label">Projects</div>

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl">
            Selected<br />
            <span className="text-[#666]">Work</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex gap-1">
            {categories.map((cat, i) => (
              <button
                key={cat}
                ref={(el) => { filterRefs.current[i] = el; }}
                data-filter={cat}
                className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                  cat === "all"
                    ? "bg-white text-black"
                    : "text-[#666] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
        </div>

        {/* Non-featured projects */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
        </div>

        {/* Divider */}
        <div className="reveal-line mt-20" />
      </div>
    </section>
  );
}
