'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import { User, UserUpdateData } from '@/types/user';
import styles from './profileedit.module.css';

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

export default function ProfileEditPage() {
  const router = useRouter();
  const { user: authUser, setUser: setAuthUser } = useAuthStore();
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
        updatedAt: '2024-01-01'
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

  // Функція для оновлення профілю
  const handleProfileUpdate = async (updateData: UserUpdateData) => {
    try {
      // Тут буде виклик API для оновлення профілю
      // const response = await fetch('/api/profile', { method: 'PUT', body: JSON.stringify(updateData) });
      // const updatedUser = await response.json();
      
      const updatedUser = { ...user, ...updateData } as User;
      setUser(updatedUser);
      
      // Оновлюємо стан в AuthStore
      if (authUser) {
        setAuthUser({
          ...authUser,
          name: updatedUser.name,
          email: updatedUser.email
        });
      }
      
      // Повертаємося на сторінку профілю після успішного оновлення
      router.push('/profile');
      
      return updatedUser;
    } catch (error) {
      console.error('Помилка оновлення:', error);
      throw error;
    }
  };

  if (!authUser) {
    return null; // Редірект відбудеться автоматично
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
        Блок `Сторінка онбордингу зареєстрованого користувача` | OnboardingPage
        | route: /profile/edit
      </h1>
      <ProfileEditForm initialData={user} onSubmit={handleProfileUpdate} />
    </div>
  );
}