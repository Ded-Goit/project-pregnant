'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { getMe, refresh } from '@/lib/clientApi';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuth = await refresh();

      if (isAuth) {
        const user = await getMe();
        setUser(user);
      } else {
        logout();
      }
    };

    fetchUser();
  }, [logout, setUser]);

  return <>{children}</>;
}
