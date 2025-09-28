'use client';

import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    clearIsAuthenticated();
    router.push('/auth/login');
  };

  return (
    <button type="button" onClick={handleLogout}>
      Вийти
    </button>
  );
}
