'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

export default function PermisoPage() {
  const router = useRouter();
  const { t, language, changeLanguage } = useTranslation();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestPermission = async () => {
    setIsRequesting(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });

      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());

      // Navigate to next page
      router.push('/take-selfie', { scroll: false });
    } catch (error) {
      console.error('Camera permission denied:', error);
      alert(t.permission.errorMessage);
      setIsRequesting(false);
    }
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
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        {/* Title Medium */}
        <h2 className="title-medium text-white text-center mb-8 max-w-md">
          {t.permission.title}
        </h2>

        {/* Paragraph */}
        <p className="paragraph text-white text-center mb-16 max-w-lg">
          {t.permission.description}
        </p>

        {/* Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleRequestPermission}
          disabled={isRequesting}
          className="w-full max-w-xs"
        >
          {t.permission.button}
        </Button>
      </div>
    </div>
  );
}
