'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/start');
  }, [router]);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center overflow-hidden">
      <div className="text-white text-xl">CHARGEMENT...</div>
    </div>
  );
}
