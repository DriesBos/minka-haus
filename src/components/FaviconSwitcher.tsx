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
    pngFavicon.sizes = '32x32';
    pngFavicon.href = `/${prefix}-32x32.png`;
    document.head.appendChild(pngFavicon);

    const smallPngFavicon = document.createElement('link');
    smallPngFavicon.rel = 'icon';
    smallPngFavicon.type = 'image/png';
    smallPngFavicon.sizes = '16x16';
    smallPngFavicon.href = `/${prefix}-16x16.png`;
    document.head.appendChild(smallPngFavicon);

    const icoFavicon = document.createElement('link');
    icoFavicon.rel = 'icon';
    icoFavicon.type = 'image/x-icon';
    icoFavicon.href = `/${prefix}.ico`;
    document.head.appendChild(icoFavicon);
  }, [theme]);

  return null;
}
