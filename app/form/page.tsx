'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { buildPath } from '@/lib/navigation';

export default function FormPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, language, changeLanguage } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
  });

  useEffect(() => {
    // Extract and save store from URL
    const pathParts = pathname.split('/').filter(Boolean);
    const knownRoutes = ['start', 'permission', 'take-selfie', 'validate-selfie', 'form', 'final-processing'];
    
    if (pathParts.length > 0 && !knownRoutes.includes(pathParts[0])) {
      const storeName = pathParts[0];
      localStorage.setItem('current-store', storeName);
    }

    // Check if user has taken 4 photos
    const savedPhotos = localStorage.getItem('selfie-photos');
    if (!savedPhotos) {
      router.push(buildPath('/start', pathname));
      return;
    }
    
    const photos = JSON.parse(savedPhotos);
    if (photos.length < 4) {
      router.push(buildPath('/take-selfie', pathname));
    }
  }, [router, pathname]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.nom || !formData.prenom || !formData.email || !formData.dateNaissance) {
      alert(t.form.errorValidation);
      return;
    }

    setIsLoading(true);

    try {
      // Get photos from localStorage
      const savedPhotos = localStorage.getItem('selfie-photos');
      const photos = savedPhotos ? JSON.parse(savedPhotos) : [];

      // Get store from localStorage
      const store = localStorage.getItem('current-store');

      // Prepare data for Supabase
      const registrationData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        date_naissance: formData.dateNaissance,
        photo_1: photos[0] || null,
        photo_2: photos[1] || null,
        photo_3: photos[2] || null,
        photo_4: photos[3] || null,
        store: store || null,
      };

      // Send to Supabase
      const { saveRegistration } = await import('@/lib/supabase');
      await saveRegistration(registrationData);

      // Clear store after successful submission
      localStorage.removeItem('current-store');

      // NO limpiar las fotos aquí - se necesitan en /final-processing
      // Las fotos se limpiarán después de generar el video

      // Navigate to final processing page
      router.push(buildPath('/final-processing', pathname));
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t.form.errorSubmit);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col overflow-hidden">
      {/* Language Selector */}
      <div className="absolute top-4 right-6 z-10">
        <LanguageSelector 
          defaultLanguage={language}
          onLanguageChange={changeLanguage}
        />
      </div>

      {/* Logo */}
      <div className="flex justify-center pt-14 pb-8">
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
        {/* Loading Bar */}
        <div className="w-full max-w-sm mb-12">
          <div className="h-2 bg-white/30 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: isLoading ? '100%' : '0%' }}
            />
          </div>
        </div>

        {/* Form Inputs */}
        <div className="w-full max-w-sm space-y-4 mb-8">
          <Input
            type="text"
            placeholder={t.form.placeholderNom}
            value={formData.nom}
            onChange={handleInputChange('nom')}
            disabled={isLoading}
          />

          <Input
            type="text"
            placeholder={t.form.placeholderPrenom}
            value={formData.prenom}
            onChange={handleInputChange('prenom')}
            disabled={isLoading}
          />

          <Input
            type="email"
            placeholder={t.form.placeholderEmail}
            value={formData.email}
            onChange={handleInputChange('email')}
            disabled={isLoading}
          />

          <Input
            type="date"
            placeholder={t.form.placeholderDate}
            value={formData.dateNaissance}
            onChange={handleInputChange('dateNaissance')}
            disabled={isLoading}
          />
        </div>

        {/* Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full max-w-sm"
        >
          {isLoading ? t.form.buttonLoading : t.form.button}
        </Button>
      </div>
    </div>
  );
}
