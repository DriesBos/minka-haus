import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  userTheme: Theme | null; // null means "use system theme"
  setUserTheme: (theme: Theme | null) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  userTheme: null, // Default to system theme
  setUserTheme: (theme) => set({ userTheme: theme }),
  toggleTheme: () => {
    const current = get().userTheme;
    // If user has set a theme, toggle it
    // If null (system), we need the current system theme to toggle from
    // This will be handled in the component
    set({ userTheme: current === 'light' ? 'dark' : 'light' });
  },
}));
