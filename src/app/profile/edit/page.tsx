'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './profileedit.module.css';

interface ProfileFormData {
  name: string;
  email: string;
  childGender?: string;
  dueDate?: string;
}

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

      // Імітація запиту до API - замініть на реальний запит
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
    dueDate: '',
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Редагування профілю</h1>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <ProfileEditForm
        initialData={formInitialData}
        onSubmit={handleProfileUpdate}
      />
    </div>
  );
}
