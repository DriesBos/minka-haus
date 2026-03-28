'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function FaviconSwitcher() {
  const theme = useTheme();

  useEffect(() => {
    const prefix = theme === 'dark' ? 'favicon-dark' : 'favicon-light';
    const svgFavicon = document.getElementById('favicon-svg');
    const pngFavicon = document.getElementById('favicon-32');
    const smallPngFavicon = document.getElementById('favicon-16');
    const icoFavicon = document.getElementById('favicon-ico');

    if (svgFavicon) {
      svgFavicon.setAttribute('href', `/${prefix}.svg`);
    }

    if (pngFavicon) {
      pngFavicon.setAttribute('href', `/${prefix}-32x32.png`);
    }

    if (smallPngFavicon) {
      smallPngFavicon.setAttribute('href', `/${prefix}-16x16.png`);
    }

    if (icoFavicon) {
      icoFavicon.setAttribute('href', `/${prefix}.ico`);
    }
  }, [theme]);

  return null;
}
