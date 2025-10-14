'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

export default function ValidateSelfie() {
  const router = useRouter();
  const { t, language, changeLanguage } = useTranslation();
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  useEffect(() => {
    // Load existing photos from localStorage
    const savedPhotos = localStorage.getItem('selfie-photos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }

    // Get current photo from sessionStorage
    const photoData = sessionStorage.getItem('current-photo');
    if (photoData) {
      setCurrentPhoto(photoData);
    } else {
      // No photo, go back to take selfie
      router.push('/take-selfie');
    }
  }, [router]);

  const handleValidate = () => {
    if (!currentPhoto) return;

    const updatedPhotos = [...photos, currentPhoto];
    setPhotos(updatedPhotos);
    localStorage.setItem('selfie-photos', JSON.stringify(updatedPhotos));
    sessionStorage.removeItem('current-photo');

    if (updatedPhotos.length >= 4) {
      // All photos taken, go to form
      router.push('/form');
    } else {
      // Take another photo
      router.push('/take-selfie');
    }
  };

  const handleRetake = () => {
    // Clear current photo only (not all photos)
    sessionStorage.removeItem('current-photo');
    // Go back to take selfie (mantiene las fotos ya guardadas)
    router.push('/take-selfie');
  };

  if (!currentPhoto) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center overflow-hidden">
        <div className="text-white text-xl">{t.validateSelfie.loading}</div>
      </div>
    );
  }

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
      <div className="flex justify-center pt-16 pb-4">
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
      <div className="flex flex-col items-center justify-center px-6 pb-20">
        {/* Counter Circles */}
        <div className="flex gap-3 mb-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full border-2 border-white transition-all ${
                index < photos.length
                  ? 'bg-white'
                  : index === photos.length
                  ? 'bg-white/50'
                  : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Title Medium */}
        <h2 className="title-medium text-white text-center mb-4">
          {t.validateSelfie.title}
        </h2>

        {/* Photo Preview */}
        <div className="relative w-full max-w-sm aspect-square mb-4 bg-black/20 rounded-lg overflow-hidden">
          <img
            src={currentPhoto}
            alt="Selfie preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Buttons */}
        <div className="w-full max-w-xs space-y-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleValidate}
            className="w-full"
          >
            {t.validateSelfie.buttonValidate}
          </Button>

          <button
            onClick={handleRetake}
            className="button-text w-full text-white underline hover:no-underline transition-all"
          >
            {t.validateSelfie.buttonRetake}
          </button>
        </div>
      </div>
    </div>
  );
}
