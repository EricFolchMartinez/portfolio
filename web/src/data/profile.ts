// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Add a project = add one object to `projects`. The UI scales automatically.
// ─────────────────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  /** "primary" renders as a filled button, "secondary" as a quiet link. */
  kind?: "primary" | "secondary";
}

export interface Project {
  /** Stable id, also usable as anchor / key. */
  slug: string;
  name: string;
  /** One-line hook shown under the title. */
  tagline: string;
  /** 2–3 sentences. What it does + what makes it interesting technically. */
  description: string;
  /** Technologies. Drives the chips on the card and future tag filtering. */
  stack: string[];
  /** Live demo / repo / API links. Optional ones are simply omitted. */
  links: ProjectLink[];
  /** Pin to the top + visually highlighted. Optional. */
  featured?: boolean;
  /** Year or range, e.g. "2025". Shown subtly on the card. */
  period?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  /** Short role line for the hero. */
  role: string;
  /** Punchy hero headline (used for <title> / meta). */
  headline: string;
  /** Two-tone poster headline: [0] solid, [1] ghost/recessed. */
  headlineLines: [string, string];
  /** Hero sub-headline, 1–2 sentences. */
  intro: string;
  location: string;
  email: string;
  /** Path inside /public to the downloadable CV. */
  cvPath: string;
  socials: SocialLink[];
  about: string[];
  languages: { name: string; level: string }[];
  skills: SkillGroup[];
  projects: Project[];
}

export const profile: Profile = {
  name: "Èric Folch",
  role: "Backend & AI-applied engineer",
  headline: "Backend & AI-applied engineer.",
  headlineLines: ["Backend & AI", "Engineer"],
  intro:
    "Computer Engineering student at the UAB. I build full-stack systems and ship AI where it actually adds value — from cryptographic evidence certification to LLM-powered tooling.",
  location: "Cerdanyola del Vallès, Barcelona",
  email: "eric.folch.2005@gmail.com",
  cvPath: "/cv.pdf",

  socials: [
    { label: "GitHub", href: "https://github.com/EricFolchMartinez" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/eric-folch/" },
  ],

  about: [
    "I'm a third-year Computer Engineering student at the Universitat Autònoma de Barcelona, focused on backend development, full-stack delivery and applied AI.",
    "I like building things end to end: designing the API, containerizing the services, and self-hosting them on my own homelab behind a Cloudflare Tunnel. I care about clean architecture, security, and shipping software that solves a real problem — not demos.",
  ],

  languages: [
    { name: "Catalan", level: "Native" },
    { name: "Spanish", level: "Native" },
    { name: "English", level: "C1" },
    { name: "German", level: "Elementary" },
  ],

  // Grouped for the Skills section. Order = display order.
  skills: [
    {
      category: "Backend",
      items: ["Python", "FastAPI", "Java", "C / C++", "PHP", "REST APIs"],
    },
    {
      category: "Frontend",
      items: ["TypeScript", "JavaScript", "Astro", "Tailwind CSS", "React Native (Expo)", "HTML / CSS"],
    },
    {
      category: "Infra & Data",
      items: ["Docker", "PostgreSQL", "MongoDB", "Git / GitHub", "Cloudflare", "Linux"],
    },
    {
      category: "AI",
      items: ["OpenAI API", "LLM integration", "RAG", "Prompt engineering", "Groq / Llama 3"],
    },
  ],

  // Add new projects here. `featured: true` pins + highlights.
  projects: [
    {
      slug: "certishot",
      name: "CertiShot",
      tagline: "Cryptographically certified photo evidence.",
      description:
        "Full-stack app that certifies photographic evidence with RSA digital signatures, issues PDF certificates with a QR for public verification, and auto-generates descriptions via the OpenAI API. Mobile app, REST backend and a public validator, all self-hosted in Docker.",
      stack: ["React Native (Expo)", "FastAPI", "PostgreSQL", "Docker", "OpenAI API", "RSA"],
      period: "2025",
      featured: true,
      links: [
        { label: "Live demo", href: "https://certishot.ericfolch.com", kind: "primary" },
        { label: "Validator", href: "https://validator.ericfolch.com", kind: "secondary" },
      ],
    },
    {
      slug: "price-tracker",
      name: "Price Tracker",
      tagline: "Modular e-commerce price monitoring.",
      description:
        "A modular system that monitors product prices on e-commerce sites (Amazon) and exposes them through a REST API. Built with a clean service-oriented layout and deployed via Docker, with a Streamlit dashboard for quick inspection.",
      stack: ["Python", "FastAPI", "SQLAlchemy", "Streamlit", "Docker"],
      period: "2024",
      links: [],
    },
    {
      slug: "ai-code-reviewer",
      name: "AI Code Reviewer",
      tagline: "Automated multi-language code review with Llama 3.",
      description:
        "A tool that reviews source code across multiple languages using Llama 3 through the Groq API, flagging security vulnerabilities and SOLID / Clean Code violations. Designed around fast inference and structured, actionable feedback.",
      stack: ["Python", "Llama 3", "Groq API"],
      period: "2024",
      links: [],
    },
  ],
};
