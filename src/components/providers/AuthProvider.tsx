'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import api from '@/lib/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch {
        console.log('⚠️ Бекенд ще не піднятий, працюємо в демо-режимі');
      }
    }
    fetchUser();
  }, [setUser]);

  return <>{children}</>;
}
