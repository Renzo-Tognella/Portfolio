"use client";

import { useEffect, useRef, useState } from "react";
import { heroData } from "@/lib/data";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = heroData.roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 60);
      } else {
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

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({ delay: 3.8 });
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
          section.querySelector(".hero-scroll"),
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
      className="section-void relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(220, 38, 38, 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Decorative grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-section relative z-10 py-24 text-center sm:py-32">
        {/* Greeting */}
        <p className="hero-greeting font-mono text-[11px] tracking-[0.25em] uppercase text-[#666] sm:text-xs">
          {heroData.greeting}
        </p>

        {/* Name — Apple-style display type */}
        <h1
          className="hero-name mt-4 text-[clamp(2.5rem,8vw,7rem)] font-light leading-[1.05] tracking-[-0.02em] text-white sm:mt-6"
        >
          {heroData.name.split(" ")[0]}
          <br />
          <span className="text-gradient-cinematic">
            {heroData.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Typewriter role */}
        <div className="hero-role mt-6 flex items-center justify-center gap-3 sm:mt-8">
          <span className="hidden h-px w-6 bg-[#dc2626] sm:block" />
          <span className="font-mono text-sm tracking-wide text-[#a3a3a3] sm:text-base">
            {displayText}
            <span className="animate-pulse text-[#dc2626]">|</span>
          </span>
          <span className="hidden h-px w-6 bg-[#dc2626] sm:block" />
        </div>

        {/* Tagline */}
        <p className="hero-tagline mt-4 text-sm leading-relaxed text-[#666] sm:mt-5 sm:text-base">
          {heroData.tagline}
        </p>

        {/* CTAs */}
        <div className="hero-cta mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:justify-center">
          <a href={heroData.cta.primary.href} className="magnetic-btn">
            {heroData.cta.primary.label}
          </a>
          <a
            href={heroData.cta.secondary.href}
            className="flex min-h-[44px] items-center font-mono text-xs tracking-[0.1em] uppercase text-[#666] transition-colors hover:text-white sm:text-sm"
          >
            {heroData.cta.secondary.label} &rarr;
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#444]">
            Scroll
          </span>
          <div className="h-10 w-px overflow-hidden bg-[#222]">
            <div
              className="h-full w-full bg-[#dc2626]"
              style={{ animation: "scrollDown 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
