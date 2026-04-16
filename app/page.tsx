"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/navbar";
import LoadingScreen from "@/components/ui/loading-screen";

// Dynamic imports for code splitting
const Hero = dynamic(() => import("@/components/sections/hero"));
const About = dynamic(() => import("@/components/sections/about"));
const Projects = dynamic(() => import("@/components/sections/projects"));
const Freelance = dynamic(() => import("@/components/sections/freelance"));
const Skills = dynamic(() => import("@/components/sections/skills"));
const Experience = dynamic(() => import("@/components/sections/experience"));
const Contact = dynamic(() => import("@/components/sections/contact"));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" />

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
    </>
  );
}
