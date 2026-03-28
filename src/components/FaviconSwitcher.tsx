'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function FaviconSwitcher() {
  const theme = useTheme();

  useEffect(() => {
    // Remove only theme-switched favicon links. Keep touch/app icons intact.
    const existingFavicons = document.querySelectorAll(
      "link[rel='icon'], link[rel='shortcut icon']"
    );

    existingFavicons.forEach((link) => link.remove());

    const prefix = theme === 'dark' ? 'favicon-dark' : 'favicon-light';

    const svgFavicon = document.createElement('link');
    svgFavicon.rel = 'icon';
    svgFavicon.type = 'image/svg+xml';
    svgFavicon.href = `/${prefix}.svg`;
    document.head.appendChild(svgFavicon);

    const pngFavicon = document.createElement('link');
    pngFavicon.rel = 'icon';
    pngFavicon.type = 'image/png';
    pngFavicon.sizes = '96x96';
    pngFavicon.href = `/${prefix}-96x96.png`;
    document.head.appendChild(pngFavicon);

    const icoFavicon = document.createElement('link');
    icoFavicon.rel = 'icon';
    icoFavicon.type = 'image/x-icon';
    icoFavicon.href = `/${prefix}.ico`;
    document.head.appendChild(icoFavicon);
  }, [theme]);

  return null;
}
