import { useState } from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  ArrowUpRight, 
  X, 
  CheckCircle,
  Code2,
  Globe,
  Layers,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-stone-200/90 dark:border-stone-800/90">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold mb-3 shadow-2xs">
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Software & Web Engineering</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              Software engineering developments, including the live Begum Gees web platform and localized academic applications.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 shadow-2xs">
            <Info className="w-4 h-4 text-stone-400 shrink-0" />
            <span>Demonstrating practical frontend & software design</span>
          </div>
        </div>

        {/* Projects Grid (Material 3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const isLive = project.id === 'project-begum-gees' || project.statusNote?.toLowerCase().includes('live') || project.statusNote?.toLowerCase().includes('launch');

            const gradientBar = project.id === 'project-begum-gees' 
              ? 'from-emerald-500 via-teal-500 to-green-600'
              : project.id === 'project-sindhi-edtech'
              ? 'from-indigo-500 via-purple-500 to-blue-600'
              : project.id === 'project-oop-grading'
              ? 'from-amber-500 via-orange-500 to-yellow-600'
              : 'from-cyan-500 via-blue-500 to-teal-600';

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-7 sm:p-9 flex flex-col justify-between hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
              >
                {/* Top distinctive color accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradientBar}`} />

                <div>
                  {/* Header Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pt-1">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60">
                      {project.category}
                    </span>
                    
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full shadow-2xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>Live & Launched</span>
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1 rounded-full">
                        {project.statusNote || 'Academic Concept'}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1.5 mb-4">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Features Bullets */}
                  {project.keyFeatures && (
                    <div className="space-y-2 mb-6 p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-100 dark:border-stone-800/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                        Core Capabilities:
                      </span>
                      {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between pt-5 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  >
                    <span>View Project Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-xs font-mono text-stone-400">
                    {project.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      {activeProject && (
        <div
          id="project-detail-modal-backdrop"
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
          onClick={() => setActiveProject(null)}
        >
          <div
            id="project-detail-modal"
            className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-9 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute right-6 top-6 p-2 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {activeProject.category}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                activeProject.id === 'project-begum-gees' 
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}>
                {activeProject.id === 'project-begum-gees' ? 'Live & Launched' : (activeProject.statusNote || 'Student Project')}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 mb-1">
              {activeProject.title}
            </h3>
            <p className="text-stone-600 dark:text-stone-300 font-semibold text-sm sm:text-base mb-6">
              {activeProject.tagline}
            </p>

            {/* Deep Description */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Project Overview & Execution
              </h4>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {activeProject.longDescription || activeProject.description}
              </p>
            </div>

            {/* Key Features */}
            {activeProject.keyFeatures && activeProject.keyFeatures.length > 0 && (
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Key Technical Features
                </h4>
                <ul className="space-y-2">
                  {activeProject.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Technologies & Tools Applied
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-5 border-t border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-500 font-mono">
                Amyy • Software Engineering Student
              </span>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 transition-colors shadow-2xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
