'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Button';
// import { IconButton } from '@/components/IconButton';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { buildPath } from '@/lib/navigation';

export default function FinalProcessingPage() {
  const router = useRouter();
  const pathname = usePathname();
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
        router.push(buildPath('/start', pathname));
        return;
      }

      const photos = JSON.parse(savedPhotos);
      if (photos.length < 4) {
        router.push(buildPath('/take-selfie', pathname));
        return;
      }

      // Determinar método de generación (servidor o cliente)
      const useServerGeneration = process.env.NEXT_PUBLIC_USE_SERVER_GENERATION === 'true';

      if (useServerGeneration) {
        // Generar video en el servidor
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const response = await fetch(`${apiUrl}/api/generate-video`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ photos }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al generar el video');
        }

        const data = await response.json();
        // Construir URL completa del video
        const fullVideoUrl = data.videoUrl.startsWith('http')
          ? data.videoUrl
          : `${apiUrl}${data.videoUrl}`;
        setVideoUrl(fullVideoUrl);
        setIsGenerating(false);
      } else {
        // Generar video en el cliente (método original)
        const { VideoGeneratorClient } = await import('@/lib/videoGeneratorClient');
        const generator = new VideoGeneratorClient();

        const videoBlob = await generator.generateVideo(photos);

        // Crear URL del blob
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
        setIsGenerating(false);
      }
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
    router.push(buildPath('/start', pathname));
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
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center overflow-hidden">
      {/* Language Selector */}
      <div className="absolute top-4 right-6 z-10">
        <LanguageSelector
          defaultLanguage={language}
          onLanguageChange={changeLanguage}
        />
      </div>

      {/* Logo */}
      <div className="flex justify-center pt-14 pb-4">
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
      <div className="flex-1 flex flex-col items-center justify-center px-10 pb-20">
        {/* Title */}
        <h1 className="title-normal text-white text-center mb-4 max-w-md">
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
            <div className="w-full max-w-sm mb-2 bg-black/20 overflow-hidden mx-auto">
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
            <div className="w-full max-w-sm space-y-4 mb-2 mx-auto">
              <div className="flex gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  className="flex-1 min-w-[140px] max-w-[180px] flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Image
                    src="/descarga-icon.svg"
                    alt="Descargar"
                    width={20}
                    height={20}
                    unoptimized
                  />
                  {t.finalProcessing.buttonDownload}
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleShare}
                  className="flex-1 min-w-[140px] max-w-[180px] flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Image
                    src="/compartir-icon.svg"
                    alt="Compartir"
                    width={20}
                    height={20}
                    unoptimized
                  />
                  {t.finalProcessing.buttonShare}
                </Button>
              </div>
            </div>

            {/* Copy Text */}
            <div className="w-full max-w-sm mb-2 mx-auto">
              <p className="paragraph text-white text-center mb-4 text-sm">
                {t.finalProcessing.copyLabel}
              </p>
              <div
                onClick={copyToClipboard}
                className="bg-white/20 p-4 rounded-lg cursor-pointer hover:bg-white/30 transition-all flex items-center gap-3"
              >
                <Image
                  src="/copie-icon.svg"
                  alt="Copiar"
                  width={20}
                  height={20}
                  unoptimized
                  className="flex-shrink-0"
                />
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
              className="w-full max-w-sm mx-auto"
            >
              {t.finalProcessing.buttonRestart}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
