import { MapPin, Sparkles, Award } from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroProps {
  portfolio: PortfolioData;
  onOpenResume?: () => void;
  onOpenEditor?: () => void;
}

export default function Hero({ portfolio }: HeroProps) {
  // Stat styling configs for vibrant visual appeal
  const statThemes = [
    {
      borderColor: 'border-emerald-200 dark:border-emerald-800/80',
      bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      dotColor: 'bg-emerald-500'
    },
    {
      borderColor: 'border-indigo-200 dark:border-indigo-800/80',
      bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/20',
      textColor: 'text-indigo-700 dark:text-indigo-400',
      dotColor: 'bg-indigo-500'
    },
    {
      borderColor: 'border-amber-200 dark:border-amber-800/80',
      bgColor: 'bg-amber-50/50 dark:bg-amber-950/20',
      textColor: 'text-amber-700 dark:text-amber-400',
      dotColor: 'bg-amber-500'
    },
    {
      borderColor: 'border-sky-200 dark:border-sky-800/80',
      bgColor: 'bg-sky-50/50 dark:bg-sky-950/20',
      textColor: 'text-sky-700 dark:text-sky-400',
      dotColor: 'bg-sky-500'
    }
  ];

  return (
    <section id="hero-section" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Rich ambient radial glows for dynamic depth and color */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-indigo-500/15 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-emerald-400/10 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-400/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Subtle architectural background pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Academic status chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            University of Sindh • Class of 2028
          </span>
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Main Greeting & Name with rich gradient */}
        <h1 
          id="hero-title"
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-6"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
            {portfolio.name}
          </span>.
          <span className="block text-stone-700 dark:text-stone-200 text-2xl sm:text-4xl md:text-4xl font-semibold mt-3">
            {portfolio.headlineRole}
          </span>
          <span className="inline-flex items-center justify-center gap-2 text-stone-600 dark:text-stone-400 text-base sm:text-lg font-medium mt-3 px-3 py-1 rounded-full bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{portfolio.institution} • {portfolio.location}</span>
          </span>
        </h1>

        {/* Profile Bio */}
        <p 
          id="hero-bio"
          className="text-base sm:text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          {portfolio.profile}
        </p>

        {/* Real Highlighted Stats Strip with vibrant modern cards */}
        <div 
          id="hero-stats-strip" 
          className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {portfolio.stats.map((stat, idx) => {
            const theme = statThemes[idx % statThemes.length];
            return (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border ${theme.borderColor} ${theme.bgColor} bg-white/70 dark:bg-stone-900/70 backdrop-blur-xs flex flex-col items-center justify-center shadow-xs hover:scale-105 transition-transform duration-200`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor}`} />
                  <span className="text-[11px] font-mono font-semibold uppercase text-stone-500 dark:text-stone-400 tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <span className={`font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight ${theme.textColor}`}>
                  {stat.value}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
