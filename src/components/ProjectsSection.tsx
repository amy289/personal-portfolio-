import { useState, useMemo } from 'react';
import { 
  ExternalLink, 
  Github, 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  X, 
  Layers, 
  CheckCircle,
  SlidersHorizontal
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'UI Systems', 'Dev Tools'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery = 
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-stone-200/90 dark:border-stone-800/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2 block">
              Featured Engineering
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
              Selected Works & Case Studies
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              A collection of production applications, developer tools, and architectural systems built with performance and user experience in focus.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="project-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-300/80 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200/80 dark:hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-stone-400 dark:text-stone-500 ml-auto hidden sm:inline-block font-mono">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30">
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              No projects matched "{searchQuery}". Try selecting a different category or clearing your search.
            </p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:opacity-90"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 flex flex-col justify-between hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300 shadow-2xs hover:shadow-xs"
              >
                <div>
                  {/* Card Header Top */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1 mb-3 line-clamp-1">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Metrics Row (if any) */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 pt-2 border-t border-stone-100 dark:border-stone-800/60">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="text-[11px] bg-stone-50 dark:bg-stone-800/70 px-2 py-1 rounded border border-stone-200/50 dark:border-stone-700/50">
                          <span className="font-bold text-stone-800 dark:text-stone-200">{metric.value}</span>{' '}
                          <span className="text-stone-500 dark:text-stone-400">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] text-stone-400 px-1 py-0.5">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 dark:text-stone-100 hover:underline decoration-stone-400 underline-offset-2"
                  >
                    <span>Deep Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
                        title="View Source Code"
                        aria-label={`View source code for ${project.title}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
                        title="Launch Live Application"
                        aria-label={`Launch live preview for ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
            className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute right-5 top-5 p-2 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {activeProject.category}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {activeProject.year} • {activeProject.role || 'Lead Engineer'}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 mb-2">
              {activeProject.title}
            </h3>
            <p className="text-stone-600 dark:text-stone-300 font-medium text-sm sm:text-base mb-6">
              {activeProject.tagline}
            </p>

            {/* Metrics highlight */}
            {activeProject.metrics && (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 mb-6">
                {activeProject.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col text-center">
                    <span className="font-display font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                      {m.value}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture Overview */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Architecture & Implementation
              </h4>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {activeProject.longDescription || activeProject.description}
              </p>
            </div>

            {/* Key Features */}
            {activeProject.keyFeatures && activeProject.keyFeatures.length > 0 && (
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-2">
                  {activeProject.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="space-y-2 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Technologies & Tools
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
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
