import { Printer, X, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { PortfolioData } from '../types';

interface ResumeModalProps {
  portfolio: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ portfolio, isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
${portfolio.name.toUpperCase()}
${portfolio.headlineRole}
Location: ${portfolio.location} | Email: ${portfolio.socials.email} | GitHub: ${portfolio.socials.github}

PROFESSIONAL SUMMARY
${portfolio.bio}

WORK EXPERIENCE
${portfolio.experience.map(e => `
${e.role} — ${e.company} (${e.period})
Location: ${e.location}
${e.description}
Key Achievements:
${e.achievements.map(a => `• ${a}`).join('\n')}
Technologies: ${e.skills.join(', ')}
`).join('\n')}

CORE TECHNICAL COMPETENCIES
Frontend: ${portfolio.skills.filter(s => s.category === 'frontend').map(s => s.name).join(', ')}
Backend & DB: ${portfolio.skills.filter(s => s.category === 'backend').map(s => s.name).join(', ')}
Cloud & Architecture: ${portfolio.skills.filter(s => s.category === 'architecture').map(s => s.name).join(', ')}
Design & Systems: ${portfolio.skills.filter(s => s.category === 'design').map(s => s.name).join(', ')}

EDUCATION
${portfolio.education.map(ed => `${ed.degree} — ${ed.institution} (${ed.period})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
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
              Curriculum Vitae / Resume
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              id="resume-print-btn"
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              id="resume-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 rounded-lg"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div id="printable-resume" className="p-8 sm:p-12 text-stone-900 dark:text-stone-100 font-sans space-y-8">
          
          {/* Header */}
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-stone-900 dark:text-stone-50">
                {portfolio.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-stone-600 dark:text-stone-300 mt-1">
                {portfolio.headlineRole}
              </p>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-400 sm:text-right space-y-0.5 font-mono">
              <div>{portfolio.location}</div>
              <div>{portfolio.socials.email}</div>
              <div>{portfolio.socials.website}</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {portfolio.bio}
            </p>
          </div>

          {/* Core Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="text-stone-900 dark:text-stone-100">Frontend & Web:</strong>{' '}
                <span className="text-stone-600 dark:text-stone-400">
                  {portfolio.skills.filter(s => s.category === 'frontend').map(s => s.name).join(', ')}
                </span>
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100">Backend & Databases:</strong>{' '}
                <span className="text-stone-600 dark:text-stone-400">
                  {portfolio.skills.filter(s => s.category === 'backend').map(s => s.name).join(', ')}
                </span>
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100">Architecture & Cloud:</strong>{' '}
                <span className="text-stone-600 dark:text-stone-400">
                  {portfolio.skills.filter(s => s.category === 'architecture').map(s => s.name).join(', ')}
                </span>
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100">Design Systems & A11y:</strong>{' '}
                <span className="text-stone-600 dark:text-stone-400">
                  {portfolio.skills.filter(s => s.category === 'design').map(s => s.name).join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4 border-b border-stone-200 dark:border-stone-800 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {portfolio.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="font-display font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                        {exp.role}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 ml-1.5">
                        — {exp.company}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                      {exp.period} | {exp.location}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 dark:text-stone-300">
                    {exp.description}
                  </p>

                  <ul className="space-y-1 pl-4 list-disc text-xs text-stone-600 dark:text-stone-400">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-stone-500 dark:text-stone-400 pt-1">
                    <strong>Tech:</strong> {exp.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1">
              Selected Engineered Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {portfolio.projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50">
                  <div className="font-bold text-stone-900 dark:text-stone-100">{p.title}</div>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px] mt-0.5">{p.tagline}</p>
                  <div className="text-[10px] text-stone-500 font-mono mt-2">
                    {p.tags.slice(0, 3).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1">
              Education
            </h2>
            {portfolio.education.map((edu) => (
              <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                <div>
                  <strong className="text-stone-900 dark:text-stone-100">{edu.degree}</strong>
                  <span className="text-stone-600 dark:text-stone-400 ml-1.5">— {edu.institution}</span>
                </div>
                <span className="text-stone-500 font-mono">{edu.period}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
