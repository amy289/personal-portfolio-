import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import PortfolioEditorModal from './components/PortfolioEditorModal';
import { initialPortfolioData } from './data/defaultPortfolio';
import { PortfolioData, ContactSubmission } from './types';

const STORAGE_KEY = 'amyy_portfolio_data_v6';
const MESSAGES_KEY = 'amyy_portfolio_messages_v6';
const THEME_KEY = 'amyy_portfolio_theme';

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
          const parsed = JSON.parse(saved);
          // Verify it matches Amyy's student profile schema
          if (parsed.name === 'Amyy' && parsed.education && parsed.institution) {
            if (parsed.email === 'marimehndi@gmail.com') {
              parsed.email = 'amyyb871@gmail.com';
            }
            if (parsed.socials?.email === 'marimehndi@gmail.com') {
              parsed.socials.email = 'amyyb871@gmail.com';
            }
            if (parsed.statusBadge === 'Seeking Paid Internship') {
              parsed.statusBadge = 'BS Software Engineering • 2nd Year';
            }
            return parsed;
          }
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
    return [];
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
    <div id="portfolio-app-root" className="min-h-screen bg-[#F5F2EB] text-stone-900 dark:bg-stone-950 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      
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

        <EducationSection
          education={portfolio.education}
          certifications={portfolio.certifications}
        />

        <ProjectsSection
          projects={portfolio.projects}
        />

        <ContactSection
          email={portfolio.email}
          phone={portfolio.phone}
          location={portfolio.location}
          careerObjective={portfolio.careerObjective}
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
