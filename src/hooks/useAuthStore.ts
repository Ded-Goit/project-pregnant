import { User } from '@/lib/clientApi';
import { create } from 'zustand';
import { useState, useEffect } from "react";
import { nextServer } from "@/lib/api";
import toast from "react-hot-toast";

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

export function useWeekStore() {
  const { user } = useAuthStore();
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  useEffect(() => {
    async function fetchWeek() {
      try {
        const route = user ? "/weeks/dashboard" : "/weeks/public/dashboard";
        nextServer.defaults.baseURL = 'https://project-pregnant-back.onrender.com/api';
        const res = await nextServer.get(route);
        setCurrentWeek(res.data.weekNumber); 
      } catch {
        toast.error("Не вдалося отримати поточний тиждень");
      } 
    }

    fetchWeek();
  }, [user]);

  return { currentWeek };
}
