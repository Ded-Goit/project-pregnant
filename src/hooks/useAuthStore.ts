import { User } from '@/lib/clientApi';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: true,
    })),

  logout: () => set({ user: null, isAuthenticated: false }),
}));

interface WeekState {
  currentWeek: number | null;
  setCurrentWeek: (week: number) => void;
}

export const useWeekStore = create<WeekState>((set) => ({
  currentWeek: null,
  setCurrentWeek: (week) => set({ currentWeek: week }),
}));
