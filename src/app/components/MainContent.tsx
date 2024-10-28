'use client'

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface MainContentProps {
  blurPosition: { x: number; y: number };
}

interface WordSpanProps {
  children: string;
  className?: string;
  blurPosition: { x: number; y: number };
}

function WordSpan({ children, className = "", blurPosition }: WordSpanProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  const isOverlapping = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const elementCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    const distance = Math.sqrt(
      Math.pow(blurPosition.x + 150 - elementCenter.x, 2) + 
      Math.pow(blurPosition.y + 150 - elementCenter.y, 2)
    );

    return distance < 150;
  };

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.style.color = isOverlapping(spanRef.current) ? '#00ffff' : 'white';
    }
  }, [blurPosition]);

  return (
    <motion.span
      ref={spanRef}
      className={`inline-block transition-colors duration-200 ${className}`}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {children}
    </motion.span>
  );
}

export function MainContent({ blurPosition }: MainContentProps) {
  const title = "Amica Seon".split(" ");
  const subtitle = "Personal Companion AI".split(" ");
  const comingSoon = "Coming Soon".split(" ");

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center text-center">
      <h2 className="text-3xl sm:text-5xl flex gap-4 flex-wrap justify-center">
        {title.map((word, i) => (
          <WordSpan key={i} blurPosition={blurPosition}>
            {word}
          </WordSpan>
        ))}
      </h2>
      
      <h3 className="text-4x1 flex gap-2 flex-wrap justify-center">
        {subtitle.map((word, i) => (
          <WordSpan key={i} blurPosition={blurPosition}>
            {word}
          </WordSpan>
        ))}
      </h3>
      
      <div className="text-sm flex gap-2 flex-wrap justify-center">
        {comingSoon.map((word, i) => (
          <WordSpan key={i} blurPosition={blurPosition}>
            {word}
          </WordSpan>
        ))}
      </div>
    </main>
  );
}
