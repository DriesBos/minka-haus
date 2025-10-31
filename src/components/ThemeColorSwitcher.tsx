'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export default function ThemeColorSwitcher() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Remove existing theme-color meta tag
    const existingMetaTag = document.querySelector('meta[name="theme-color"]');
    if (existingMetaTag) {
      existingMetaTag.remove();
    }

    // Create new theme-color meta tag
    const metaTag = document.createElement('meta');
    metaTag.name = 'theme-color';
    metaTag.content = theme === 'light' ? '#D4D5CD' : '#161718';
    document.head.appendChild(metaTag);
  }, [theme]);

  return null;
}
