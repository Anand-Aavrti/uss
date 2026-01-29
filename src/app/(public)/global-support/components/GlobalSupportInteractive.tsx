'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import SupportHero from './SupportHero';
import QuickAccessCards from './QuickAccessCards';
import KnowledgeBase from './KnowledgeBase';
import CommunityForums from './CommunityForums';
import StatusDashboard from './StatusDashboard';
import ChatbotModal from './ChatbotModal';
import TicketModal from './TicketModal';
import SupportFooter from './SupportFooter';

export default function GlobalSupportInteractive() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const savedLanguage = localStorage.getItem('uss-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    if (isHydrated) {
      localStorage.setItem('uss-language', lang);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background ">
        <div className="h-[72px] bg-card shadow-md"></div>
        <div className="animate-pulse">
          <div className="h-96 bg-gradient-to-br from-primary via-secondary to-primary"></div>
          <div className="max-w-7xl mx-auto px-6 py-16 space-y-8">
            <div className="h-64 bg-surface rounded-lg"></div>
            <div className="h-96 bg-surface rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <SupportHero onLanguageChange={handleLanguageChange} currentLanguage={currentLanguage} />
        <QuickAccessCards
          currentLanguage={currentLanguage}
          onChatOpen={() => setIsChatOpen(true)}
          onTicketOpen={() => setIsTicketOpen(true)}
        />
        <KnowledgeBase currentLanguage={currentLanguage} />
        <CommunityForums currentLanguage={currentLanguage} />
        <StatusDashboard currentLanguage={currentLanguage} />
        <SupportFooter currentLanguage={currentLanguage} />
      </main>

      <ChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentLanguage={currentLanguage}
      />
      <TicketModal
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
