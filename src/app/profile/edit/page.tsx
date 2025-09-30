'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OnboardingForm, {
  OnboardingFormValues,
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
    if (authUser === undefined) return; // ще не завантажилось зі стора

    // if (!authUser) {
    //   router.push('/login');
    //   return;
    // }

    if (authUser?.onboardingCompleted) {
      router.push('/dashboard');
      return;
    }

    setIsLoading(false);
  }, [authUser, router]);

  const handleOnboardingSubmit = async (
    formData: OnboardingFormValues
  ): Promise<void> => {
    if (!authUser) return; // підстраховка

    try {
      // Імітація запиту до API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = {
        ...authUser,
        gender: formData.childGender || '',
        dueDate: formData.dueDate,
        avatar:
          formData.avatar instanceof File
            ? authUser.avatar || '' // або результат upload (URL)
            : formData.avatar || authUser.avatar || '',
        onboardingCompleted: true,
        updatedAt: new Date().toISOString(),
      };

      setUser(updatedUser);

      router.push('/dashboard');
    } catch (error) {
      console.error('Помилка онбордингу:', error);
    }
  };

  const handleAvatarUpload = async (file: File): Promise<string> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const avatarUrl = URL.createObjectURL(file);

      // опціонально: відкликати URL пізніше, коли зображення не буде потрібно
      setTimeout(() => URL.revokeObjectURL(avatarUrl), 10_000);

      return avatarUrl;
    } catch (error) {
      console.error('Помилка завантаження аватара:', error);
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

  if (!authUser) return null;

  const formInitialData: OnboardingFormValues = {
    childGender: '',
    dueDate: '',
    avatar: authUser.avatar || '',
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
        <OnboardingForm
          initialData={formInitialData}
          onSubmit={handleOnboardingSubmit}
          onAvatarUpload={handleAvatarUpload}
        />
      </div>
    </div>
  );
}
