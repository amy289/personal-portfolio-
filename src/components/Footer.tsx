import { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  Mail, 
  Linkedin
} from 'lucide-react';
import { PortfolioData } from '../types';

interface FooterProps {
  portfolio: PortfolioData;
  onOpenResume?: () => void;
  onOpenEditor?: () => void;
}

export default function Footer({ portfolio }: FooterProps) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' PKT'
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkedinUrl = portfolio.socials?.linkedin || 'https://www.linkedin.com/in/amy-mari-2b0b16362?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
  const fiverrUrl = portfolio.socials?.fiverr || 'https://www.fiverr.com/amyywebdev';

  return (
    <footer id="portfolio-footer" className="py-14 border-t border-stone-200/90 dark:border-stone-800/90 bg-stone-100/60 dark:bg-stone-950/80 no-print relative overflow-hidden">
      {/* Subtle ambient footer glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-36 bg-gradient-to-t from-emerald-500/5 via-teal-500/5 to-transparent blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
          
          {/* Brand & Institution Info (Left Side) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display font-extrabold text-2xl text-stone-900 dark:text-stone-100 tracking-tight bg-gradient-to-r from-stone-900 via-stone-800 to-emerald-700 dark:from-stone-100 dark:via-stone-200 dark:to-emerald-400 bg-clip-text text-transparent">
              {portfolio.name}
            </span>
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 mt-1">
              {portfolio.headlineRole}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {portfolio.institution} • {portfolio.location}
            </span>
            
            {/* Pakistan Standard Time */}
            {timeString && (
              <div className="inline-flex items-center gap-2 font-mono text-[11px] bg-white dark:bg-stone-900 px-3 py-1.5 rounded-full border border-stone-200/80 dark:border-stone-800 shadow-2xs mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Jamshoro Time: {timeString}</span>
              </div>
            )}
          </div>

          {/* Right Side: Social Profiles (LinkedIn & Fiverr) + Email directly underneath */}
          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            
            {/* Row 1: LinkedIn & Fiverr buttons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn Profile */}
              <a
                id="footer-linkedin-link"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xs hover:shadow-blue-500/10 transition-all shadow-2xs group"
                title="Open LinkedIn Profile"
              >
                <div className="w-4 h-4 rounded-xs bg-[#0A66C2] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Linkedin className="w-3 h-3 fill-white" />
                </div>
                <span>LinkedIn</span>
              </a>

              {/* Fiverr Profile */}
              <a
                id="footer-fiverr-link"
                href={fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-xs hover:shadow-emerald-500/10 transition-all shadow-2xs group"
                title="Open Fiverr Profile"
              >
                <span className="w-4 h-4 rounded-full bg-[#1dbf73] text-white flex items-center justify-center font-black text-[9px] group-hover:scale-110 transition-transform">
                  fi
                </span>
                <span>Fiverr</span>
              </a>

              {/* Back to top button */}
              <button
                id="footer-back-to-top-btn"
                type="button"
                onClick={scrollToTop}
                className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:border-stone-400 transition-all shadow-2xs ml-1 cursor-pointer"
                aria-label="Back to top"
                title="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* Row 2: Email Address placed directly underneath LinkedIn & Fiverr */}
            <a 
              id="footer-email-pill"
              href={`mailto:${portfolio.email}`} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs font-semibold hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-2xs group"
              title="Send email directly to Amyy"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-3 h-3" />
              </div>
              <span>{portfolio.email}</span>
            </a>

          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 text-center text-xs text-stone-500 dark:text-stone-400">
          <span>Bachelor of Software Engineering Portfolio • University of Sindh, Jamshoro</span>
        </div>

      </div>
    </footer>
  );
}
