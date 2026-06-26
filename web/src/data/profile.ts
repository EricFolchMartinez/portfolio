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
  headlineLines: ["Software", "Engineer"],
  intro:
    "Computer Engineering student at UAB. Passionate about building full-stack systems and developing useful AI tools, always looking for ways to integrate smart features into solid backends.",
  location: "Cerdanyola del Vallès, Barcelona",
  email: "eric.folch.2005@gmail.com",
  cvPath: "/cv.pdf",

  socials: [
    { label: "GitHub", href: "https://github.com/EricFolchMartinez" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/eric-folch/" },
  ],

  about: [
    "Computer Engineering student passionate about technological innovation. I define myself as a curious, self-taught, and adaptable person with a great ability to collaborate in a team. I enjoy designing and developing personal projects that require planning and creativity.",
    "My interest in 3D printing, nature, and sports provides me with a problem-solving mindset, allowing me to bring different approaches to the projects I participate in.",
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
      items: ["JavaScript", "Astro", "Tailwind CSS", "React Native", "HTML / CSS"],
    },
    {
      category: "Infra & Data",
      items: ["Docker", "PostgreSQL", "MongoDB", "Git / GitHub", "Cloudflare", "Linux"],
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
      stack: ["React Native", "FastAPI", "PostgreSQL", "Docker", "Python"],
      period: "2026",
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
      period: "2025",
      links: [
        { label: "Live demo", href: "https://pricetracker.ericfolch.com", kind: "primary" },
      ],
    },
    {
      slug: "ai-code-reviewer",
      name: "AI Code Reviewer",
      tagline: "Automated multi-language code review with Llama 3.",
      description:
        "A tool that reviews source code across multiple languages using Llama 3 through the Groq API, flagging security vulnerabilities and SOLID / Clean Code violations. Designed around fast inference and structured, actionable feedback.",
      stack: ["Python", "Llama 3", "Groq"],
      period: "2025",
      links: [
        { label: "Live demo", href: "https://reviewer.ericfolch.com", kind: "primary" },
      ],
    },
    {
      slug: "acorde",
      name: "Acorde",
      tagline: "Auto-generated guitar tablature.",
      description:
        "An app that draws guitar tablatures for songs automatically. Cross-platform mobile client built with Flutter/Dart, backed by a Python service for the tab-generation logic.",
      stack: ["Python", "Swift", "Dart", "Flutter"],
      period: "2026",
      links: [
        { label: "Repo", href: "https://github.com/EricFolchMartinez/Acorde", kind: "primary" },
      ],
    },
    {
      slug: "helicopter-game",
      name: "Helicopter Game",
      tagline: "Classic arcade helicopter clone.",
      description:
        "A recreation of the classic helicopter arcade game, focused on simple, responsive game-loop mechanics and collision handling.",
      stack: ["Python"],
      period: "2026",
      links: [
        { label: "Repo", href: "https://github.com/EricFolchMartinez/Helicopter-game", kind: "primary" },
      ],
    },
    {
      slug: "tetris",
      name: "Tetris",
      tagline: "Tetris built from scratch in C/C++.",
      description:
        "A from-scratch implementation of Tetris, covering grid logic, piece rotation and collision detection, line clearing, and scoring.",
      stack: ["C", "C++"],
      period: "2026",
      links: [
        { label: "Repo", href: "https://github.com/EricFolchMartinez/Tetris", kind: "primary" },
      ],
    },
  ],
};
