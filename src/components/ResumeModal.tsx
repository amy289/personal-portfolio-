import { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Award,
  Briefcase,
  Code
} from 'lucide-react';
import { PortfolioData } from '../types';

interface ResumeModalProps {
  portfolio: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({
  portfolio,
  isOpen,
  onClose
}: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
${portfolio.name.toUpperCase()} - ${portfolio.headlineRole.toUpperCase()}
Contact: Direct message via Portfolio Contact Form | Phone: ${portfolio.phone} | Location: ${portfolio.location}
LinkedIn: ${portfolio.socials?.linkedin || ''} | Fiverr: ${portfolio.socials?.fiverr || ''}

CAREER OBJECTIVE:
${portfolio.careerObjective}

EDUCATION:
${portfolio.education.degree} (${portfolio.education.yearLevel}, ${portfolio.education.semester})
${portfolio.education.institution} - ${portfolio.education.location}
Current CGPA: ${portfolio.education.cgpa}

KEY PROJECTS:
${portfolio.projects.map(p => `• ${p.title} (${p.category}): ${p.description}`).join('\n')}

CERTIFICATIONS:
${portfolio.certifications.map(c => `• ${c.title} - ${c.issuer} (${c.status})`).join('\n')}

CORE TECHNICAL SKILLS:
${portfolio.skills.map(s => `• ${s.name} (${s.category})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="resume-modal-container"
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Toolbar */}
        <div className="sticky top-0 z-10 px-6 py-3.5 bg-stone-100/90 dark:bg-stone-800/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-700 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
              Curriculum Vitae / Resume — Amyy
            </span>
            <span className="text-xs text-stone-500 font-mono hidden sm:inline">
              • Printable & Exportable
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-copy-text-btn"
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              id="resume-print-btn"
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              id="resume-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 rounded-lg cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div id="printable-resume" className="p-8 sm:p-12 text-stone-900 dark:text-stone-100 font-sans space-y-7">
          
          {/* Header */}
          <div className="border-b-2 border-stone-800 dark:border-stone-200 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-stone-900 dark:text-stone-50">
                  {portfolio.name}
                </h1>
                <p className="text-lg font-semibold text-stone-700 dark:text-stone-300 mt-0.5">
                  {portfolio.headlineRole}
                </p>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  BS Software Engineering Candidate • Class of 2028
                </p>
              </div>

              <div className="flex flex-col sm:items-end text-xs text-stone-600 dark:text-stone-300 space-y-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      const contactEl = document.getElementById('contact');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:underline text-emerald-700 dark:text-emerald-400 font-medium cursor-pointer"
                  >
                    Direct Message via Portfolio
                  </button>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <a href={`tel:${portfolio.phone}`} className="hover:underline">{portfolio.phone}</a>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>{portfolio.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Career Objective */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              Career Objective
            </h2>
            <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {portfolio.careerObjective}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1 flex items-center justify-between">
              <span>Education</span>
              <GraduationCap className="w-4 h-4 text-stone-400" />
            </h2>
            <div className="space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {portfolio.education.degree}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    {portfolio.education.institution} • {portfolio.education.location}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                    {portfolio.education.yearLevel}, {portfolio.education.semester}
                  </span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold block">
                    CGPA: {portfolio.education.cgpa}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1 flex items-center justify-between">
              <span>Selected Projects</span>
              <Briefcase className="w-4 h-4 text-stone-400" />
            </h2>
            <div className="space-y-4">
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {proj.title} <span className="font-normal text-stone-500">— {proj.tagline}</span>
                    </span>
                    <span className="text-stone-500 font-mono text-[11px] shrink-0 ml-2">
                      {proj.year}
                    </span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.keyFeatures && (
                    <ul className="list-disc list-inside text-stone-500 dark:text-stone-400 space-y-0.5 pt-0.5">
                      {proj.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                        <li key={fIdx}>{feat}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tags.map((t, idx) => (
                      <span key={idx} className="font-mono text-[10px] bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-600 dark:text-stone-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1 flex items-center justify-between">
              <span>Certifications & Specialized Training</span>
              <Award className="w-4 h-4 text-stone-400" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {portfolio.certifications.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {cert.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 shrink-0">
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1 flex items-center justify-between">
              <span>Technical Skills</span>
              <Code className="w-4 h-4 text-stone-400" />
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {portfolio.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
