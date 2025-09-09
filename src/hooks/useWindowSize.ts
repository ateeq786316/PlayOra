/**
 * PlayOra Window Size Hook
 * Tracks window dimensions and provides responsive utilities
 */

import { useState, useEffect } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoint helpers
  const isXs = windowSize.width < 360;
  const isSm = windowSize.width >= 360 && windowSize.width < 768;
  const isMd = windowSize.width >= 768 && windowSize.width < 1024;
  const isLg = windowSize.width >= 1024 && windowSize.width < 1280;
  const isXl = windowSize.width >= 1280 && windowSize.width < 1536;
  const is2xl = windowSize.width >= 1536;
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  return {
    ...windowSize,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isMobile,
    isTablet,
    isDesktop,
  };
}