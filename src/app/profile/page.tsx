'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import { useAuthStore } from '@/hooks/useAuthStore';
import { User } from '@/types/user';
import styles from './profile.module.css';

//import dynamic from 'next/dynamic';
/*
const GreetingBlock = dynamic(
  () => import('@/components/dashboard/greeting-block')
);
const StatusBlock = dynamic(
  () => import('@/components/dashboard/status-block')
);
const BabyTodayCard = dynamic(
  () => import('@/components/dashboard/baby-today-card')
);
const MomTipCard = dynamic(() => import('@/components/dashboard/mom-tip-card'));
const TasksReminderCard = dynamic(
  () => import('@/components/dashboard/tasks-reminder-card')
);
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Перевірка автентифікації
  useEffect(() => {
    if (!authUser) {
      router.push('/login');
      return;
    }
  }, [authUser, router]);

  // Функція для отримання даних користувача
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      // Тут буде виклик API для отримання даних користувача
      // const response = await fetch('/api/profile');
      // const userData = await response.json();

      // Тимчасові дані для демонстрації
      const userData: User = {
        id: '1',
        name: 'Ганна',
        email: 'hanna@gmail.com',
        childGender: null,
        dueDate: '2025-07-16',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      setUser(userData);
    } catch (error) {
      console.error('Помилка завантаження даних:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchUserData();
    }
  }, [authUser]);

  // Функція для оновлення аватара
  const handleAvatarUpdate = async (file: File) => {
    try {
      // Тут буде виклик API для оновлення аватара
      // const formData = new FormData();
      // formData.append('avatar', file);
      // const response = await fetch('/api/profile/avatar', { method: 'POST', body: formData });
      // const { avatarUrl } = await response.json();

      const avatarUrl = URL.createObjectURL(file); // Тимчасово для демонстрації
      const updatedUser = { ...user, avatar: avatarUrl } as User;
      setUser(updatedUser);

      return avatarUrl;
    } catch (error) {
      console.error('Помилка завантаження фото:', error);
      throw error;
    }
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  if (!authUser) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Завантаження профілю...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.error}>Помилка завантаження профілю</div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>
        Блок `Сторінка щоденника` | DiaryPage | route: /diary
      </h1>
      <div className={styles.profileContainer}>
        <ProfileAvatar user={user} onAvatarChange={handleAvatarUpdate} />

        <div className={styles.profileInfo}>
          <div className={styles.infoSection}>
            <h3 className={styles.sectionTitle}>Інформація профілю</h3>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Ім`я:</span>
              <span className={styles.infoValue}>{user.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{user.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Стать дитини:</span>
              <span className={styles.infoValue}>
                {user.childGender === 'girl'
                  ? 'Дівчинка'
                  : user.childGender === 'boy'
                    ? 'Хлопчик'
                    : 'Ще не знаємо'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Планова дата пологів:</span>
              <span className={styles.infoValue}>
                {user.dueDate
                  ? new Date(user.dueDate).toLocaleDateString('uk-UA')
                  : 'Не вказано'}
              </span>
            </div>
          </div>

          <button onClick={handleEditProfile} className={styles.editButton}>
            Редагувати профіль
          </button>
        </div>
      </div>
    </div>
  );
}
