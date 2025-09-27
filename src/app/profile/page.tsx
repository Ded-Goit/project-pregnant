'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm, {
  ProfileFormData,
} from '@/components/ProfileEditForm/ProfileEditForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './profile.module.css';

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAvatarUpdate = async (file: File): Promise<string> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return URL.createObjectURL(file);
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
      alert('Профіль успішно оновлено!');
    } catch (error) {
      console.error('Помилка оновлення профілю:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Завантаження...</div>
      </div>
    );
  }

  const displayUser = authUser || {
    _id: '1',
    name: 'Ганна',
    email: 'hanna@gmail.com',
    gender: 'female',
    avatar: '/avatar-image.jpg',
    dueDate: '2025-07-16',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const formInitialData: ProfileFormData = {
    name: displayUser.name,
    email: displayUser.email,
    childGender: displayUser.gender,
    dueDate: displayUser.dueDate,
  };

  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.breadcrumbs}>
        <span className={styles.breadcrumbText}>Лелека</span>
        <ChevronRightIcon />
        <span className={styles.breadcrumbCurrent}>Профіль</span>
      </nav>

      <div className={styles.container}>
        <div className={styles.content}>
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
