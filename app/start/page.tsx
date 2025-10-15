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
        <div className="w-full max-w-md mb-4">
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
                <h2 className="text-xl font-bold">Terms and Conditions</h2>
                <button onClick={() => setShowTerms(false)} className="text-2xl">&times;</button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="prose prose-sm max-w-none text-gray-700">
                <h1 className="text-lg font-bold mb-4">Terms and Conditions for Peoplesnap</h1>
                <p className="mb-4">Welcome to <strong>Peoplesnap</strong>, the innovative web application designed exclusively for <strong>Afflelou</strong> events brought to you by the collaboration between <strong>Afflelou</strong> and <strong>Slash Experience</strong>.</p>
                <p className="mb-4">By utilizing Peoplesnap, you agree to these Terms and Conditions, which govern your access to and use of our Service. If you do not agree with any part of these terms, please do not use Peoplesnap.</p>
                <h2 className="text-base font-bold mt-6 mb-3">1. Service Description</h2>
                <p className="mb-4">Peoplesnap offers an interactive experience where users can take a selfie using their smartphone. These images are then artistically modified by removing the background and integrating them into a picture featuring a distinctive <strong>Afflelou</strong> background, creating a memorable digital keepsake of the event.</p>
                <h2 className="text-base font-bold mt-6 mb-3">2. Acceptance of Terms</h2>
                <h3 className="text-sm font-bold mt-4 mb-2">2.1 Age Requirement</h3>
                <p className="mb-3">The Service is available to individuals aged <strong>13 years or older</strong>. Users under the age of 18 must review these Terms and Conditions with a parent or guardian to ensure understanding and agreement.</p>
                <h3 className="text-sm font-bold mt-4 mb-2">2.2 User Commitment</h3>
                <p className="mb-4">You commit to using Peoplesnap solely for its intended purpose and in accordance with these Terms, applicable laws, and general societal norms.</p>
                <h2 className="text-base font-bold mt-6 mb-3">3. Intellectual Property</h2>
                <p className="mb-4">The content you provide remains yours. By using our Service, you grant <strong>Afflelou</strong> a worldwide, non-exclusive, royalty-free license to use this content as part of the event&apos;s promotional materials and for the creation of a photo mosaic. This includes the right to <strong>modify, reproduce, and distribute</strong> your content.</p>
                <h2 className="text-base font-bold mt-6 mb-3">4. Privacy & Data Use</h2>
                <h3 className="text-sm font-bold mt-4 mb-2">4.1 Consent to Use of Data</h3>
                <p className="mb-3">You agree to the collection and use of your personal information in accordance with Peoplesnap&apos;s Privacy Policy. This includes storing your selfies on our servers for up to <strong>one year</strong> to facilitate the creation and retrieval of your video clip.</p>
                <h3 className="text-sm font-bold mt-4 mb-2">4.2 Data Retention Policy</h3>
                <p className="mb-4">Your selfies will be retained on the Peoplesnap servers for a period of <strong>one (1) year</strong>. Post this period, all images will be permanently deleted in accordance with our data protection policies.</p>
                <h2 className="text-base font-bold mt-6 mb-3">5. Limitations of Liability</h2>
                <p className="mb-4"><strong>Afflelou Consumer Care</strong> will not be liable for any indirect damages arising from your use of Peoplesnap. This limitation of liability applies to damages of any kind, including but not limited to <strong>loss of data or profit</strong>.</p>
                <h2 className="text-base font-bold mt-6 mb-3">6. Amendments to Terms</h2>
                <p className="mb-4"><strong>Afflelou Consumer Care</strong> reserves the right to update or change these Terms at any time. Continued use of the Service after such changes will constitute your consent to the updated terms.</p>
                <h2 className="text-base font-bold mt-6 mb-3">7. Jurisdiction</h2>
                <p className="mb-4">These Terms are governed by the laws of the jurisdiction in which <strong>Afflelou</strong> operates, without regard to its conflict of law provisions.</p>
                <h2 className="text-base font-bold mt-6 mb-3">8. Contact Information</h2>
                <p className="mb-4">Should you have any questions regarding these Terms and Conditions, please feel free to contact us.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
