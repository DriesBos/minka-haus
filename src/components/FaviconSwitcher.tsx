'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export default function FaviconSwitcher() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Find all favicon links
    const existingFavicons = document.querySelectorAll(
      "link[rel='icon'], link[rel='shortcut icon']"
    );

    // Remove all existing favicons
    existingFavicons.forEach((link) => link.remove());

    // Create new favicon link
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/x-icon';
    favicon.href =
      theme === 'dark' ? '/favicon-dark.ico' : '/favicon-light.ico';

    document.head.appendChild(favicon);
  }, [theme]);

  return null;
}
