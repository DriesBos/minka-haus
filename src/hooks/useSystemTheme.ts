import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

// Subscribe to system theme changes
function subscribe(callback: () => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

// Get current system theme (client-side)
function getSnapshot(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// Server-side snapshot (default to light)
function getServerSnapshot(): Theme {
  return 'light';
}

/**
 * Hook to get the system theme using useSyncExternalStore
 * This properly handles hydration and avoids mismatches
 */
export function useSystemTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
