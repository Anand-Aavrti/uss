'use client';

import { useState, useEffect } from 'react';
// import HeroSection from './HeroSection';
import TechnicalCapabilities from './TechnicalCapabilities';
import ProductShowcase from './ProductShowcase';
import GlobalTrustSection from './GlobalTrustSection';
import CTASection from './CTASection';
import HeroSection from './HeroSection';

const HomepageInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    setIsHydrated(true);

    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('uss_language');
      if (savedLanguage && ['en', 'hi', 'ar'].includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('hi')) {
          setCurrentLanguage('hi');
        } else if (browserLang.startsWith('ar')) {
          setCurrentLanguage('ar');
        }
      }
    }
  }, []);

 

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="min-h-screen "></div>
        <div className="container mx-auto px-6 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
      {/* Language Switcher */}

      <HeroSection />
      <TechnicalCapabilities currentLanguage={currentLanguage} />
      {/* <ProductShowcase currentLanguage={currentLanguage} /> */}
      {/* <GlobalTrustSection currentLanguage={currentLanguage} /> */}
      <CTASection currentLanguage={currentLanguage} />
    </div>
  );
};

export default HomepageInteractive;
