'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OnboardingForm, {
  OnboardingFormData,
} from '@/components/OnboardingForm/OnboardingForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './onboarding.module.css';

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Перевіряємо, що authUser не null
      if (!authUser) {
        throw new Error('Користувач не авторизований');
      }

      const updatedUser = {
        ...authUser,
        name: formData.name,
        email: formData.email,
        gender: formData.childGender || '',
        dueDate: formData.dueDate,
        avatar: formData.avatarUrl || '',
      };

      setUser(updatedUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Помилка онбордингу:', error);
      throw error;
    }
  };

  const handleAvatarUpload = async (file: File): Promise<string> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return URL.createObjectURL(file);
    } catch (error) {
      console.error('Помилка завантаження аватара:', error);
      throw error;
    }
  };

  if (!authUser) {
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
