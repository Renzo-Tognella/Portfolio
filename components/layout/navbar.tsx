"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Show navbar after loading screen completes (3.5s)
    const showTimer = setTimeout(() => setIsVisible(true), 3600);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Active section detection
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

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} ${isScrolled ? "glass" : "bg-transparent"}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-mono text-sm tracking-widest text-white transition-colors hover:text-[#dc2626]"
          >
            RENZO<span className="text-[#dc2626]">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${
                  activeSection === link.href
                    ? "text-white"
                    : "text-[#666] hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span
                    className="absolute -bottom-1 left-0 h-[1px] w-full bg-[#dc2626]"
                    style={{
                      animation: "fadeIn 0.3s ease forwards",
                    }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Status indicator */}
          <div className="hidden items-center gap-2 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="font-mono text-xs text-[#666]">
              Available for work
            </span>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-[1px] w-6 bg-white transition-all duration-300 ${
                isMobileOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1px] w-6 bg-white transition-all duration-300 ${
                isMobileOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href);
            }}
            className="font-mono text-2xl tracking-widest uppercase text-[#666] transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
