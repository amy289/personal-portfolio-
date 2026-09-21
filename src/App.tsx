import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import PortfolioEditorModal from './components/PortfolioEditorModal';
import { initialPortfolioData } from './data/defaultPortfolio';
import { PortfolioData, ContactSubmission } from './types';

const STORAGE_KEY = 'amy_portfolio_data_v1';
const MESSAGES_KEY = 'amy_portfolio_messages_v1';
const THEME_KEY = 'amy_portfolio_theme';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Portfolio data state
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved portfolio data', e);
        }
      }
    }
    return initialPortfolioData;
  });

  // Contact messages state
  const [messages, setMessages] = useState<ContactSubmission[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(MESSAGES_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved messages', e);
        }
      }
    }
    return [
      {
        id: 'msg-sample-1',
        name: 'Sarah Lin',
        email: 'sarah.lin@techventures.io',
        subject: 'Senior Frontend Architect Opportunity',
        message: 'Hi Amy, your work on the WebGL real-time collaboration canvas (Prism Studio) is truly remarkable. We are building our next-gen engineering platform and would love to chat with you this week.',
        date: 'Recent'
      }
    ];
  });

  // Modal open states
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Sync theme with document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleSavePortfolio = (newData: PortfolioData) => {
    setPortfolio(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const handleResetPortfolio = () => {
    setPortfolio(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSendMessage = (submission: Omit<ContactSubmission, 'id' | 'date'>) => {
    const newMsg: ContactSubmission = {
      ...submission,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  };

  const handleClearMessages = () => {
    setMessages([]);
    localStorage.removeItem(MESSAGES_KEY);
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Anchor for top of page */}
      <div id="top" />

      {/* Navigation Bar */}
      <Navbar
        portfolio={portfolio}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="grow">
        <Hero
          portfolio={portfolio}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        <AboutSection
          portfolio={portfolio}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <ProjectsSection
          projects={portfolio.projects}
        />

        <SkillsSection
          skills={portfolio.skills}
        />

        <ExperienceSection
          experience={portfolio.experience}
          education={portfolio.education}
        />

        <TestimonialsSection
          testimonials={portfolio.testimonials}
        />

        <ContactSection
          socials={portfolio.socials}
          location={portfolio.location}
          onSendMessage={handleSendMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        portfolio={portfolio}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Interactive Resume Modal */}
      <ResumeModal
        portfolio={portfolio}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* In-App Portfolio Customizer / Live Editor */}
      <PortfolioEditorModal
        portfolio={portfolio}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSavePortfolio}
        onReset={handleResetPortfolio}
        messages={messages}
        onClearMessages={handleClearMessages}
      />

    </div>
  );
}
