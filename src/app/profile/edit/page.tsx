'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OnboardingForm, {
  OnboardingFormData,
} from '@/components/OnboardingForm/OnboardingForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './onboarding.module.css';

// Іконка хлібних крихт
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export default function OnboardingPage() {
  const router = useRouter();
  const { user: authUser, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Перевіряємо, чи користувач вже пройшов онбординг
    if (authUser?.onboardingCompleted) {
      router.push('/dashboard');
      return;
    }

    if (!authUser) {
      router.push('/login');
      return;
    }
    setIsLoading(false);
  }, [authUser, router]);

  const handleOnboardingSubmit = async (
    formData: OnboardingFormData
  ): Promise<void> => {
    try {
      // Імітація запиту до API для онбордингу
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Оновлюємо дані в store з позначкою про завершений онбординг
      const updatedUser = {
        ...authUser!,
        name: formData.name,
        email: formData.email,
        gender: formData.childGender || '',
        dueDate: formData.dueDate,
        avatar: formData.avatarUrl || authUser?.avatar || '',
        onboardingCompleted: true,
        updatedAt: new Date().toISOString(),
      };

      setUser(updatedUser);

      // Перенаправляємо на головну сторінку після успішного онбордингу
      router.push('/dashboard');
    } catch (error) {
      console.error('Помилка онбордингу:', error);
      throw error;
    }
  };

  const handleAvatarUpload = async (file: File): Promise<string> => {
    try {
      // Імітація завантаження аватара
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Тут буде реальний запит до API для завантаження зображення
      const avatarUrl = URL.createObjectURL(file); // Тимчасове рішення
      return avatarUrl;
    } catch (error) {
      console.error('Помилка завантаження аватара:', error);
      throw error;
    }
  };

  if (!authUser || authUser.onboardingCompleted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Завантаження...</div>
      </div>
    );
  }

  const formInitialData: OnboardingFormData = {
    name: authUser.name || '',
    email: authUser.email || '',
    childGender: '',
    dueDate: '',
    avatarUrl: authUser.avatar || '',
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link href="/" className={styles.breadcrumbLink}>
          Лелека
        </Link>
        <ChevronRightIcon />
        <span className={styles.breadcrumbCurrent}>Онбординг</span>
      </nav>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ласкаво просимо!</h1>
          <p className={styles.subtitle}>
            Заповніть основну інформацію для персоналізації вашого досвіду
          </p>
        </div>

        <OnboardingForm
          initialData={formInitialData}
          onSubmit={handleOnboardingSubmit}
          onAvatarUpload={handleAvatarUpload}
        />
      </div>
    </div>
  );
}
