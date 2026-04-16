"use client";

import { useRef, useEffect, useState } from "react";
import { contactData, socialLinks } from "@/lib/data";
import { Send, Github, Linkedin, Mail } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  mail: <Mail size={18} />,
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        ".contact-heading",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" } }
      );

      gsap.fromTo(
        ".contact-form",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 65%" } }
      );
    };

    initGSAP();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${contactData.email}?subject=Portfolio Contact from ${formState.name}&body=${formState.message}%0A%0AFrom: ${formState.name} (${formState.email})`;
    window.open(mailtoLink);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-void relative py-16 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="container-section">
        <div className="section-label">Contact</div>

        {/* Heading */}
        <div className="contact-heading text-center">
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {contactData.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#666] sm:mt-4 sm:text-base">
            {contactData.subheading}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="contact-form mx-auto mt-10 max-w-2xl space-y-5 sm:mt-14 md:mt-16">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.1em] uppercase text-[#666] sm:text-[11px]">
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
                className="w-full border-b border-[#222] bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-[#333] focus:border-[#dc2626] sm:text-base"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.1em] uppercase text-[#666] sm:text-[11px]">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
                className="w-full border-b border-[#222] bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-[#333] focus:border-[#dc2626] sm:text-base"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-[10px] tracking-[0.1em] uppercase text-[#666] sm:text-[11px]">
              Message
            </label>
            <textarea
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              required
              rows={5}
              className="w-full resize-none border-b border-[#222] bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-[#333] focus:border-[#dc2626] sm:text-base"
              placeholder="Tell me about your project..."
            />
          </div>

          <div className="flex flex-col items-center gap-6 pt-2 sm:flex-row sm:justify-between">
            <button type="submit" className="magnetic-btn w-full sm:w-auto">
              <Send size={14} />
              {contactData.cta}
            </button>

            {/* Social links */}
            <div className="flex items-center gap-5">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[#444] transition-colors hover:text-white"
                  aria-label={link.platform}
                >
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-20 border-t border-[#1a1a1a] pt-6 text-center sm:mt-28 md:mt-32">
          <p className="font-mono text-[10px] tracking-[0.08em] text-[#333] sm:text-[11px]">
            &copy; {new Date().getFullYear()} Renzo Tognella de Rosa. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
