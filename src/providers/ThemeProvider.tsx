'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Update the body data-theme attribute when theme changes
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
