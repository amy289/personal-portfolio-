import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  FileText, 
  Settings, 
  Send,
  ExternalLink,
  Code2
} from 'lucide-react';
import { PortfolioData } from '../types';

interface NavbarProps {
  portfolio: PortfolioData;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenEditor: () => void;
}

export default function Navbar({
  portfolio,
  isDark,
  onToggleTheme,
  onOpenResume,
  onOpenEditor
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 shadow-xs py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            id="nav-brand-link"
            href="#top"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:scale-105">
              {portfolio.name.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-stone-900 dark:text-stone-100 text-base tracking-tight group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                {portfolio.name}
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium hidden sm:inline-block">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1 bg-stone-100/70 dark:bg-stone-900/70 p-1 rounded-full border border-stone-200/60 dark:border-stone-800/60">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase()}`}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 rounded-full hover:bg-white dark:hover:bg-stone-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors"
              aria-label="Toggle dark mode"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <button
              id="nav-resume-btn"
              type="button"
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-300/80 dark:border-stone-700 rounded-lg hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700/60 transition-all shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span>Resume</span>
            </button>

            {/* Live Customizer Button */}
            <button
              id="nav-editor-btn"
              type="button"
              onClick={onOpenEditor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300/80 dark:hover:bg-stone-700 rounded-lg transition-colors border border-stone-300/50 dark:border-stone-700/50"
              title="Customize your portfolio details"
            >
              <Settings className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
              <span className="hidden lg:inline">Edit Portfolio</span>
            </button>

            {/* Contact CTA */}
            <a
              id="nav-contact-cta"
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-lg transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-dropdown"
          className="md:hidden px-4 pt-3 pb-5 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 shadow-lg animate-in slide-in-from-top-2"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`mobile-nav-link-${link.label.toLowerCase()}`}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2 mt-1">
              <button
                id="mobile-nav-resume-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg"
              >
                <FileText className="w-4 h-4 text-stone-500" />
                <span>View Full Resume / CV</span>
              </button>
              <button
                id="mobile-nav-editor-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditor();
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg"
              >
                <Settings className="w-4 h-4 text-stone-500" />
                <span>Customize Portfolio Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
