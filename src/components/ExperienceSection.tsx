import { Briefcase, GraduationCap, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { ExperienceItem, EducationItem } from '../types';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  education: EducationItem[];
}

export default function ExperienceSection({ experience, education }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-16 md:py-24 border-t border-stone-200/90 dark:border-stone-800/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
            Career Timeline
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
            A documented record of impactful engineering leadership, distributed platform scaling, and product delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Work Experience Timeline */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-200 dark:border-stone-800 space-y-10">
              {experience.map((item, idx) => (
                <div key={item.id} id={`exp-item-${item.id}`} className="relative group">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    item.current 
                      ? 'bg-emerald-500 border-emerald-200 dark:border-emerald-800 ring-4 ring-emerald-50 dark:ring-emerald-950' 
                      : 'bg-stone-400 dark:bg-stone-600 border-stone-100 dark:border-stone-900'
                  }`} />

                  {/* Header info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                      {item.period}
                    </span>
                  </div>

                  {/* Company & Location */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mb-3">
                    <span className="font-semibold text-stone-700 dark:text-stone-300 inline-flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{item.company}</span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  {/* Role summary */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-4">
                    {item.achievements.map((achieve, aIdx) => (
                      <li key={aIdx} className="text-xs text-stone-600 dark:text-stone-300 flex items-start gap-2">
                        <span className="text-stone-400 font-bold">•</span>
                        <span>{achieve}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-2 py-0.5 rounded border border-stone-200/50 dark:border-stone-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials Column */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-stone-700 dark:text-stone-300" />
              <span>Education & Honors</span>
            </h3>

            {education.map((edu) => (
              <div
                key={edu.id}
                id={`edu-item-${edu.id}`}
                className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xs"
              >
                <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500 block mb-1">
                  {edu.period}
                </span>
                <h4 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
                  {edu.degree}
                </h4>
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-300 mb-2">
                  {edu.institution} • {edu.location}
                </p>
                {edu.details && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed pt-2 border-t border-stone-100 dark:border-stone-800">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}

            {/* Quick stats callout */}
            <div className="p-5 rounded-2xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 block">
                Continuous Learning
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Active in open source discussions, modern browser specs, and systems design research papers. Regularly contributing bug fixes and documentation enhancements.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
