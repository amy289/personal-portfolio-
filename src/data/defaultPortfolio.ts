import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  name: "Amyy",
  headlineRole: "Software Engineering Student",
  institution: "University of Sindh, Jamshoro",
  location: "University of Sindh, Jamshoro",
  statusBadge: "BS Software Engineering • 2nd Year",
  email: "amyyb871@gmail.com",
  phone: "0327-9230992",
  profile: "Motivated Software Engineering student with a strong interest in AI, web development, digital innovation, and cybersecurity. Eager to strengthen technical skills, collaborate with engineering peers, and contribute to real-world software projects.",
  careerObjective: "Passionate software engineering student aiming to apply technical knowledge in software engineering, web development, AI fundamentals, and cybersecurity to solve practical challenges and grow continuously.",
  areasOfInterest: [
    "Artificial Intelligence",
    "Web Development",
    "Cybersecurity",
    "Software Engineering",
    "Digital Innovation"
  ],
  education: {
    degree: "Bachelor of Software Engineering",
    institution: "University of Sindh, Jamshoro",
    location: "Jamshoro, Sindh, Pakistan",
    semester: "4th Semester",
    yearLevel: "2nd Year",
    graduationYear: "Expected Graduation: 2028",
    cgpa: "3.00 / 4.00",
    details: "Currently in 4th Semester (2nd Year). Academic coursework includes Object-Oriented Programming, Data Structures, Web Engineering Principles, Software Engineering Foundations, and Database Concepts."
  },
  certifications: [
    {
      id: "cert-ai",
      title: "AI Fundamentals",
      issuer: "Coursera",
      status: "Completed",
      iconType: "ai",
      description: "Comprehensive foundation in machine learning principles, neural concepts, AI ethics, and practical applications in modern software."
    },
    {
      id: "cert-cyber",
      title: "Cybersecurity Course",
      issuer: "Certification Program",
      status: "In Progress",
      iconType: "security",
      description: "Active coursework covering digital security fundamentals, network defense fundamentals, vulnerability identification, and web security best practices."
    }
  ],
  skills: [
    {
      name: "HTML & CSS",
      category: "Web Development",
      level: 85,
      statusTag: "Hands-on",
      isCore: true
    },
    {
      name: "JavaScript",
      category: "Web Development",
      level: 78,
      statusTag: "Hands-on",
      isCore: true
    },
    {
      name: "Web Development",
      category: "Web Development",
      level: 82,
      statusTag: "Core",
      isCore: true
    },
    {
      name: "Java",
      category: "Programming Languages",
      level: 65,
      statusTag: "Basic",
      isCore: true
    },
    {
      name: "AI Fundamentals",
      category: "AI & Emerging Tech",
      level: 75,
      statusTag: "Certified",
      isCore: true
    },
    {
      name: "Cybersecurity",
      category: "Security & Tools",
      level: 65,
      statusTag: "Currently Learning",
      isCore: true
    },
    {
      name: "Git & GitHub",
      category: "Security & Tools",
      level: 70,
      statusTag: "Basic",
      isCore: true
    }
  ],
  projects: [
    {
      id: "project-begum-gees",
      title: "Begum Gees Website",
      tagline: "Live responsive web platform built with HTML, CSS, and modern JavaScript",
      description: "An officially launched, responsive website featuring modern semantic architecture, elegant multi-device layouts, and interactive client-side functionality.",
      longDescription: "Begum Gees Website is a fully launched, responsive web development project. Engineered with semantic HTML5, modular modern CSS styling, and vanilla JavaScript, it delivers a smooth browsing experience optimized across mobile, tablet, and desktop screens.",
      category: "Web Development",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Live Project"],
      statusNote: "Live & Launched",
      year: "2024",
      featured: true,
      keyFeatures: [
        "Officially launched live website with multi-device responsive design",
        "Semantic HTML5 document hierarchy and clean component structure",
        "Modern CSS layout techniques with smooth navigation and transitions",
        "Interactive client-side functionality powered by vanilla JavaScript"
      ],
      technologiesUsed: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    {
      id: "project-sindhi-got",
      title: "Sindhi GOT App",
      tagline: "Sindhi-language app concept developed as a student project",
      description: "An innovative Sindhi-language mobile application concept developed as a student project to explore regional language software engineering and accessibility.",
      longDescription: "The Sindhi GOT App is a student-led software concept designed to bridge language accessibility by providing a rich user experience entirely in the Sindhi language. The project incorporates regional typography, intuitive screen navigation, and student-researched software architecture models. (Note: Developed for academic concept exploration; not publicly launched).",
      category: "App Concept & Development",
      tags: ["Sindhi Language", "Software Engineering", "UI Concept", "Localization"],
      statusNote: "Student Concept Project • Not publicly launched",
      year: "2024",
      featured: true,
      keyFeatures: [
        "Custom Sindhi-language UI layout and vernacular font typography",
        "User flow architecture designed specifically for regional accessibility",
        "Student software engineering project showcasing localized digital innovation",
        "Clear interface hierarchy with intuitive navigation components"
      ],
      technologiesUsed: ["Software Engineering Principles", "App UI Design", "Localization"]
    }
  ],
  stats: [
    { label: "Academic Level", value: "2nd Year" },
    { label: "Current Term", value: "4th Sem" },
    { label: "Cumulative CGPA", value: "3.00 / 4.0" },
    { label: "Graduation", value: "Class of 2028" }
  ],
  socials: {
    email: "amyyb871@gmail.com",
    phone: "0327-9230992",
    whatsappUrl: "https://wa.me/923279230992",
    linkedin: "https://www.linkedin.com/in/amy-mari-2b0b16362?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    fiverr: "https://www.fiverr.com/amyywebdev"
  }
};
