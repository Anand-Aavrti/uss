'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [dir, setDir] = useState('ltr');

  useEffect(() => {
    const saved = localStorage.getItem('uss_language');
    const lang = saved || 'en';
    setLanguage(lang);
    setDir(lang === 'ar' ? 'rtl' : 'ltr');
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setDir(lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('uss_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, dir, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
