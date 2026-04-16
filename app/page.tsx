"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/navbar";
import LoadingScreen from "@/components/ui/loading-screen";
import SmoothScroll from "@/components/ui/smooth-scroll";

const Hero = dynamic(() => import("@/components/sections/hero"), { ssr: false });
const About = dynamic(() => import("@/components/sections/about"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/projects"), { ssr: false });
const Freelance = dynamic(() => import("@/components/sections/freelance"), { ssr: false });
const Skills = dynamic(() => import("@/components/sections/skills"), { ssr: false });
const Experience = dynamic(() => import("@/components/sections/experience"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/contact"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll ready={!isLoading}>
      {/* Grain overlay — only visible on md+ for performance */}
      <div className="grain-overlay hidden md:block" />

      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Freelance />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
