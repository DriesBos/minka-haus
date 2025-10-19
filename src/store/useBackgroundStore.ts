import { create } from 'zustand';

interface BackgroundStore {
  isBackgroundVisible: boolean;
  toggleBackground: () => void;
}

export const useBackgroundStore = create<BackgroundStore>((set) => ({
  isBackgroundVisible: false,
  toggleBackground: () =>
    set((state) => ({ isBackgroundVisible: !state.isBackgroundVisible })),
}));
