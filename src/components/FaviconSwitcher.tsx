'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function FaviconSwitcher() {
  const theme = useTheme();

  useEffect(() => {
    // Find all favicon links
    const existingFavicons = document.querySelectorAll(
      "link[rel='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']"
    );

    // Remove all existing favicons
    existingFavicons.forEach((link) => link.remove());

    const prefix = theme === 'dark' ? 'favicon-dark' : 'favicon-light';

    // Create SVG favicon (best for modern browsers)
    const svgFavicon = document.createElement('link');
    svgFavicon.rel = 'icon';
    svgFavicon.type = 'image/svg+xml';
    svgFavicon.href = `/${prefix}.svg`;
    document.head.appendChild(svgFavicon);

    // Create PNG favicon 96x96 (for Chrome and most browsers)
    const pngFavicon = document.createElement('link');
    pngFavicon.rel = 'icon';
    pngFavicon.type = 'image/png';
    pngFavicon.sizes = '96x96';
    pngFavicon.href = `/${prefix}-96x96.png`;
    document.head.appendChild(pngFavicon);

    // Create ICO fallback (for older browsers)
    const icoFavicon = document.createElement('link');
    icoFavicon.rel = 'icon';
    icoFavicon.type = 'image/x-icon';
    icoFavicon.href = `/${prefix}.ico`;
    document.head.appendChild(icoFavicon);

    // Apple touch icon
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.sizes = '180x180';
    appleTouchIcon.href = `/${prefix}-96x96.png`;
    document.head.appendChild(appleTouchIcon);
  }, [theme]);

  return null;
}
