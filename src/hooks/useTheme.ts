import { useSystemTheme } from './useSystemTheme';
import { useThemeStore } from '@/store/useThemeStore';

type Theme = 'light' | 'dark';

/**
 * Hook that returns the effective theme
 * Uses user preference if set, otherwise falls back to system theme
 */
export function useTheme(): Theme {
  const systemTheme = useSystemTheme();
  const userTheme = useThemeStore((state) => state.userTheme);

  // User preference takes priority over system theme
  return userTheme ?? systemTheme;
}

/**
 * Hook that returns theme utilities
 */
export function useThemeActions() {
  const systemTheme = useSystemTheme();
  const userTheme = useThemeStore((state) => state.userTheme);
  const setUserTheme = useThemeStore((state) => state.setUserTheme);

  const currentTheme = userTheme ?? systemTheme;

  const toggleTheme = () => {
    setUserTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const resetToSystem = () => {
    setUserTheme(null);
  };

  return {
    theme: currentTheme,
    systemTheme,
    userTheme,
    setUserTheme,
    toggleTheme,
    resetToSystem,
    isUsingSystemTheme: userTheme === null,
  };
}
