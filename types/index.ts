export interface Project {
  id: string; title: string; description: string; image: string; tags: string[];
  category: "backend" | "frontend" | "ai-ml" | "mobile" | "academic";
  github?: string; gitlab?: string; live?: string; featured: boolean; year: number; impact?: string;
}
export interface Skill { name: string; icon: string; category: string; level: number; }
export interface Experience {
  id: string; role: string; company: string; description: string[]; period: string;
  current: boolean; tags: string[]; badge: { text: string; color: string };
}
export interface SocialLink { name: string; url: string; icon: string; }
