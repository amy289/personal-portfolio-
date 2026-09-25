import { 
  BrainCircuit, 
  Globe, 
  ShieldAlert, 
  Code, 
  Sparkles, 
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { PortfolioData } from '../types';

interface AboutSectionProps {
  portfolio: PortfolioData;
  onOpenResume?: () => void;
}

export default function AboutSection({ portfolio }: AboutSectionProps) {
  const interestHighlights = [
    {
      name: 'Artificial Intelligence',
      tagline: 'Machine Learning & Neural Systems',
      description: 'Understanding core AI models, neural foundations, practical problem-solving algorithms, and ethical AI development.',
      icon: BrainCircuit,
      theme: 'text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 border-purple-300 dark:border-purple-700',
      cardGradient: 'bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-white dark:to-stone-900/90 border-purple-200/90 dark:border-purple-800/80 hover:border-purple-400 dark:hover:border-purple-600',
      badge: 'Certified Foundation',
      badgeClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    },
    {
      name: 'Web Development',
      tagline: 'Modern Responsive Architecture',
      description: 'Building accessible, fast, and structured web interfaces with semantic HTML5, modern CSS layouts, and vanilla JavaScript.',
      icon: Globe,
      theme: 'text-emerald-600 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700',
      cardGradient: 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white dark:to-stone-900/90 border-emerald-200/90 dark:border-emerald-800/80 hover:border-emerald-400 dark:hover:border-emerald-600',
      badge: 'Live Projects',
      badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    },
    {
      name: 'Cybersecurity',
      tagline: 'Digital Defense & System Security',
      description: 'Acquiring hands-on knowledge in network security fundamentals, digital threat mitigation, and web application safety.',
      icon: ShieldAlert,
      theme: 'text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 border-blue-300 dark:border-blue-700',
      cardGradient: 'bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-white dark:to-stone-900/90 border-blue-200/90 dark:border-blue-800/80 hover:border-blue-400 dark:hover:border-blue-600',
      badge: 'Active Study',
      badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    },
    {
      name: 'Software Engineering',
      tagline: 'OOP Principles & Data Structures',
      description: 'Grounded in Java, Object-Oriented methodologies, algorithmic problem solving, and software engineering development lifecycles.',
      icon: Code,
      theme: 'text-amber-600 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700',
      cardGradient: 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white dark:to-stone-900/90 border-amber-200/90 dark:border-amber-800/80 hover:border-amber-400 dark:hover:border-amber-600',
      badge: 'Academic Core',
      badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    },
    {
      name: 'Digital Innovation',
      tagline: 'Localized Solutions & Novel Apps',
      description: 'Exploring software accessibility, vernacular applications (such as Sindhi language software concepts), and user-centered design.',
      icon: Sparkles,
      theme: 'text-rose-600 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700',
      cardGradient: 'bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-white dark:to-stone-900/90 border-rose-200/90 dark:border-rose-800/80 hover:border-rose-400 dark:hover:border-rose-600',
      badge: 'Creative Tech',
      badgeClass: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-stone-200/90 dark:border-stone-800/90 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-500/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 shadow-2xs">
            <Sparkle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Profile & Academic Journey</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-stone-900 dark:text-stone-100 tracking-tight">
            About Me
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Software Engineering undergraduate at University of Sindh, Jamshoro, exploring web engineering, AI concepts, and digital solutions.
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-6 sm:p-9 md:p-11 space-y-10 relative">
          
          {/* Subtle top accent gradient line */}
          <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-full" />

          {/* Main Story Narrative */}
          <div className="space-y-4 pt-2">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
              Building Strong Technical Foundations
            </h3>
            <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
              {portfolio.profile}
            </p>
          </div>

          {/* Highlighted Areas of Interest (Vibrant & Rich Colors) */}
          <div className="space-y-6 pt-6 border-t border-stone-100 dark:border-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono block">
                  Highlighted Fields
                </span>
                <h4 className="font-display font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 mt-0.5">
                  Core Areas of Interest
                </h4>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
                5 Focus Domains
              </span>
            </div>

            {/* Prominent Interest Cards Grid with vibrant gradients */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {interestHighlights.map((interest, idx) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border ${interest.cardGradient} transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md hover:-translate-y-0.5`}
                  >
                    <div>
                      {/* Top icon and badge */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${interest.theme} shadow-xs transition-transform group-hover:scale-110`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${interest.badgeClass}`}>
                          {interest.badge}
                        </span>
                      </div>

                      <h5 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {interest.name}
                      </h5>
                      <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mt-0.5 mb-2.5">
                        {interest.tagline}
                      </span>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {interest.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Connect Footer */}
          <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>University of Sindh, Jamshoro</span>
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-xs"
            >
              <span>Connect with Amyy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
