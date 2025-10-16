'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// import Image from 'next/image';
import { Button } from '@/components/Button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { buildPath } from '@/lib/navigation';

export default function InicioPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, language, changeLanguage } = useTranslation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleContinue = () => {
    if (!termsAccepted) {
      alert(t.start.termsRequired);
      return;
    }
    router.push(buildPath('/permission', pathname), { scroll: false });
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

      {/* Logo - OCULTO TEMPORALMENTE */}
      {/* <div className="flex justify-center pt-16 pb-8">
        <Image
          src="/logo-svg.svg"
          alt="Magic Afflelou Logo"
          width={200}
          height={86}
          priority
          unoptimized
          className="max-w-[200px] w-full h-auto"
        />
      </div> */}

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-10 mt-14 overflow-hidden">
        {/* Video de introducción */}
        <div className="w-full max-w-md mb-4 px-4">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          >
            <source
              src="https://dev.slash-digital.io/wp-content/uploads/2025/10/Gif-afflelou-v1.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Images - OCULTAS TEMPORALMENTE */}
        {/* <div className="flex gap-4 mb-8">
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
        </div> */}

        {/* Title Medium - OCULTO TEMPORALMENTE */}
        {/* <h2 className="title-medium text-white text-center">
          {t.start.titleMedium}
        </h2> */}

        {/* Title Large - OCULTO TEMPORALMENTE */}
        {/* <h1 className="title-large text-white text-center mb-12">
          {t.start.titleLarge}
        </h1> */}

        {/* Checkbox de términos */}
        <div className="mb-4 w-full max-w-xs">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-black border-2 border-white rounded focus:ring-white focus:ring-2"
            />
            <span
              className="text-black text-left cursor-pointer underline mt-1"
              style={{ fontSize: '12px' }}
              onClick={() => setShowTerms(true)}
            >
              {t.start.termsCheckbox}
            </span>
          </label>
        </div>

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

      {/* Bottom Sheet de términos */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50" onClick={() => setShowTerms(false)}>
          <div className="bg-white w-full max-w-2xl rounded-t-3xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t.start.termsTitle}</h2>
                <button onClick={() => setShowTerms(false)} className="text-2xl">&times;</button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.intro1 }} />
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.intro2 }} />

                <h2 className="text-base font-bold mt-6 mb-3">{t.start.termsContent.section1Title}</h2>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section1Content }} />

                <h2 className="text-base font-bold mt-6 mb-3">{t.start.termsContent.section2Title}</h2>
                <h3 className="text-sm font-bold mt-4 mb-2">{t.start.termsContent.section2Subtitle1}</h3>
                <p className="mb-3" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section2Content1 }} />
                <h3 className="text-sm font-bold mt-4 mb-2">{t.start.termsContent.section2Subtitle2}</h3>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section2Content2 }} />

                <h2 className="text-base font-bold mt-6 mb-3">{t.start.termsContent.section3Title}</h2>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section3Content }} />

                <h2 className="text-base font-bold mt-6 mb-3">{t.start.termsContent.section4Title}</h2>
                <h3 className="text-sm font-bold mt-4 mb-2">{t.start.termsContent.section4Subtitle1}</h3>
                <p className="mb-3" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section4Content1 }} />
                <h3 className="text-sm font-bold mt-4 mb-2">{t.start.termsContent.section4Subtitle2}</h3>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section4Content2 }} />

                <h2 className="text-base font-bold mt-6 mb-3">{t.start.termsContent.section5Title}</h2>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section5Content }} />

                <h2 className="text-base font-bold mt-6 mb-3">{t.start.termsContent.section6Title}</h2>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section6Content }} />

                <h2 className="text-base font-bold mt-6 mb-3">{t.start.termsContent.section7Title}</h2>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section7Content }} />

                <h2 className="text-base font-bold mt-6 mb-3">{t.start.termsContent.section8Title}</h2>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.start.termsContent.section8Content }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
