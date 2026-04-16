"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 2400);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = navLinks.map((link) =>
        document.querySelector(link.href)
      );
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && (section as HTMLElement).offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${isScrolled ? "glass" : "bg-transparent"}`}
      >
        <div className="container-section">
          <div className="flex h-14 items-center justify-between sm:h-16">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center font-mono text-sm tracking-widest text-white transition-colors hover:text-[#dc2626] min-h-[44px]"
            >
              RENZO<span className="text-[#dc2626]">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-6 lg:gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 min-h-[44px] flex items-center ${
                    activeSection === link.href
                      ? "text-white"
                      : "text-[#666] hover:text-white"
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <span className="absolute bottom-0 left-0 h-px w-full bg-[#dc2626]" />
                  )}
                </a>
              ))}
            </div>

            {/* Status indicator — desktop */}
            <div className="hidden items-center gap-2 md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="font-mono text-[11px] text-[#666]">
                Available for work
              </span>
            </div>

            {/* Mobile menu toggle — 44px touch target */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`h-px w-6 bg-white transition-all duration-300 ${
                    isMobileOpen ? "translate-y-[4px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-6 bg-white transition-all duration-300 ${
                    isMobileOpen ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — full screen overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href);
            }}
            className="flex min-h-[48px] items-center font-mono text-xl tracking-[0.15em] uppercase text-[#a3a3a3] transition-colors hover:text-white"
            style={{
              transitionDelay: isMobileOpen ? i * 50 + "ms" : "0ms",
              transform: isMobileOpen ? "translateY(0)" : "translateY(16px)",
              opacity: isMobileOpen ? 1 : 0,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
