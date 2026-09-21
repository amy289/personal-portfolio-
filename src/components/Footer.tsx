import { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { PortfolioData } from '../types';

interface FooterProps {
  portfolio: PortfolioData;
  onOpenResume: () => void;
  onOpenEditor: () => void;
}

export default function Footer({ portfolio, onOpenResume, onOpenEditor }: FooterProps) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' PT'
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="portfolio-footer" className="py-12 border-t border-stone-200/90 dark:border-stone-800/90 bg-stone-100/50 dark:bg-stone-950 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
              {portfolio.name}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {portfolio.headlineRole} • Based in {portfolio.location.split('•')[0]}
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-stone-600 dark:text-stone-400">
            <a href="#about" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Skills
            </a>
            <a href="#experience" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Experience
            </a>
            <button
              type="button"
              onClick={onOpenResume}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={onOpenEditor}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Customizer
            </button>
          </div>

          {/* Back to top button */}
          <button
            id="footer-back-to-top-btn"
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:border-stone-400 transition-all shadow-2xs"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom meta strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</span>
          </div>

          {/* Live time */}
          {timeString && (
            <div className="inline-flex items-center gap-2 font-mono text-[11px] bg-white dark:bg-stone-900 px-3 py-1 rounded-full border border-stone-200/80 dark:border-stone-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Local time: {timeString}</span>
            </div>
          )}

          <div className="flex items-center gap-4">
            {portfolio.socials.github && (
              <a href={portfolio.socials.github} target="_blank" rel="noreferrer" className="hover:text-stone-900 dark:hover:text-stone-100">
                GitHub
              </a>
            )}
            {portfolio.socials.linkedin && (
              <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-stone-900 dark:hover:text-stone-100">
                LinkedIn
              </a>
            )}
            {portfolio.socials.twitter && (
              <a href={portfolio.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-stone-900 dark:hover:text-stone-100">
                Twitter/X
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
