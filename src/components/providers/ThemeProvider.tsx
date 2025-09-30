'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  useEffect(() => {
    const root = document.documentElement;

    switch (user?.gender) {
      case 'girl':
        root.setAttribute('data-theme', 'pink'); // 💗
        break;
      case 'boy':
        root.setAttribute('data-theme', 'blue'); // 💙
        break;
      case 'I don`t know yet':
      default:
        root.setAttribute('data-theme', 'default'); // 🌞
        break;
    }
  }, [user]);

  return <>{children}</>;
}
