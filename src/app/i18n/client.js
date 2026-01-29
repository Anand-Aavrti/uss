'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend'; // ✅ REQUIRED

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend) // ✅ THIS WAS MISSING
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'hi', 'ar'],

      backend: {
        loadPath: '/locales/{{lng}}/translation.json',
      },

      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
