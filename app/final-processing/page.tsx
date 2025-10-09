'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

export default function FinalProcessingPage() {
  const router = useRouter();
  const { t, language, changeLanguage } = useTranslation();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    generateVideo();
  }, []);

  const generateVideo = async () => {
    try {
      // Obtener fotos de localStorage
      const savedPhotos = localStorage.getItem('selfie-photos');
      if (!savedPhotos) {
        router.push('/start');
        return;
      }

      const photos = JSON.parse(savedPhotos);
      if (photos.length < 4) {
        router.push('/take-selfie');
        return;
      }

      // Generar video en el cliente
      const { VideoGeneratorClient } = await import('@/lib/videoGeneratorClient');
      const generator = new VideoGeneratorClient();

      const videoBlob = await generator.generateVideo(photos);

      // Crear URL del blob
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);
      setIsGenerating(false);
    } catch (err) {
      console.error('Error:', err);
      setError(t.finalProcessing.error);
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!videoUrl) return;

    try {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `magic-sunny-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Limpiar fotos después de descargar
      localStorage.removeItem('selfie-photos');
      sessionStorage.removeItem('current-photo');
    } catch (err) {
      console.error('Error downloading:', err);
    }
  };

  const handleShare = async () => {
    if (!videoUrl) return;

    try {
      // Obtener el blob del video
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const file = new File([blob], 'magic-sunny.mp4', { type: 'video/mp4' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: t.finalProcessing.title,
          text: t.finalProcessing.copyText,
        });
      } else {
        // Fallback: copiar texto al portapapeles
        await navigator.clipboard.writeText(t.finalProcessing.copyText);
        alert('Texto copiado al portapapeles');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback si falla
      try {
        await navigator.clipboard.writeText(t.finalProcessing.copyText);
        alert('Texto copiado al portapapeles');
      } catch {
        console.error('No se pudo copiar al portapapeles');
      }
    }
  };

  const handleRestart = () => {
    // Limpiar todo
    localStorage.removeItem('selfie-photos');
    sessionStorage.removeItem('current-photo');
    router.push('/start');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(t.finalProcessing.copyText);
      alert('Texto copiado!');
    } catch (err) {
      console.error('Error copying:', err);
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Title */}
        <h1 className="title-normal text-white text-center mb-8 max-w-md">
          {t.finalProcessing.title}
        </h1>

        {isGenerating && (
          <div className="text-white text-xl mb-8">{t.finalProcessing.generating}</div>
        )}

        {error && (
          <div className="text-white text-xl mb-8 text-center">{error}</div>
        )}

        {videoUrl && !isGenerating && (
          <>
            {/* Video Preview */}
            <div className="w-full max-w-sm mb-8 bg-black/20 overflow-hidden">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-auto"
              />
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-sm space-y-4 mb-8">
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                  {t.finalProcessing.buttonDownload}
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                  </svg>
                  {t.finalProcessing.buttonShare}
                </Button>
              </div>
            </div>

            {/* Copy Text */}
            <div className="w-full max-w-sm mb-8">
              <p className="paragraph text-white text-center mb-4 text-sm">
                {t.finalProcessing.copyLabel}
              </p>
              <div
                onClick={copyToClipboard}
                className="bg-white/20 p-4 rounded-lg cursor-pointer hover:bg-white/30 transition-all flex items-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                <p className="paragraph text-white text-sm flex-1">
                  {t.finalProcessing.copyText}
                </p>
              </div>
            </div>

            {/* Restart Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleRestart}
              className="w-full max-w-sm"
            >
              {t.finalProcessing.buttonRestart}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
