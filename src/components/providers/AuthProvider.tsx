'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { getMe, refresh } from '@/lib/clientApi';
import Preloader from '../Preloader/Preloader';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    const fetchUser = async () => {
      setAuthLoading(true);

      try {
        const isAuth = await refresh();

        if (isAuth) {
          const { user } = await getMe();
          if (user) {
            setUser(user);
          }
        } else {
          clearIsAuthenticated();
        }
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated, setAuthLoading]);

  if (isAuthLoading) {
    return <Preloader />;
  }

  return <>{children}</>;
}
