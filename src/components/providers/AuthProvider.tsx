'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { getMe, refresh } from '@/lib/clientApi';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      const isAuth = await refresh();

      if (isAuth) {
        const { user } = await getMe();

        if (user) {
          setUser(user);
        }
      } else {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [clearIsAuthenticated, setUser]);

  return <>{children}</>;
}
