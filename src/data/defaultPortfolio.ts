import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  name: "Amy",
  headlineRole: "Full Stack Engineer & UI Architect",
  statusBadge: "Available for high-impact roles & projects",
  location: "San Francisco, CA • Open to Remote Worldwide",
  bio: "I design and build resilient digital products with architectural clarity and obsessive care for user experience. Specializing in modern web applications, scalable distributed backends, and accessible design systems.",
  aboutStory: "With 5+ years of software engineering experience, I bridge the gap between technical architecture and human-centered design. I have engineered real-time collaboration engines, data-intensive web applications, and component libraries adopted across multi-disciplinary engineering teams.",
  aboutPoints: [
    "5+ years crafting production-grade software for startups and scaling tech platforms.",
    "Passionate about zero-compromise web performance, strict accessibility (WCAG AA/AAA), and ergonomic developer tooling.",
    "Experienced in full product lifecycles: from system architecture blueprints to high-fidelity micro-interactions.",
    "Strong believer in clean code, predictable state management, and transparent team documentation."
  ],
  socials: {
    github: "https://github.com/amy-dev",
    linkedin: "https://linkedin.com/in/amy-engineer",
    twitter: "https://x.com/amy_builds",
    email: "amyyb871@gmail.com",
    website: "https://amy-portfolio.dev"
  },
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Production Apps Shipped", value: "28+" },
    { label: "Open Source Contributions", value: "150+" },
    { label: "Client & Team Satisfaction", value: "100%" }
  ],
  projects: [
    {
      id: "project-1",
      title: "Prism Studio",
      tagline: "Real-time collaborative vector canvas and interface prototyping engine",
      description: "A high-performance browser-based graphics editor built on WebGL and conflict-free replicated data types (CRDTs). Handles multi-cursor live editing with sub-15ms sync latency.",
      longDescription: "Engineered from scratch to support fluid 60fps canvas transformations on dense node graphs. Features custom WebGL shaders, spatial indexing via R-trees for instant hit testing, and a custom undo/redo tree system designed for multi-user collaboration.",
      category: "Full Stack",
      tags: ["React 19", "TypeScript", "WebGL", "CRDT", "WebSockets", "Node.js"],
      liveUrl: "https://prism-studio-demo.dev",
      githubUrl: "https://github.com/amy-dev/prism-studio",
      year: "2025",
      featured: true,
      role: "Lead Engineer & Architect",
      metrics: [
        { label: "FPS Stability", value: "60 FPS" },
        { label: "Sync Latency", value: "<15ms" },
        { label: "Active Nodes", value: "50k+" }
      ],
      keyFeatures: [
        "Sub-15ms collaborative cursor and state synchronization",
        "Spatial R-tree indexing for instantaneous canvas hit testing",
        "Infinite zoom and pan with GPU-accelerated coordinate transformations",
        "Custom SVG and multi-format vector export engine"
      ]
    },
    {
      id: "project-2",
      title: "Kite Telemetry & Analytics",
      tagline: "Privacy-first lightweight telemetry pipeline with zero third-party dependencies",
      description: "An open telemetry dashboard and client ingest SDK capable of analyzing 15M+ events monthly while strictly maintaining cookie-less GDPR and CCPA compliance.",
      longDescription: "Created to give software teams deep real-time insights into user journey bottlenecks, core web vitals, and uncaught exceptions without compromising client data privacy. Features an optimized analytical database engine and fast visualization widgets.",
      category: "Full Stack",
      tags: ["TypeScript", "Next.js", "PostgreSQL", "ClickHouse", "Tailwind CSS"],
      liveUrl: "https://kite-analytics-preview.dev",
      githubUrl: "https://github.com/amy-dev/kite-telemetry",
      year: "2024",
      featured: true,
      role: "Full Stack Developer",
      metrics: [
        { label: "Monthly Events", value: "15M+" },
        { label: "Client SDK Size", value: "1.4 kB" },
        { label: "Query P99", value: "45ms" }
      ],
      keyFeatures: [
        "Lightweight 1.4kB zero-dependency client telemetry snippet",
        "Automated Core Web Vitals (LCP, FID, CLS) tracking and alerts",
        "Interactive query builder with real-time funnel breakdowns",
        "Automated anonymization of sensitive client IP and PII parameters"
      ]
    },
    {
      id: "project-3",
      title: "Pulse UI Design System",
      tagline: "Accessible, zero-runtime React component library with mathematical typography",
      description: "A comprehensive UI kit containing 45+ primitives built on Radix primitives and Tailwind CSS, featuring automated contrast verification and complete keyboard navigation.",
      longDescription: "Adopted by 6 internal teams to unify product aesthetic across 12 services. Engineered automated accessibility regression tests that run in CI, catching contrast violations and aria discrepancies before release.",
      category: "UI Systems",
      tags: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Accessibility"],
      liveUrl: "https://pulse-ui-system.dev",
      githubUrl: "https://github.com/amy-dev/pulse-ui",
      year: "2024",
      featured: true,
      role: "Design System Lead",
      metrics: [
        { label: "WCAG Compliance", value: "AAA" },
        { label: "Components", value: "45+" },
        { label: "Coverage", value: "99.4%" }
      ],
      keyFeatures: [
        "Full keyboard navigation and screen-reader ARIA live regions",
        "Strict 8pt spatial grid with optical balance overrides",
        "Dynamic theme token system with instant dark/light token swaps",
        "Interactive Storybook documentation with live playground"
      ]
    },
    {
      id: "project-4",
      title: "FlowState Terminal Suite",
      tagline: "Developer productivity CLI for orchestrated local container environments",
      description: "A fast command-line tool written in Go/TypeScript that manages microservice stacks, local HTTPS certificates, and reverse proxy tunneling with zero configuration.",
      longDescription: "Solved local development friction across 80+ engineering teammates by reducing developer environment spin-up time from 45 minutes down to 30 seconds with automated health checking.",
      category: "Dev Tools",
      tags: ["TypeScript", "Node.js", "Docker", "CLI Tooling", "Bash"],
      liveUrl: "https://flowstate-cli.dev",
      githubUrl: "https://github.com/amy-dev/flowstate-suite",
      year: "2024",
      featured: false,
      role: "Creator & Maintainer",
      metrics: [
        { label: "Setup Time", value: "30s" },
        { label: "Active Devs", value: "1,200+" }
      ],
      keyFeatures: [
        "One-command environment spin-up with dependency topological sort",
        "Automated self-signed local SSL certificate generation",
        "Live aggregate log streaming with regex filtering and colored tags"
      ]
    },
    {
      id: "project-5",
      title: "Aura Cognitive Assistant",
      tagline: "Multi-agent asynchronous workspace for knowledge aggregation",
      description: "An intuitive desktop and web platform that analyzes technical documentation, generates verifiable code citations, and coordinates multi-step research tasks.",
      longDescription: "Built with a responsive streaming interface, markdown render engine with syntax highlighting, and an audit-trail sidebar that lets users review exact sources behind every model synthesis.",
      category: "Frontend",
      tags: ["React 19", "TypeScript", "Tailwind", "Streaming SSE", "Vite"],
      liveUrl: "https://aura-workspace.dev",
      githubUrl: "https://github.com/amy-dev/aura-workspace",
      year: "2025",
      featured: false,
      role: "Lead Frontend Engineer",
      metrics: [
        { label: "Response TTFT", value: "180ms" },
        { label: "Citation Accuracy", value: "98.2%" }
      ],
      keyFeatures: [
        "Real-time token streaming with resilient reconnect logic",
        "Interactive citation inspector with side-by-side source diffs",
        "Exportable markdown dossiers and structured code snippets"
      ]
    },
    {
      id: "project-6",
      title: "Hyperion Edge Dashboard",
      tagline: "High-density infrastructure monitoring with sub-10ms latency updates",
      description: "An enterprise telemetry monitoring console displaying real-time cluster health, resource saturation, and network routes across 40+ global cloud regions.",
      longDescription: "Designed for high-stress operational environments. Features custom canvas charts that easily render 100,000 data points without frame drops, and keyboard-first shortcut navigation.",
      category: "Frontend",
      tags: ["React", "TypeScript", "Canvas2D", "WebSockets", "CSS Grid"],
      liveUrl: "https://hyperion-telemetry.dev",
      githubUrl: "https://github.com/amy-dev/hyperion-dashboard",
      year: "2023",
      featured: false,
      role: "Frontend Architect",
      metrics: [
        { label: "Data Points", value: "100k+" },
        { label: "Global Regions", value: "40+" }
      ],
      keyFeatures: [
        "Hardware-accelerated time series rendering with automatic decimation",
        "Configurable multi-panel bento grid with persistent user layouts",
        "Audio and visual anomaly threshold warnings"
      ]
    }
  ],
  skills: [
    { name: "React & Next.js", category: "frontend", level: 96, experienceYears: "5 yrs", isFavorite: true },
    { name: "TypeScript", category: "frontend", level: 95, experienceYears: "5 yrs", isFavorite: true },
    { name: "Tailwind CSS", category: "frontend", level: 98, experienceYears: "4 yrs", isFavorite: true },
    { name: "HTML5 & Semantic Web", category: "frontend", level: 98, experienceYears: "5+ yrs" },
    { name: "WebGL & Canvas APIs", category: "frontend", level: 82, experienceYears: "2 yrs" },
    { name: "State Management (Zustand/XState)", category: "frontend", level: 90, experienceYears: "4 yrs" },

    { name: "Node.js & Express", category: "backend", level: 92, experienceYears: "4 yrs", isFavorite: true },
    { name: "PostgreSQL & SQL", category: "backend", level: 88, experienceYears: "4 yrs", isFavorite: true },
    { name: "REST & GraphQL APIs", category: "backend", level: 94, experienceYears: "4 yrs" },
    { name: "Redis & Caching Strategies", category: "backend", level: 84, experienceYears: "3 yrs" },
    { name: "Python / Data Scripts", category: "backend", level: 80, experienceYears: "3 yrs" },

    { name: "Docker & Containerization", category: "architecture", level: 88, experienceYears: "4 yrs", isFavorite: true },
    { name: "Cloud Infrastructure (GCP/AWS)", category: "architecture", level: 85, experienceYears: "3 yrs" },
    { name: "CI/CD & GitHub Actions", category: "architecture", level: 90, experienceYears: "4 yrs" },
    { name: "WebSockets & Event Streams", category: "architecture", level: 89, experienceYears: "3 yrs" },
    { name: "System Design & Architecture", category: "architecture", level: 91, experienceYears: "4 yrs", isFavorite: true },

    { name: "Figma & Prototyping", category: "design", level: 92, experienceYears: "5 yrs", isFavorite: true },
    { name: "Design Systems & Token Architecture", category: "design", level: 95, experienceYears: "4 yrs", isFavorite: true },
    { name: "Web Accessibility (WCAG AAA)", category: "design", level: 94, experienceYears: "4 yrs" },
    { name: "Micro-interactions & Motion Design", category: "design", level: 88, experienceYears: "3 yrs" }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Staff / Senior Frontend Engineer",
      company: "CloudScale Labs",
      companyUrl: "https://cloudscale-labs.dev",
      location: "San Francisco, CA (Hybrid)",
      period: "2023 — Present",
      current: true,
      description: "Spearheading the core frontend architecture and real-time visualization systems for distributed cloud infrastructure.",
      achievements: [
        "Architected modular micro-frontend shell reducing average page load times by 42% across 14 enterprise micro-apps.",
        "Built custom WebGL time-series visualizer handling 100,000+ streaming data points at a consistent 60 FPS.",
        "Mentored 6 junior and mid-level engineers, running weekly architecture reviews and accessibility workshops.",
        "Standardized company-wide design tokens and component testing suite, achieving 98% CI test coverage."
      ],
      skills: ["React", "TypeScript", "WebGL", "Performance Optimization", "Design Systems", "Tailwind"]
    },
    {
      id: "exp-2",
      role: "Full Stack Developer",
      company: "Nexus Interactive",
      companyUrl: "https://nexus-interactive.dev",
      location: "San Francisco, CA",
      period: "2021 — 2023",
      current: false,
      description: "Engineered scalable collaborative SaaS tools and multi-tenant backend services serving over 250,000 active users.",
      achievements: [
        "Developed collaborative document editing platform with real-time websocket synchronization and conflict resolution.",
        "Designed and implemented high-throughput REST and GraphQL APIs backed by PostgreSQL and Redis caching.",
        "Reduced database query bottlenecks by 65% through index restructuring and query optimization.",
        "Collaborated with product designers to implement pixel-perfect, fully accessible user interfaces."
      ],
      skills: ["TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Redis", "Docker", "React"]
    },
    {
      id: "exp-3",
      role: "Frontend Engineer & UI Specialist",
      company: "Horizon Studio",
      companyUrl: "https://horizon-studio.dev",
      location: "Oakland, CA",
      period: "2019 — 2021",
      current: false,
      description: "Designed and developed bespoke digital applications, high-converting product microsites, and interactive web tools.",
      achievements: [
        "Built responsive web applications for 15+ international client brands with 100/100 Google Lighthouse scores.",
        "Authored reusable animation and layout library that reduced prototype delivery cycles by 35%.",
        "Conducted usability testing sessions and translated qualitative research findings into validated UI enhancements."
      ],
      skills: ["JavaScript (ES6+)", "React", "CSS3 / SCSS", "Figma", "UI/UX Research", "Web Vitals"]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science & Human-Computer Interaction",
      institution: "University of California",
      location: "California, USA",
      period: "2015 — 2019",
      details: "Focus on Distributed Systems, Software Engineering, and User Interface Psychology. Dean's Honors List."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Marcus Vance",
      role: "VP of Engineering",
      company: "CloudScale Labs",
      content: "Amy is the rare engineer who commands deep distributed systems intuition while caring intensely about every visual pixel and user micro-interaction. Her contributions elevated our entire team's engineering velocity.",
      avatarText: "MV"
    },
    {
      id: "test-2",
      name: "Elena Rostova",
      role: "Lead Product Designer",
      company: "Nexus Interactive",
      content: "Working alongside Amy felt effortless. She intuitively understands design intent, asks incisive architectural questions early, and turns complex workflows into shockingly elegant, fast interfaces.",
      avatarText: "ER"
    },
    {
      id: "test-3",
      name: "David Chen",
      role: "Engineering Director",
      company: "Horizon Studio",
      content: "Amy consistently delivered robust, tested, and high-performance solutions ahead of schedule. Any team looking for a powerhouse full-stack engineer will be fortunate to have her.",
      avatarText: "DC"
    }
  ]
};
