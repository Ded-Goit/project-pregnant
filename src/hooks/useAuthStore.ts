import { User } from '@/lib/clientApi';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: true,
    })),

  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));
