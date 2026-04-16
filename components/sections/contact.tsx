"use client";

import { useRef, useEffect, useState } from "react";
import { contactData, socialLinks } from "@/lib/data";
import { Send } from "lucide-react";

function SocialIcon({ platform, size = 18 }: { platform: string; size?: number }) {
  const props = { width: size, height: size, fill: "currentColor", viewBox: "0 0 24 24" };
  switch (platform) {
    case "github":
      return <svg {...props}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>;
    case "linkedin":
      return <svg {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    case "mail":
      return <svg {...props}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

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
      gsap.fromTo(".contact-heading", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } });
      gsap.fromTo(".contact-form", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 65%" } });
    };
    initGSAP();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${contactData.email}?subject=Portfolio Contact from ${formState.name}&body=${formState.message}%0A%0AFrom: ${formState.name} (${formState.email})`;
    window.open(mailtoLink);
  };

  return (
    <section ref={sectionRef} id="contact" className="section-void relative py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="container-section">
        <div className="section-label">Contact</div>
        <div className="contact-heading text-center">
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">{contactData.heading}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#666] sm:mt-4 sm:text-base">{contactData.subheading}</p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form mx-auto mt-10 max-w-2xl space-y-5 sm:mt-14 md:mt-16">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.1em] uppercase text-[#666] sm:text-[11px]">Name</label>
              <input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} required className="w-full border-b border-[#222] bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-[#333] focus:border-[#dc2626] sm:text-base" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.1em] uppercase text-[#666] sm:text-[11px]">Email</label>
              <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} required className="w-full border-b border-[#222] bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-[#333] focus:border-[#dc2626] sm:text-base" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] tracking-[0.1em] uppercase text-[#666] sm:text-[11px]">Message</label>
            <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} required rows={5} className="w-full resize-none border-b border-[#222] bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-[#333] focus:border-[#dc2626] sm:text-base" placeholder="Tell me about your project..." />
          </div>
          <div className="flex flex-col items-center gap-6 pt-2 sm:flex-row sm:justify-between">
            <button type="submit" className="magnetic-btn w-full sm:w-auto"><Send size={14} />{contactData.cta}</button>
            <div className="flex items-center gap-5">
              {socialLinks.map((link) => (
                <a key={link.platform} href={link.url} target={link.url.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[#444] transition-colors hover:text-white" aria-label={link.platform}>
                  <SocialIcon platform={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </form>
        <div className="mt-20 border-t border-[#1a1a1a] pt-6 text-center sm:mt-28 md:mt-32">
          <p className="font-mono text-[10px] tracking-[0.08em] text-[#333] sm:text-[11px]">&copy; {new Date().getFullYear()} Renzo Tognella de Rosa. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
