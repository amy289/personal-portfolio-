import { 
  CheckCircle2, 
  Terminal, 
  Laptop, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  FileText
} from 'lucide-react';
import { PortfolioData } from '../types';

interface AboutSectionProps {
  portfolio: PortfolioData;
  onOpenResume: () => void;
}

export default function AboutSection({ portfolio, onOpenResume }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-stone-200/90 dark:border-stone-800/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
            Profile & Approach
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
            Crafting software with durability and intent.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-6 text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            <p className="font-medium text-stone-800 dark:text-stone-200">
              {portfolio.aboutStory}
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              I believe that great software doesn't just work—it respects user attention, operates reliably under edge conditions, and provides maintainable foundations for developers. Over my career, I've had the privilege of architecting products from the ground up, refactoring legacy distributed systems, and leading frontend design systems.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Whether optimizing client-side rendering pipelines for complex graphs, building robust REST/GraphQL APIs, or polishing micro-interactions for critical workflows, my goal is always to deliver software that feels cohesive, fast, and delightful to use.
            </p>

            {/* Quick bullets */}
            <div className="pt-4 space-y-3">
              {portfolio.aboutPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-800 dark:text-stone-200 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs sm:text-sm font-bold hover:bg-stone-800 dark:hover:bg-white transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
              >
                <span>Discuss a project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Values / Capability Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  <Laptop className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
                  Interface Architecture & UX
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Expert in modern React, TypeScript, state orchestration, design tokens, and fluid animation without layout shifts or memory leaks.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
                  Resilient Backend & Data
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                High-throughput Node.js microservices, PostgreSQL indexing, caching layers, and realtime event channels built for stability.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
                  Performance & Accessibility
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Zero tolerance for sluggish interactions. Strict keyboard navigation, screen-reader ergonomics, and sub-100ms response targets.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
