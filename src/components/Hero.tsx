import { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  MapPin, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Terminal, 
  Layers, 
  Sparkles, 
  Check, 
  Copy,
  FileText
} from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroProps {
  portfolio: PortfolioData;
  onOpenResume: () => void;
  onOpenEditor: () => void;
}

export default function Hero({ portfolio, onOpenResume, onOpenEditor }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'stack' | 'philosophy' | 'contact'>('stack');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolio.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Availability Badge */}
            <div 
              id="hero-availability-badge"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{portfolio.statusBadge}</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 
              id="hero-title"
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-50 tracking-tight leading-[1.08] mb-4"
            >
              Hi, I'm <span className="underline decoration-stone-300 dark:decoration-stone-700 decoration-2 underline-offset-4">{portfolio.name}</span>.
              <span className="block text-stone-500 dark:text-stone-400 text-2xl sm:text-3xl lg:text-4xl font-normal mt-2">
                {portfolio.headlineRole}
              </span>
            </h1>

            {/* Bio Paragraph */}
            <p 
              id="hero-bio"
              className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed mb-6"
            >
              {portfolio.bio}
            </p>

            {/* Location & Quick Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500 dark:text-stone-400 mb-8">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                <span>{portfolio.location}</span>
              </span>
              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
              <button 
                id="hero-copy-email-btn"
                type="button" 
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                <span>{portfolio.socials.email}</span>
                {copiedEmail ? (
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 opacity-60" />
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                id="hero-view-projects-btn"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-xl transition-all shadow-sm group"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                id="hero-contact-btn"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl transition-all"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                id="hero-resume-modal-btn"
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Social Icons Strip */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-stone-200 dark:border-stone-800/80 w-full">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider mr-2">Connect:</span>
              {portfolio.socials.github && (
                <a
                  id="hero-social-github"
                  href={portfolio.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {portfolio.socials.linkedin && (
                <a
                  id="hero-social-linkedin"
                  href={portfolio.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {portfolio.socials.twitter && (
                <a
                  id="hero-social-twitter"
                  href={portfolio.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Interactive Architectural Terminal / Card */}
          <div className="lg:col-span-5 w-full">
            <div 
              id="hero-interactive-card"
              className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/90 shadow-sm overflow-hidden"
            >
              {/* Card Window Header */}
              <div className="px-4 py-3 bg-stone-100/80 dark:bg-stone-800/80 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                  <span className="ml-2 font-mono text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    amy.config.ts
                  </span>
                </div>
                
                {/* Tabs */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('stack')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      activeTab === 'stack'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs font-semibold'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                  >
                    Stack
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('philosophy')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      activeTab === 'philosophy'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs font-semibold'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                  >
                    Philosophy
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('contact')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      activeTab === 'contact'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs font-semibold'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                  >
                    Bio
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 font-mono text-xs leading-relaxed text-stone-700 dark:text-stone-300 bg-stone-50/50 dark:bg-stone-950/50 min-h-[260px] flex flex-col justify-between">
                {activeTab === 'stack' && (
                  <div className="space-y-3">
                    <div className="text-stone-400 dark:text-stone-500">// Core capabilities & stack</div>
                    <div>
                      <span className="text-amber-700 dark:text-amber-400">const</span>{' '}
                      <span className="text-blue-700 dark:text-blue-400">developerProfile</span> = {'{'}
                    </div>
                    <div className="pl-4 space-y-1">
                      <div><span className="text-stone-500">primary:</span> <span className="text-emerald-700 dark:text-emerald-400">['React 19', 'TypeScript', 'Next.js']</span>,</div>
                      <div><span className="text-stone-500">styling:</span> <span className="text-emerald-700 dark:text-emerald-400">['Tailwind CSS', 'Radix Primitives']</span>,</div>
                      <div><span className="text-stone-500">backend:</span> <span className="text-emerald-700 dark:text-emerald-400">['Node.js', 'Express', 'PostgreSQL']</span>,</div>
                      <div><span className="text-stone-500">architecture:</span> <span className="text-emerald-700 dark:text-emerald-400">['Micro-frontends', 'CRDTs', 'WebGL']</span>,</div>
                      <div><span className="text-stone-500">availability:</span> <span className="text-purple-700 dark:text-purple-400">true</span></div>
                    </div>
                    <div>{'}'};</div>
                  </div>
                )}

                {activeTab === 'philosophy' && (
                  <div className="space-y-2.5">
                    <div className="text-stone-400 dark:text-stone-500">// Engineering principles</div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-stone-400">01.</span>
                        <span><strong className="text-stone-900 dark:text-stone-100">Speed is a Feature:</strong> Sub-100ms interactions, zero runtime bloat, and clean bundle boundaries.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-stone-400">02.</span>
                        <span><strong className="text-stone-900 dark:text-stone-100">A11y First:</strong> Accessibility isn't an afterthought; WCAG compliance baked into primitives.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-stone-400">03.</span>
                        <span><strong className="text-stone-900 dark:text-stone-100">Architectural Rigor:</strong> Predictable state machines, typed schemas, resilient error boundaries.</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-3">
                    <div className="text-stone-400 dark:text-stone-500">// Direct developer coordinates</div>
                    <div className="space-y-1.5">
                      <div><span className="text-stone-500">name:</span> "{portfolio.name}"</div>
                      <div><span className="text-stone-500">email:</span> "{portfolio.socials.email}"</div>
                      <div><span className="text-stone-500">location:</span> "{portfolio.location}"</div>
                      <div><span className="text-stone-500">preferredRoles:</span> ["Full Stack", "Senior Frontend", "Design Systems"]</div>
                    </div>
                    <div className="pt-2">
                      <a 
                        href={`mailto:${portfolio.socials.email}`}
                        className="inline-flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-bold hover:underline"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send quick email &rarr;</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Card Footer info */}
                <div className="pt-4 mt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-stone-400" />
                    <span>Personalized Live Data</span>
                  </span>
                  <button
                    type="button"
                    onClick={onOpenEditor}
                    className="hover:text-stone-900 dark:hover:text-stone-100 underline decoration-stone-300"
                  >
                    Edit details
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Highlighted Stats Counter Strip */}
        <div 
          id="hero-stats-strip" 
          className="mt-16 pt-8 border-t border-stone-200/90 dark:border-stone-800/90 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {portfolio.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
