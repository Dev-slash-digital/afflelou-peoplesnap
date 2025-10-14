'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

export default function TakeSelfie() {
  const router = useRouter();
  const { t, language, changeLanguage } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1080, height: 1080 },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsReady(true);
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert(t.takeSelfie.errorMessage);
      router.push('/permission');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const photoData = canvas.toDataURL('image/jpeg', 0.9);

      // Store in sessionStorage temporarily
      sessionStorage.setItem('current-photo', photoData);

      // Navigate to validate page
      stopCamera();
      router.push('/validate-selfie');
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
        {/* Title Medium */}
        <h2 className="title-medium text-white text-center mb-4">
          {t.takeSelfie.title}
        </h2>

        {/* Camera Preview */}
        <div className="relative w-full max-w-sm aspect-square mb-4 bg-black/20 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-lg">{t.takeSelfie.loading}</div>
            </div>
          )}
        </div>

        {/* Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={capturePhoto}
          disabled={!isReady}
          className="w-full max-w-xs"
        >
          {t.takeSelfie.button}
        </Button>
      </div>
    </div>
  );
}
