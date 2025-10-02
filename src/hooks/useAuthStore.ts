import { User } from '@/lib/clientApi';
import { create } from 'zustand';
import { useState, useEffect } from 'react';
import { nextServer } from '@/lib/api';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setAuthLoading: (loading: boolean) => void;
  activeTab: 'baby' | 'mom';
  setActiveTab: (tab: 'baby' | 'mom') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
  activeTab: 'baby',
  setActiveTab: (tab) => set({ activeTab: tab }),
  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: true,
    })),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
  setAuthLoading: (loading) => set({ isAuthLoading: loading }),
}));

export function useWeekStore() {
  const { user } = useAuthStore();
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  useEffect(() => {
    async function fetchWeek() {
      if (!user) {
        setCurrentWeek(null);
        return;
      }
      try {
        const res = await nextServer.get('/weeks/dashboard');
        setCurrentWeek(res.data.data.data.weekNumber);
      } catch {
        toast.error('Не вдалося отримати поточний тиждень');
      }
    }

    fetchWeek();
  }, [user]);

  return { currentWeek };
}
