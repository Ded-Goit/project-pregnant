'use client';

import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated && children}</>;
}
