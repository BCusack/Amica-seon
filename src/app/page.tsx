'use client'

export const runtime = "edge";

import { useEffect, useState, useCallback } from 'react';
import { MouseFollower } from '@/app/components/MouseFollower';
import { MainContent } from '@/app/components/MainContent';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blurPosition, setBlurPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBlurPositionChange = useCallback((x: number, y: number) => {
    setBlurPosition({ x, y });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geistMono">
      <MouseFollower 
        mousePosition={mousePosition} 
        onPositionChange={handleBlurPositionChange}
      />
      <MainContent blurPosition={blurPosition} />
    </div>
  );
}
