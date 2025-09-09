/**
 * PlayOra Theme Hook
 * Manages theme switching and persistence
 */

import { useState, useEffect } from 'react';

export type ThemeType = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeType>('light');

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('playora-theme') as ThemeType;
    if (savedTheme) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setThemeState(systemTheme);
      applyTheme(systemTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('playora-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const applyTheme = (themeType: ThemeType) => {
    const root = document.documentElement;
    if (themeType === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  };
}