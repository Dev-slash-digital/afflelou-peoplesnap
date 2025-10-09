'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PhotoContextType {
  photos: string[];
  currentPhoto: string | null;
  setCurrentPhoto: (photo: string | null) => void;
  addPhoto: (photo: string) => void;
  clearPhotos: () => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export function PhotoProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selfie-photos');
    if (saved) {
      setPhotos(JSON.parse(saved));
    }
  }, []);

  const addPhoto = (photo: string) => {
    const updated = [...photos, photo];
    setPhotos(updated);
    localStorage.setItem('selfie-photos', JSON.stringify(updated));
  };

  const clearPhotos = () => {
    setPhotos([]);
    localStorage.removeItem('selfie-photos');
  };

  return (
    <PhotoContext.Provider value={{ photos, currentPhoto, setCurrentPhoto, addPhoto, clearPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within PhotoProvider');
  }
  return context;
}
