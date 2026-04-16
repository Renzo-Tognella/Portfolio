"use client";

import { useRef, useEffect, useState } from "react";
import { contactData, socialLinks } from "@/lib/data";
import { Send, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  mail: <Mail size={18} />,
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

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
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        }
      );
    };

    initGSAP();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    const mailtoLink = `mailto:${contactData.email}?subject=Portfolio Contact from ${formState.name}&body=${formState.message}%0A%0AFrom: ${formState.name} (${formState.email})`;
    window.open(mailtoLink);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-void relative px-6 py-[120px] md:py-[160px]"
    >
      <div className="mx-auto max-w-4xl">
        <div className="section-label">Contact</div>

        {/* Heading */}
        <div className="contact-heading text-center">
          <h2 className="text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
            {contactData.heading}
          </h2>
          <p className="mt-4 text-base text-[#666] md:text-lg">
            {contactData.subheading}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="contact-form mt-16 space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs tracking-wider uppercase text-[#666]">
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                required
                className="w-full border-b border-[#222] bg-transparent py-3 text-white outline-none transition-colors focus:border-[#dc2626]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs tracking-wider uppercase text-[#666]">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                required
                className="w-full border-b border-[#222] bg-transparent py-3 text-white outline-none transition-colors focus:border-[#dc2626]"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs tracking-wider uppercase text-[#666]">
              Message
            </label>
            <textarea
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              required
              rows={5}
              className="w-full resize-none border-b border-[#222] bg-transparent py-3 text-white outline-none transition-colors focus:border-[#dc2626]"
              placeholder="Tell me about your project..."
            />
          </div>

          <div className="flex flex-col items-center gap-8 pt-4 md:flex-row md:justify-between">
            <button type="submit" className="magnetic-btn gap-2">
              <Send size={14} />
              {contactData.cta}
            </button>

            {/* Social links */}
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="text-[#444] transition-colors hover:text-white"
                  aria-label={link.platform}
                >
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-32 border-t border-[#1a1a1a] pt-8 text-center">
          <p className="font-mono text-xs tracking-wider text-[#333]">
            &copy; {new Date().getFullYear()} Renzo Tognella de Rosa. All rights
            reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
