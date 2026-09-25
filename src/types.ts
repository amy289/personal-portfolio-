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
  category: string;
  tags: string[];
  statusNote?: string;
  year: string;
  featured: boolean;
  keyFeatures?: string[];
  technologiesUsed?: string[];
}

export interface SkillItem {
  name: string;
  category: 'Web Development' | 'Programming Languages' | 'AI & Emerging Tech' | 'Security & Tools';
  level: number; // 1 - 100
  statusTag?: string; // e.g. "Core", "Basic", "Currently Learning", "Hands-on"
  isCore?: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  status: 'Completed' | 'In Progress';
  iconType?: string;
  description?: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  location: string;
  semester: string;
  yearLevel: string;
  graduationYear: string;
  cgpa: string;
  details?: string;
}

export interface SocialLinks {
  email: string;
  phone: string;
  whatsappUrl?: string;
  github?: string;
  linkedin?: string;
  fiverr?: string;
}

export interface PortfolioData {
  name: string;
  headlineRole: string;
  institution: string;
  location: string;
  statusBadge: string;
  email: string;
  phone: string;
  profile: string;
  careerObjective: string;
  areasOfInterest: string[];
  education: EducationInfo;
  certifications: CertificationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  stats: Metric[];
  socials: SocialLinks;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
}
