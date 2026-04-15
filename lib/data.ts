import { Project, Skill, Experience, SocialLink } from "@/types";

export const projects: Project[] = [
  { id: "sos-bsi-students", title: "SOS BSI Students", description: "Plataforma academica com IA para planejamento de grade e leitura de historico escolar.", image: "/images/projects/sos-bsi.webp", tags: ["Next.js 15", "React 19", "LLMs", "TypeScript", "Vercel"], category: "frontend", github: "https://github.com/Renzo-Tognella/SOS_BSI_Students", live: "https://sos-bsi-students.vercel.app", featured: true, year: 2025, impact: "Live na Vercel" },
  { id: "codexcount", title: "CodexCount", description: "macOS menu bar widget que rastreia consumo de tokens do Codex CLI em tempo real.", image: "/images/projects/codexcount.webp", tags: ["Swift 5.9", "macOS 13+", "Menu Bar"], category: "mobile", github: "https://github.com/Renzo-Tognella/CodexCount", featured: true, year: 2025, impact: "App nativo macOS" },
  { id: "pln-musical-analysis", title: "PLN Musical Analysis", description: "Analise de 6.292 musicas (1959-2023): sentimentos, topicos e complexidade com NLP e ML.", image: "/images/projects/pln.webp", tags: ["Python", "NLTK", "BERTopic", "Scikit-learn", "NLP"], category: "ai-ml", gitlab: "https://gitlab.com/Renzo-Tognella/pln", featured: true, year: 2024, impact: "6.292 musicas analisadas" },
  { id: "triage-vital-ml", title: "TriageWithVitalML", description: "Classificacao de sinais vitais usando Machine Learning com Decision Trees, Random Forest e MLP.", image: "/images/projects/triage.webp", tags: ["Python", "Scikit-learn", "Random Forest", "MLP"], category: "ai-ml", github: "https://github.com/Renzo-Tognella/TriageWithVitalML", featured: true, year: 2024 },
  { id: "text-to-sql", title: "Text2SQL", description: "Converte linguagem natural em consultas SQL usando Google Gemini AI.", image: "/images/projects/text-to-sql.webp", tags: ["Python", "Gemini AI", "PostgreSQL", "PyQt5"], category: "ai-ml", github: "https://github.com/Renzo-Tognella/Text_to_SQL", featured: true, year: 2024, impact: "NL -> SQL automatico" },
  { id: "reconhecimento-alimentos", title: "Reconhecimento de Alimentos", description: "Sistema de reconhecimento de alimentos com CNN e segmentacao de imagens.", image: "/images/projects/alimentos.webp", tags: ["Python", "TensorFlow", "CNN", "Computer Vision"], category: "ai-ml", github: "https://github.com/Renzo-Tognella/reconhecimento_alimentos", featured: true, year: 2024 },
];

export const skills: Skill[] = [
  { name: "Ruby on Rails", icon: "server", category: "backend", level: 90 },
  { name: "Python", icon: "terminal", category: "backend", level: 85 },
  { name: "REST APIs", icon: "plug", category: "backend", level: 90 },
  { name: "RSpec / TDD", icon: "check-circle", category: "backend", level: 85 },
  { name: "Sidekiq", icon: "clock", category: "backend", level: 80 },
  { name: "React", icon: "layout", category: "frontend", level: 75 },
  { name: "Next.js", icon: "globe", category: "frontend", level: 70 },
  { name: "TypeScript", icon: "file-code", category: "frontend", level: 75 },
  { name: "Tailwind CSS", icon: "paintbrush", category: "frontend", level: 80 },
  { name: "Machine Learning", icon: "brain", category: "ai-ml", level: 75 },
  { name: "NLP / PLN", icon: "message-square", category: "ai-ml", level: 80 },
  { name: "LLMs / GenAI", icon: "sparkles", category: "ai-ml", level: 80 },
  { name: "TensorFlow", icon: "cpu", category: "ai-ml", level: 70 },
  { name: "BERTopic", icon: "layers", category: "ai-ml", level: 75 },
  { name: "Computer Vision", icon: "eye", category: "ai-ml", level: 70 },
  { name: "PostgreSQL", icon: "database", category: "database", level: 85 },
  { name: "Redis", icon: "zap", category: "database", level: 75 },
  { name: "MySQL", icon: "database", category: "database", level: 80 },
  { name: "Docker", icon: "container", category: "devops", level: 80 },
  { name: "Git / GitHub", icon: "git-branch", category: "devops", level: 90 },
  { name: "AWS", icon: "cloud", category: "devops", level: 65 },
  { name: "CI/CD", icon: "refresh-cw", category: "devops", level: 75 },
  { name: "Clean Code / SOLID", icon: "code", category: "engineering", level: 85 },
  { name: "Design Patterns", icon: "puzzle", category: "engineering", level: 80 },
  { name: "Scrum / Kanban", icon: "users", category: "engineering", level: 80 },
];

export const experiences: Experience[] = [
  { id: "tradener", role: "Engenheiro de Software Backend", company: "Tradener", description: ["Reduzi 99.7% do esforco operacional de cobranca: sistema de multas e juros integrado ao ERP Protheus (30h -> 5min)", "Sistema multiagente com GenAI integrado ao Slack via MCP - 95% reducao de latencia na comunicacao", "APIs para faturamento, rating, credito e exposicao ao PLD com foco em performance e auditabilidade", "Lead Interino por 3 meses - code reviews, investigacao de incidentes, evolucao tecnica do time", "Integracoes entre Salesforce, Protheus e sistemas internos corporativos"], period: "Mai 2024 - Atual", current: true, tags: ["Ruby on Rails", "PostgreSQL", "Redis", "Salesforce", "Protheus", "GenAI", "MCP"], badge: { text: "ATUAL", color: "#22c55e" } },
  { id: "modulus", role: "Desenvolvedor Full Stack", company: "Modulus Engenharia", description: ["SaaS para centralizacao de propostas - 10 usuarios, ~50 propostas/dia", "Pipeline com LLMs para extracao de dados de emails com validacao human-in-the-loop", "83% reducao na geracao de relatorios tecnicos (1h -> 10min)", "Camada de analytics: conversao, rentabilidade, churn e rastreamento operacional"], period: "Jan 2023 - Atual", current: true, tags: ["Rails", "Python", "LLMs", "PostgreSQL", "Analytics"], badge: { text: "FREELANCE", color: "#f97316" } },
  { id: "utfpr-pesquisa", role: "Pesquisador em Eng. Software e IA", company: "UTFPR", description: ["Algoritmos em C++ para estimacao de centro 3D com Kinect (RGB-D)", "Integracao YOLOv3 + ROS para visao em nuvens de pontos", "Coautor de artigo publicado no IEEE LARS/SBR 2023", "Pesquisa em NLP: analise de sentimentos, topicos, embeddings"], period: "Jan 2023 - Dez 2023", current: false, tags: ["C++", "Python", "YOLOv3", "ROS", "NLP", "IEEE"], badge: { text: "PESQUISA", color: "#a855f7" } },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/Renzo-Tognella", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/renzo-tognella-25215024", icon: "linkedin" },
  { name: "GitLab", url: "https://gitlab.com/Renzo-Tognella", icon: "gitlab" },
];

export const aboutMe = { name: "Renzo Tognella", fullName: "Renzo Tognella de Rosa", title: "Engenheiro de Software", subtitle: "Backend · AI/ML · Sistemas Criticos", bio1: "Engenheiro de software com 3+ anos de experiencia em backend e sistemas criticos. Transformo regras complexas de negocio em solucoes confiaveis e escalaveis.", bio2: "Reduzi processos de 30 horas para 5 minutos, integrei IA generativa a fluxos corporativos e coautorei pesquisa em visao computacional publicada no IEEE. Sempre buscando o proximo desafio.", location: "Curitiba, PR · Brasil", email: "renzoderosa.tognella@gmail.com" };

export const techMarquee = ["RUBY ON RAILS", "PYTHON", "POSTGRESQL", "REDIS", "DOCKER", "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "SWIFT", "C++", "TENSORFLOW", "SCIKIT-LEARN", "BERTOPIC", "NLP", "LLMs", "GEMINI", "SIDEKIQ", "AWS", "CI/CD", "RSpec", "SOLID"];
