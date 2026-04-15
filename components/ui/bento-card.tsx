"use client";
import { ReactNode } from "react";
interface BentoCardProps { children: ReactNode; className?: string; colSpan?: number; rowSpan?: number; accent?: string; }
export default function BentoCard({ children, className = "", colSpan = 1, rowSpan = 1, accent }: BentoCardProps) {
  return (
    <div className={`card relative overflow-hidden group ${className}`}
      style={{
        gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`,
      }}>
      {/* Accent top line on hover */}
      {accent && (
        <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      )}
      <div className="p-6 h-full">{children}</div>
    </div>
  );
}
