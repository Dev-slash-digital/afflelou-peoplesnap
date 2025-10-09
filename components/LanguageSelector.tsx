'use client';

import React, { useState } from 'react';

type Language = 'EN' | 'FR';

interface LanguageSelectorProps {
  defaultLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  defaultLanguage = 'FR',
  onLanguageChange,
  className = '',
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    onLanguageChange?.(lang);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => handleLanguageChange('FR')}
        className={`px-3 py-1 font-normal transition-colors ${
          selectedLanguage === 'FR'
            ? 'text-white underline'
            : 'text-white/70 hover:text-white'
        }`}
      >
        FR
      </button>
      <span className="text-white">|</span>
      <button
        onClick={() => handleLanguageChange('EN')}
        className={`px-3 py-1 font-normal transition-colors ${
          selectedLanguage === 'EN'
            ? 'text-white underline'
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};
