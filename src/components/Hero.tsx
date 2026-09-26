import { PortfolioData } from '../types';
import profileImg from '../assets/images/amyy_profile_photo_1790406624014.jpg';

interface HeroProps {
  portfolio: PortfolioData;
  onOpenResume?: () => void;
  onOpenEditor?: () => void;
}

export default function Hero({ portfolio }: HeroProps) {
  return (
    <section id="hero-section" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Ambient background glows for dynamic depth and warm light */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-teal-500/8 to-indigo-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-amber-500/8 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Subtle architectural background pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Greeting, Title, Role & Bio (Clean & Elegant) */}
          <div className="lg:col-span-7 text-left order-2 lg:order-1">
            {/* Main Greeting & Name with rich gradient */}
            <h1 
              id="hero-title"
              className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-[86px] text-stone-900 dark:text-stone-50 tracking-tight leading-[1.06] mb-6"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-indigo-700 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
                {portfolio.name}
              </span>.
              <span className="block text-stone-800 dark:text-stone-200 text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-semibold mt-3.5 tracking-tight leading-[1.15]">
                {portfolio.headlineRole}
              </span>
            </h1>

            {/* Profile Bio */}
            <p 
              id="hero-bio"
              className="text-lg sm:text-xl md:text-[21px] text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed font-normal"
            >
              {portfolio.profile}
            </p>
          </div>

          {/* Right Column: Circular Picture */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group">
              {/* Outer decorative ambient pulse & ring glow */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-emerald-500/25 via-teal-500/20 to-indigo-500/25 blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Elegant Double Ring Frame */}
              <div className="relative p-2.5 rounded-full bg-white/70 dark:bg-stone-900/70 backdrop-blur-xs border border-stone-300/80 dark:border-stone-700/80 shadow-2xl">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[330px] lg:h-[330px] rounded-full overflow-hidden border-2 border-emerald-500/40 dark:border-emerald-400/30 shadow-inner bg-stone-100 dark:bg-stone-900">
                  <img
                    src={profileImg || '/profile.jpg'}
                    alt="Amyy - Software Engineering Student"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== window.location.origin + '/profile.jpg') {
                        target.src = '/profile.jpg';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
