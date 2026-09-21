export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email: string;
  website?: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: 'Full Stack' | 'Frontend' | 'UI Systems' | 'Dev Tools';
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  featured: boolean;
  metrics?: Metric[];
  keyFeatures?: string[];
  role?: string;
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'architecture' | 'design';
  level: number; // 1 - 100
  experienceYears?: string;
  isFavorite?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarText: string;
}

export interface PortfolioData {
  name: string;
  headlineRole: string;
  statusBadge: string;
  location: string;
  bio: string;
  aboutStory: string;
  aboutPoints: string[];
  socials: SocialLinks;
  stats: Metric[];
  projects: ProjectItem[];
  skills: SkillItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  testimonials: TestimonialItem[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
