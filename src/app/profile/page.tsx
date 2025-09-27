'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm, {
  ProfileFormData,
} from '@/components/ProfileEditForm/ProfileEditForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import Button from '@/components/UI/Buttons/Buttons';
import styles from './profile.module.css';

// Іконка хлібних крихт
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, setUser: setAuthUser, accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [authUser, accessToken]);

  // Тестові дані для демонстрації з фото
  const testUser = {
    _id: '1',
    name: 'Ганна',
    email: 'hanna@gmail.com',
    gender: 'female',
    avatar: '/Avatar Image_result.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleAvatarUpdate = async (file: File): Promise<string> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const avatarUrl = URL.createObjectURL(file);

      if (authUser) {
        const updatedUser = {
          ...authUser,
          avatar: avatarUrl,
        };
        setAuthUser(updatedUser);
      }

      return avatarUrl;
    } catch (error) {
      console.error('Помилка завантаження фото:', error);
      throw error;
    }
  };

  const handleProfileUpdate = async (
    formData: ProfileFormData
  ): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (authUser) {
        const updatedUser = {
          ...authUser,
          name: formData.name,
          email: formData.email,
          gender: formData.childGender || authUser.gender,
          updatedAt: new Date().toISOString(),
        };
        setAuthUser(updatedUser);
      }

      alert('Профіль успішно оновлено!');
    } catch (error) {
      console.error('Помилка оновлення профілю:', error);
      alert('Помилка оновлення профілю. Спробуйте ще раз.');
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Завантаження профілю...</div>
      </div>
    );
  }

  const displayUser = authUser || testUser;

  const formInitialData: ProfileFormData = {
    name: displayUser.name || '',
    email: displayUser.email || '',
    childGender: displayUser.gender || '',
    dueDate: '2025-07-16',
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <span className={styles.breadcrumbText}>Лелека</span>
        <ChevronRightIcon />
        <span className={styles.breadcrumbCurrent}>Профіль</span>
      </nav>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Профіль</h1>
          <Link href="/profile/edit">
            <Button variant="primary" size="large">
              Редагувати профіль
            </Button>
          </Link>
        </div>

        <div className={styles.profileContent}>
          <ProfileAvatar
            user={displayUser}
            onAvatarChange={handleAvatarUpdate}
          />
          <ProfileEditForm
            initialData={formInitialData}
            onSubmit={handleProfileUpdate}
          />
        </div>
      </div>
    </div>
  );
}
