"use client";

import { useEffect, useRef, useState } from "react";
import { heroData } from "@/lib/data";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = heroData.roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 60);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % heroData.roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // GSAP entrance animation
  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({ delay: 3.8 }); // After loading screen

      tl.fromTo(
        section.querySelector(".hero-greeting"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          section.querySelector(".hero-name"),
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          section.querySelector(".hero-role"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          section.querySelector(".hero-tagline"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          section.querySelector(".hero-cta"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          section.querySelector(".hero-scroll-indicator"),
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.2"
        );
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-void relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(220, 38, 38, 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines (decorative) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Greeting */}
        <p className="hero-greeting font-mono text-sm tracking-[0.3em] uppercase text-[#666] md:text-base">
          {heroData.greeting}
        </p>

        {/* Name */}
        <h1 className="hero-name mt-6 text-5xl font-light tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-9xl">
          {heroData.name.split(" ")[0]}
          <br />
          <span className="text-gradient-cinematic">
            {heroData.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Typewriter role */}
        <div className="hero-role mt-8 flex items-center justify-center gap-3">
          <span className="inline-block h-[1px] w-8 bg-[#dc2626]" />
          <span className="font-mono text-lg tracking-wide text-[#a3a3a3] md:text-xl">
            {displayText}
            <span className="animate-pulse text-[#dc2626]">|</span>
          </span>
          <span className="inline-block h-[1px] w-8 bg-[#dc2626]" />
        </div>

        {/* Tagline */}
        <p className="hero-tagline mt-6 text-base text-[#666] md:text-lg">
          {heroData.tagline}
        </p>

        {/* CTAs */}
        <div className="hero-cta mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={heroData.cta.primary.href}
            className="magnetic-btn"
          >
            {heroData.cta.primary.label}
          </a>
          <a
            href={heroData.cta.secondary.href}
            className="font-mono text-sm tracking-widest uppercase text-[#666] transition-colors hover:text-white"
          >
            {heroData.cta.secondary.label} &rarr;
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#444]">
            Scroll
          </span>
          <div className="h-12 w-[1px] overflow-hidden bg-[#222]">
            <div
              className="h-full w-full bg-[#dc2626]"
              style={{
                animation: "scrollDown 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}
