'use client'

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface MouseFollowerProps {
  mousePosition: { x: number; y: number };
  onPositionChange: (x: number, y: number) => void;
}

export function MouseFollower({ mousePosition, onPositionChange }: MouseFollowerProps) {
  useEffect(() => {
    // Calculate the center of the blur circle
    const blurX = mousePosition.x - 150;
    const blurY = mousePosition.y - 150;
    onPositionChange(blurX, blurY);
  }, [mousePosition, onPositionChange]);

  return (
    <motion.div
      className="fixed w-[300px] h-[300px] bg-white/50 rounded-full pointer-events-none blur-[100px]"
      initial={{ left: mousePosition.x, top: mousePosition.y }}
      animate={{
        left: mousePosition.x - 150,
        top: mousePosition.y - 150
      }}
      transition={{
        type: "spring",
        damping: 50,
        stiffness: 200,
        mass: 0.7
      }}
      style={{
        zIndex: -1,
      }}
    />
  );
}
