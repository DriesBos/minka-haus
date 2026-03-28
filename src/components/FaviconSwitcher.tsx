'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function FaviconSwitcher() {
  const theme = useTheme();

  useEffect(() => {
    const prefix = theme === 'dark' ? 'favicon-dark' : 'favicon-light';
    const version =
      document.documentElement.getAttribute('data-favicon-version');
    const withVersion = (path: string) =>
      version ? `${path}?v=${version}` : path;
    const upsertLink = (
      id: string,
      rel: string,
      href: string,
      type: string,
      sizes?: string
    ) => {
      let link = document.getElementById(id) as HTMLLinkElement | null;

      if (!link) {
        link = document.createElement('link');
        link.id = id;
        document.head.appendChild(link);
      }

      link.rel = rel;
      link.type = type;
      link.href = withVersion(href);
      link.removeAttribute('media');

      if (sizes) {
        link.setAttribute('sizes', sizes);
      } else {
        link.removeAttribute('sizes');
      }
    };

    upsertLink(
      'favicon-override-svg',
      'icon',
      `/${prefix}.svg`,
      'image/svg+xml'
    );
    upsertLink(
      'favicon-override-32',
      'icon',
      `/${prefix}-32x32.png`,
      'image/png',
      '32x32'
    );
    upsertLink(
      'favicon-override-16',
      'icon',
      `/${prefix}-16x16.png`,
      'image/png',
      '16x16'
    );
    upsertLink(
      'favicon-override-ico',
      'icon',
      `/${prefix}.ico`,
      'image/x-icon'
    );
  }, [theme]);

  return null;
}
