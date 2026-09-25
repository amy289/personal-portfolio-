import { Printer, X, Download, Copy, Check, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
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
AMYY
Software Engineering Student
${portfolio.institution}  |  ${portfolio.email}  |  ${portfolio.phone}

CAREER OBJECTIVE
${portfolio.careerObjective}

PROFILE
${portfolio.profile}

EDUCATION
${portfolio.education.degree} — ${portfolio.education.institution}
${portfolio.education.semester} | ${portfolio.education.yearLevel} | ${portfolio.education.graduationYear} | CGPA: ${portfolio.education.cgpa}

TECHNICAL SKILLS
${portfolio.skills.map(s => `• ${s.name} (${s.category})`).join('\n')}

PROJECTS
${portfolio.projects.map(p => `• ${p.title} — ${p.tagline}; ${p.statusNote || 'not publicly launched'}.`).join('\n')}

COURSES & CERTIFICATIONS
${portfolio.certifications.map(c => `• ${c.title} — ${c.issuer} (${c.status})`).join('\n')}

AREAS OF INTEREST
${portfolio.areasOfInterest.join(' • ')}
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
        <div id="printable-resume" className="p-8 sm:p-12 text-stone-900 dark:text-stone-100 font-sans space-y-7">
          
          {/* Resume Header */}
          <div className="border-b-2 border-stone-900 dark:border-stone-100 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-stone-900 dark:text-stone-50 uppercase">
                {portfolio.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-stone-700 dark:text-stone-300 mt-1">
                {portfolio.headlineRole}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {portfolio.institution}
              </p>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-400 sm:text-right space-y-0.5 font-mono">
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{portfolio.location}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3 h-3 text-stone-400" />
                <span>{portfolio.email}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3 h-3 text-stone-400" />
                <span>{portfolio.phone}</span>
              </div>
            </div>
          </div>

          {/* Career Objective */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              Career Objective
            </h2>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              {portfolio.careerObjective}
            </p>
          </div>

          {/* Profile */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              Professional Profile
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {portfolio.profile}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1">
              Education
            </h2>
            <div className="space-y-1 text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-display font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                  {portfolio.education.degree}
                </span>
                <span className="font-mono text-stone-500 dark:text-stone-400">
                  {portfolio.education.graduationYear}
                </span>
              </div>
              <div className="font-semibold text-stone-700 dark:text-stone-300">
                {portfolio.education.institution}
              </div>
              <div className="text-stone-600 dark:text-stone-400 font-mono text-[11px] pt-0.5">
                {portfolio.education.semester} | {portfolio.education.yearLevel} | Cumulative CGPA: <strong>{portfolio.education.cgpa}</strong>
              </div>
              {portfolio.education.details && (
                <p className="text-stone-500 dark:text-stone-400 pt-1 text-[11px] leading-relaxed">
                  {portfolio.education.details}
                </p>
              )}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {portfolio.skills.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{s.name}</span>
                  <span className="text-[10px] text-stone-500 font-mono">{s.statusTag || s.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-display font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      {proj.title}
                    </span>
                    <span className="text-[11px] text-amber-700 dark:text-amber-400 font-mono">
                      {proj.statusNote || 'Student Project'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    {proj.tagline}
                  </p>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="text-[10px] text-stone-500 font-mono pt-0.5">
                    <strong>Tech:</strong> {proj.tags.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses & Certifications */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1">
              Courses & Certifications
            </h2>
            <div className="space-y-2 text-xs">
              {portfolio.certifications.map((cert) => (
                <div key={cert.id} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{cert.title}</span>
                    <span className="text-stone-500 dark:text-stone-400 ml-1.5">— {cert.issuer}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    cert.status === 'Completed'
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas of Interest */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              Areas of Interest
            </h2>
            <div className="text-xs text-stone-700 dark:text-stone-300 font-medium">
              {portfolio.areasOfInterest.join(' • ')}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
