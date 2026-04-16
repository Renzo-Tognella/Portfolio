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
