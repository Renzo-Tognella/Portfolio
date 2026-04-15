"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Skills", href: "#skills" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 100 || y < lastY);
      setScrolled(y > 20);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className={`mx-4 mt-3 rounded-2xl transition-all duration-500 ${
          scrolled ? "glass border border-white/[0.04]" : "bg-transparent"
        }`}>
          <div className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => go("#inicio")} className="font-mono text-sm font-medium text-[#f5f5f7] tracking-tight">
              rz<span className="text-[#dc2626]">.</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => go(item.href)}
                  className="text-micro text-[#6e6e73] hover:text-[#f5f5f7] transition-colors duration-300 tracking-[0.1em]">
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden text-[#6e6e73] hover:text-[#f5f5f7] transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 md:hidden">
          {navItems.map((item) => (
            <button key={item.href} onClick={() => go(item.href)}
              className="text-2xl font-light text-[#f5f5f7] hover:text-[#dc2626] transition-colors duration-300">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
