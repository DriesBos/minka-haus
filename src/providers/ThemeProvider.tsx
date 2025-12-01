'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();

  useEffect(() => {
    // Update the body data-theme attribute when theme changes
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
