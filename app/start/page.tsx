'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

export default function InicioPage() {
  const router = useRouter();
  const { t, language, changeLanguage } = useTranslation();

  const handleContinue = () => {
    router.push('/permission', { scroll: false });
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col overflow-hidden">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector 
          defaultLanguage={language}
          onLanguageChange={changeLanguage}
        />
      </div>

      {/* Logo */}
      <div className="flex justify-center pt-16 pb-8">
        <Image
          src="/logo-svg.svg"
          alt="Magic Afflelou Logo"
          width={200}
          height={86}
          priority
          unoptimized
          className="max-w-[200px] w-full h-auto"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Images */}
        <div className="flex gap-4 mb-8">
          <Image
            src="/imagen-1.png"
            alt="Magic Sunny 1"
            width={100}
            height={350}
            priority
            unoptimized
            className="object-cover pb-5"
          />
          <Image
            src="/imagen-2.png"
            alt="Magic Sunny 2"
            width={100}
            height={350}
            priority
            unoptimized
            className="object-cover pt-5"
          />
          <Image
            src="/imagen-3.png"
            alt="Magic Sunny 3"
            width={100}
            height={350}
            priority
            unoptimized
            className="object-cover pb-5"
          />
        </div>

        {/* Title Medium */}
        <h2 className="title-medium text-white text-center">
          {t.start.titleMedium}
        </h2>

        {/* Title Large */}
        <h1 className="title-large text-white text-center mb-12">
          {t.start.titleLarge}
        </h1>

        {/* Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
          className="w-full max-w-xs"
        >
          {t.start.button}
        </Button>
      </div>
    </div>
  );
}
