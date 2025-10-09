'use client';

import { useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('FR');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && (savedLang === 'FR' || savedLang === 'EN')) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = translations[language];

  return { t, language, changeLanguage };
}
