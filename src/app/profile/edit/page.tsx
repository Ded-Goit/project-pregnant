'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProfileEditForm, {
  ProfileFormData,
} from '@/components/ProfileEditForm/ProfileEditForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './profileedit.module.css';

// Іконка хлібних крихт
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export default function ProfileEditPage() {
  const router = useRouter();
  const { user: authUser, setUser: setAuthUser, accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authUser || !accessToken) {
      router.push('/login');
      return;
    }
    setIsLoading(false);
  }, [authUser, accessToken, router]);

  const handleProfileUpdate = async (
    formData: ProfileFormData
  ): Promise<void> => {
    try {
      setError(null);

      // Імітація запиту до API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Оновлюємо дані в store
      const updatedUser = {
        ...authUser!,
        name: formData.name,
        email: formData.email,
        gender: formData.childGender || authUser?.gender || '',
        updatedAt: new Date().toISOString(),
      };

      setAuthUser(updatedUser);

      // Повертаємося на сторінку профілю
      router.push('/profile');
    } catch (error) {
      console.error('Помилка оновлення профілю:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Сталася помилка при оновленні профілю';
      setError(errorMessage);
      throw error;
    }
  };

  if (!authUser || !accessToken) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Завантаження профілю...</div>
      </div>
    );
  }

  const formInitialData: ProfileFormData = {
    name: authUser.name || '',
    email: authUser.email || '',
    childGender: authUser.gender || '',
    dueDate: '2025-07-16',
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link href="/dashboard" className={styles.breadcrumbLink}>
          Головна
        </Link>
        <ChevronRightIcon />
        <Link href="/profile" className={styles.breadcrumbLink}>
          Профіль
        </Link>
        <ChevronRightIcon />
        <span className={styles.breadcrumbCurrent}>Редагування профілю</span>
      </nav>

      <div className={styles.container}>
        <h1 className={styles.title}>Редагування профілю</h1>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <ProfileEditForm
          initialData={formInitialData}
          onSubmit={handleProfileUpdate}
        />
      </div>
    </div>
  );
}
