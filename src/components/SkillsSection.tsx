import { useState, useMemo } from 'react';
import { 
  Code, 
  Server, 
  Cloud, 
  Palette, 
  Star, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { SkillItem } from '../types';

interface SkillsSectionProps {
  skills: SkillItem[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend' | 'architecture' | 'design'>('all');
  const [skillSearch, setSkillSearch] = useState('');

  const categories = [
    { id: 'all', label: 'All Disciplines', icon: Code },
    { id: 'frontend', label: 'Frontend & Web', icon: Code },
    { id: 'backend', label: 'Backend & Data', icon: Server },
    { id: 'architecture', label: 'DevOps & Cloud', icon: Cloud },
    { id: 'design', label: 'Design & UX Systems', icon: Palette },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch = !skillSearch || skill.name.toLowerCase().includes(skillSearch.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [skills, selectedCategory, skillSearch]);

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-stone-200/90 dark:border-stone-800/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2 block">
              Technical Competencies
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
              Skills & Engineering Stack
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              Battle-tested technologies and design systems I leverage daily to engineer high-velocity, reliable software.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="skill-search-input"
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-300/80 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                id={`skill-filter-${cat.id}`}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs'
                    : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200/80 dark:hover:bg-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="p-4 rounded-xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/90 flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-700 transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
                      {skill.name}
                    </span>
                    {skill.isFavorite && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Core</span>
                      </span>
                    )}
                  </div>
                  {skill.experienceYears && (
                    <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                      {skill.experienceYears}
                    </span>
                  )}
                </div>

                {/* Level Bar */}
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-stone-800 dark:bg-stone-200 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mt-2 font-mono">
                <span className="capitalize">{skill.category}</span>
                <span>{skill.level}% mastery</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow & Principles Sub-card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-sm mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Type-Safe Throughout</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              End-to-end typed contracts from database schemas to UI component props, preventing production runtime regression.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-sm mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Predictable State</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Unidirectional data flows and discrete finite state machine logic for dependable offline and real-time synchronization.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-sm mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Inclusive Architecture</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              WAI-ARIA compliant layouts, fluid responsive typography, and high-contrast color systems tested with assistive technology.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
