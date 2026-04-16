// ═══════════════════════════════════════════════════
// Portfolio Data — Renzo Tognella de Rosa
// Design Spec v3.0
// ═══════════════════════════════════════════════════

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "engineering" | "research" | "creative";
  tags: string[];
  year: string;
  url?: string;
  github?: string;
  image?: string;
  featured: boolean;
}

export interface Skill {
  category: string;
  color: string;
  items: { name: string; level: number }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
  highlights: string[];
  type: "work" | "research" | "education";
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// ── Navigation ──
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// ── Hero Data ──
export const heroData = {
  greeting: "Hello, I'm",
  name: "Renzo Tognella",
  roles: [
    "Software Engineer",
    "Backend Architect",
    "ML Researcher",
    "Full-Stack Developer",
  ],
  tagline: "Building systems that think, scale, and endure.",
  cta: {
    primary: { label: "View Projects", href: "#projects" },
    secondary: { label: "Get in Touch", href: "#contact" },
  },
};

// ── About Data ──
export const aboutData = {
  paragraphs: [
    "I'm a software engineer from Curitiba, Brazil, with a passion for building robust backend systems and exploring the frontiers of machine learning and NLP.",
    "Currently at Tradener, I architect Rails-based financial platforms, and at Modulus Engenharia, I lead freelance full-stack projects for engineering clients.",
    "My research background at UTFPR in IEEE-branded NLP and GenAI projects shaped how I approach complex engineering problems — with rigor and curiosity.",
  ],
  stats: [
    { value: "4+", label: "Years Experience" },
    { value: "20+", label: "Projects Delivered" },
    { value: "5+", label: "Technologies Mastered" },
    { value: "3", label: "Research Papers" },
  ],
  location: "Curitiba, PR — Brazil",
  available: true,
};

// ── Projects ──
export const projects: Project[] = [
  {
    id: "tradener-platform",
    title: "Tradener Platform",
    subtitle: "Financial Energy Trading System",
    description:
      "Architected high-throughput backend for energy trading operations using Ruby on Rails. Designed RESTful APIs serving real-time market data with sub-200ms response times.",
    category: "engineering",
    tags: ["Ruby on Rails", "PostgreSQL", "Redis", "REST API"],
    year: "2024",
    url: "https://tradener.com",
    featured: true,
  },
  {
    id: "nlp-research",
    title: "NLP Sentiment Analysis",
    subtitle: "IEEE Research — UTFPR",
    description:
      "Developed a sentiment analysis pipeline for Brazilian Portuguese using TensorFlow and custom NLP models. Published in IEEE conference proceedings.",
    category: "research",
    tags: ["Python", "TensorFlow", "NLP", "GenAI"],
    year: "2023",
    featured: true,
  },
  {
    id: "modulus-engenharia",
    title: "Modulus Engenharia",
    subtitle: "Freelance Engineering Platform",
    description:
      "Full-stack platform for engineering project management, client portal, and document automation. Built with Next.js and Rails API.",
    category: "engineering",
    tags: ["Next.js", "Ruby on Rails", "TypeScript", "Tailwind"],
    year: "2024",
    featured: true,
  },
  {
    id: "portfolio-v3",
    title: "This Portfolio",
    subtitle: "Cinematic Dark Engineering",
    description:
      "Awwwards-inspired portfolio with GSAP animations, Lenis smooth scroll, and cinematic reveal patterns. Built with Next.js 16 and Tailwind 4.",
    category: "creative",
    tags: ["Next.js", "GSAP", "Tailwind", "Framer Motion"],
    year: "2025",
    github: "https://github.com/Renzo-Tognella/Portfolio",
    featured: true,
  },
  {
    id: "genai-chatbot",
    title: "GenAI Assistant",
    subtitle: "LLM-Powered Chat System",
    description:
      "Built an intelligent chatbot leveraging OpenAI APIs and RAG architecture for context-aware responses. Integrated with existing business systems.",
    category: "research",
    tags: ["Python", "LangChain", "OpenAI", "RAG"],
    year: "2024",
    featured: false,
  },
  {
    id: "ios-app",
    title: "iOS Utility App",
    subtitle: "Native Swift Application",
    description:
      "Designed and developed a native iOS application with Swift and SwiftUI, featuring clean architecture and smooth animations.",
    category: "creative",
    tags: ["Swift", "SwiftUI", "iOS", "Xcode"],
    year: "2023",
    featured: false,
  },
];

// ── Freelance / Modulus ──
export const freelanceData = {
  company: "Modulus Engenharia",
  role: "Lead Developer & Technical Partner",
  description:
    "Freelance full-stack development for engineering and industrial clients. Specializing in custom web platforms, automation systems, and data dashboards.",
  services: [
    "Full-Stack Web Applications",
    "API Design & Integration",
    "Data Dashboards & Visualization",
    "Engineering Process Automation",
  ],
  url: "https://modulus.eng.br",
};

// ── Skills ──
export const skills: Skill[] = [
  {
    category: "Backend",
    color: "#dc2626",
    items: [
      { name: "Ruby on Rails", level: 95 },
      { name: "Python", level: 90 },
      { name: "REST API Design", level: 92 },
      { name: "PostgreSQL", level: 88 },
      { name: "Redis", level: 85 },
    ],
  },
  {
    category: "Frontend",
    color: "#8b5cf6",
    items: [
      { name: "TypeScript", level: 88 },
      { name: "React / Next.js", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "GSAP", level: 80 },
      { name: "HTML / CSS", level: 95 },
    ],
  },
  {
    category: "ML / AI",
    color: "#3b82f6",
    items: [
      { name: "TensorFlow", level: 82 },
      { name: "NLP / GenAI", level: 85 },
      { name: "LangChain", level: 78 },
      { name: "Data Science", level: 80 },
    ],
  },
  {
    category: "Mobile & Systems",
    color: "#f59e0b",
    items: [
      { name: "Swift / iOS", level: 75 },
      { name: "C / C++", level: 78 },
      { name: "Git / CI-CD", level: 90 },
      { name: "Docker", level: 82 },
    ],
  },
];

// ── Experience ──
export const experiences: Experience[] = [
  {
    id: "tradener",
    role: "Software Engineer",
    company: "Tradener",
    companyUrl: "https://tradener.com",
    period: "2023 — Present",
    description:
      "Backend development of energy trading platform. Architecting Rails monolith and microservices for real-time market operations.",
    highlights: [
      "Architected high-throughput Rails API serving 50k+ daily requests",
      "Designed real-time data pipeline with Redis pub/sub",
      "Implemented automated testing achieving 95% coverage",
    ],
    type: "work",
  },
  {
    id: "modulus",
    role: "Lead Developer",
    company: "Modulus Engenharia",
    period: "2023 — Present",
    description:
      "Freelance full-stack development for engineering clients. Building custom web platforms and automation tools.",
    highlights: [
      "Delivered 10+ client projects on time and within budget",
      "Built custom CMS with document automation",
      "Integrated payment and invoicing systems",
    ],
    type: "work",
  },
  {
    id: "utfpr-research",
    role: "IEEE Researcher — NLP & GenAI",
    company: "UTFPR",
    period: "2022 — 2023",
    description:
      "Research in Natural Language Processing and Generative AI. Published work in IEEE conference proceedings on sentiment analysis for Brazilian Portuguese.",
    highlights: [
      "Published paper in IEEE conference proceedings",
      "Developed custom NLP model for PT-BR sentiment analysis",
      "Built training pipeline with TensorFlow achieving 91% accuracy",
    ],
    type: "research",
  },
  {
    id: "utfpr-degree",
    role: "B.Sc. Computer Engineering",
    company: "UTFPR — Universidade Tecnológica Federal do Paraná",
    period: "2019 — 2023",
    description:
      "Computer Engineering degree with focus on software systems, machine learning, and NLP research.",
    highlights: [
      "IEEE research track in NLP & GenAI",
      "Capstone: AI-powered document classification system",
    ],
    type: "education",
  },
];

// ── Social Links ──
export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/Renzo-Tognella",
    icon: "github",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/renzo-tognella-25215024",
    icon: "linkedin",
  },
  {
    platform: "Email",
    url: "mailto:renzo@example.com",
    icon: "mail",
  },
];

// ── Contact ──
export const contactData = {
  heading: "Let's Build Something",
  subheading: "Available for full-time roles and select freelance projects.",
  email: "renzo@example.com",
  cta: "Send a Message",
};
