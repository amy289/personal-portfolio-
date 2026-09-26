import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Settings, 
  Send,
  Phone
} from 'lucide-react';
import { PortfolioData } from '../types';

interface NavbarProps {
  portfolio: PortfolioData;
  isDark?: boolean;
  onToggleTheme?: () => void;
  onOpenResume: () => void;
  onOpenEditor: () => void;
}

export default function Navbar({
  portfolio,
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
    { label: 'Education & Certs', href: '#education' },
    { label: 'Projects', href: '#projects' },
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
          ? 'bg-[#F5F2EB]/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-300/60 dark:border-stone-800/80 shadow-xs py-3'
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
                Software Engineering Student
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5 bg-stone-100/80 dark:bg-stone-900/80 p-1.5 rounded-full border border-stone-200/80 dark:border-stone-800/80 shadow-2xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                href={link.href}
                className="px-5 py-2.5 text-sm sm:text-[15px] font-semibold text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100 rounded-full hover:bg-white dark:hover:bg-stone-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Live Customizer Button */}
            <button
              id="nav-editor-btn"
              type="button"
              onClick={onOpenEditor}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-stone-900 dark:text-stone-100 bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300/80 dark:hover:bg-stone-700 rounded-xl transition-colors border border-stone-300/50 dark:border-stone-700/50 cursor-pointer"
              title="Customize your portfolio details"
            >
              <Settings className="w-4 h-4 text-stone-600 dark:text-stone-300" />
              <span className="hidden xl:inline">Edit Details</span>
            </button>

            {/* Contact CTA Button (Larger & More Prominent) */}
            <a
              id="nav-contact-cta"
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm sm:text-[15px] font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-xl transition-all shadow-sm hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Contact</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                id={`mobile-nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                href={link.href}
                onClick={handleNavClick}
                className="px-4 py-3 text-base font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2 mt-1">
              <a
                href={`tel:${portfolio.phone}`}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call {portfolio.phone}</span>
              </a>
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
