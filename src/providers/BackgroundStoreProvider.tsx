'use client';

import { ReactNode } from 'react';

interface BackgroundStoreProviderProps {
  children: ReactNode;
}

export default function BackgroundStoreProvider({
  children,
}: BackgroundStoreProviderProps) {
  return <>{children}</>;
}
