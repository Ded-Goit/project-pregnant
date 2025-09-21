import { User } from '@/lib/api';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: !!user && !!state.accessToken,
    })),

  setAccessToken: (token) =>
    set((state) => ({
      accessToken: token,
      isAuthenticated: !!state.user && !!token,
    })),

  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
}));
