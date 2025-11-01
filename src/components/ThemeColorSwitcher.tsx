'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { useEnteredStore } from '@/store/useEnteredStore';

export default function ThemeColorSwitcher() {
  const theme = useThemeStore((state) => state.theme);
  const hasEntered = useEnteredStore((state) => state.hasEntered);
  const [delayedEntered, setDelayedEntered] = useState(false);

  // Delay the hasEntered state change by 1.5 seconds
  useEffect(() => {
    if (hasEntered) {
      const timer = setTimeout(() => {
        setDelayedEntered(true);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setDelayedEntered(false);
    }
  }, [hasEntered]);

  useEffect(() => {
    // Remove existing theme-color meta tag
    const existingMetaTag = document.querySelector('meta[name="theme-color"]');
    if (existingMetaTag) {
      existingMetaTag.remove();
    }

    // Create new theme-color meta tag
    const metaTag = document.createElement('meta');
    metaTag.name = 'theme-color';
    metaTag.content =
      theme === 'light'
        ? delayedEntered
          ? '#D4D5CD'
          : '#D9DAD3'
        : delayedEntered
        ? '#161718'
        : '#0C0D0D';
    document.head.appendChild(metaTag);
  }, [theme, delayedEntered]);

  return null;
}
