'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import { nextServer } from '@/lib/api';
import styles from './profile.module.css';

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

interface ProfileFormData {
  name: string;
  email: string;
  childGender?: string;
  dueDate?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, setUser: setAuthUser, accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authUser || !accessToken) {
      router.push('/login');
      return;
    }
    setIsLoading(false);
  }, [authUser, accessToken, router]);

  const handleAvatarUpdate = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await nextServer.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (authUser) {
        const updatedUser = { ...authUser, avatar: response.data.avatarUrl };
        setAuthUser(updatedUser);
      }

      return response.data.avatarUrl;
    } catch (error) {
      console.error('Помилка завантаження фото:', error);
      throw error;
    }
  };

  const handleProfileUpdate = async (
    formData: ProfileFormData
  ): Promise<void> => {
    try {
      const response = await nextServer.put('/users/currentUser', formData);

      const updatedUser = {
        ...authUser!,
        ...response.data,
      };

      setAuthUser(updatedUser);
      console.log('Профіль успішно оновлено');
    } catch (error) {
      console.error('Помилка оновлення профілю:', error);
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
      {/* Sidebar буде в основному layout */}

      <main className={styles.mainContent}>
        {/* Page Header з Breadcrumbs */}
        <header className={styles.pageHeader}>
          <nav className={styles.breadcrumbs}>
            <Link href="/dashboard" className={styles.breadcrumbLink}>
              Головна
            </Link>
            <ChevronRightIcon />
            <span className={styles.breadcrumbCurrent}>Профіль</span>
          </nav>
        </header>

        {/* Основной контент */}
        <div className={styles.container}>
          <h1 className={styles.title}>Профіль</h1>

          <div className={styles.profileContainer}>
            <ProfileAvatar
              user={authUser}
              onAvatarChange={handleAvatarUpdate}
            />
            <ProfileEditForm
              initialData={formInitialData}
              onSubmit={handleProfileUpdate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
