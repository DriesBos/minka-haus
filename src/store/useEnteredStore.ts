import { create } from 'zustand';

interface EnteredState {
  hasEntered: boolean;
  setHasEntered: (hasEntered: boolean) => void;
}

export const useEnteredStore = create<EnteredState>((set) => ({
  hasEntered: false,
  setHasEntered: (hasEntered) => set({ hasEntered }),
}));
