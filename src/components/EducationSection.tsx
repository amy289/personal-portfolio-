import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  BrainCircuit,
  Check
} from 'lucide-react';
import { EducationInfo, CertificationItem } from '../types';

interface EducationSectionProps {
  education: EducationInfo;
  certifications: CertificationItem[];
}

export default function EducationSection({ education, certifications }: EducationSectionProps) {
  const courseworkTags = [
    'Object-Oriented Programming (Java)',
    'Data Structures & Algorithms',
    'Web Systems & Architecture',
    'Software Engineering Methodologies',
    'Database Management & SQL',
    'Computer Architecture & OS'
  ];

  return (
    <section id="education" className="py-20 md:py-28 border-t border-stone-200/90 dark:border-stone-800/90 bg-stone-50/60 dark:bg-stone-950/40 relative overflow-hidden">
      {/* Background ambient color */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 shadow-xs">
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">
            Education & Certifications
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Undergraduate software engineering degree at University of Sindh, Jamshoro, supplemented with certified specialized coursework.
          </p>
        </div>

        {/* 1. University Degree Card with rich accents */}
        <div 
          id="education-degree-card"
          className="rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-6 sm:p-9 md:p-10 mb-10 relative overflow-hidden"
        >
          {/* Top Multi-Color Material Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md shadow-emerald-600/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold block mb-0.5">
                  Undergraduate Degree • 4-Year BSE
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 tracking-tight">
                  {education.degree}
                </h3>
                <p className="text-base font-semibold text-stone-800 dark:text-stone-200 mt-1">
                  {education.institution}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{education.location}</span>
                </div>
              </div>
            </div>

            <div className="self-start sm:self-auto shrink-0">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Student</span>
              </span>
            </div>
          </div>

          {/* Academic Stats Grid with vivid colored tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 text-center">
            {/* Term */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/60">
              <span className="text-[11px] font-mono uppercase text-indigo-700 dark:text-indigo-400 font-semibold block mb-1">
                Current Term
              </span>
              <span className="font-display font-extrabold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                {education.semester}
              </span>
            </div>

            {/* Year */}
            <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/60">
              <span className="text-[11px] font-mono uppercase text-purple-700 dark:text-purple-400 font-semibold block mb-1">
                Academic Year
              </span>
              <span className="font-display font-extrabold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                {education.yearLevel}
              </span>
            </div>

            {/* CGPA */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
              <span className="text-[11px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
                Cumulative CGPA
              </span>
              <span className="font-display font-extrabold text-lg sm:text-xl text-emerald-700 dark:text-emerald-400">
                {education.cgpa}
              </span>
            </div>

            {/* Grad */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60">
              <span className="text-[11px] font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold block mb-1">
                Expected Grad
              </span>
              <span className="font-display font-extrabold text-lg sm:text-xl text-amber-800 dark:text-amber-400">
                2028
              </span>
            </div>
          </div>

          {/* Streamlined Coursework Pills with emerald badges */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Key University Coursework:
              </span>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Faculty of Eng. & Tech</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {courseworkTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Certifications Section with rich colored themes */}
        <div id="certifications-section" className="space-y-6">
          <div className="flex items-center justify-between mb-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                Specialized Credentials
              </span>
              <h3 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <span>Professional Certifications</span>
              </h3>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Verified
            </span>
          </div>

          {/* 2 Side-by-Side Cards with vivid individual gradients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => {
              const isCompleted = cert.status === 'Completed';
              const isAI = cert.iconType === 'ai';

              const cardStyle = isAI 
                ? 'bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-white dark:to-stone-900 border-purple-200/90 dark:border-purple-800/80 hover:border-purple-400 dark:hover:border-purple-600'
                : 'bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-white dark:to-stone-900 border-blue-200/90 dark:border-blue-800/80 hover:border-blue-400 dark:hover:border-blue-600';

              return (
                <div
                  key={cert.id}
                  id={`cert-item-${cert.id}`}
                  className={`rounded-3xl border ${cardStyle} p-6 sm:p-7 shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow-md`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                          isAI 
                            ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                            : 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                        }`}>
                          {isAI ? (
                            <BrainCircuit className="w-6 h-6" />
                          ) : (
                            <ShieldCheck className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-semibold">
                            {cert.issuer}
                          </span>
                          <h4 className="font-display font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-snug">
                            {cert.title}
                          </h4>
                        </div>
                      </div>

                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                        isCompleted 
                          ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs' 
                          : 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-2xs'
                      }`}>
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Completed</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>In Progress</span>
                          </>
                        )}
                      </span>
                    </div>

                    {cert.description && (
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {/* Highlights / Topics Pills */}
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {isAI ? (
                        <>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            Machine Learning
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            Neural Foundations
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 font-bold">
                            Coursera Verified
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            Network Defense
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            Vulnerability Assessment
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold">
                            Active Learning
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
