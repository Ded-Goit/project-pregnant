'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OnboardingForm, {
  OnboardingFormValues,
} from '@/components/OnboardingForm/OnboardingForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './onboarding.module.css';
import { updateUserData } from '@/lib/clientApi';

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
      const formDataToSend = new FormData();

      // 👇 бекенд чекає "photo"
      if (formData.avatar instanceof File) {
        formDataToSend.append('photo', formData.avatar);
      }

      // 👇 бекенд чекає "gender", а не "childGender"
      formDataToSend.append('gender', formData.childGender);

      // 👇 бекенд чекає дату у форматі ISO
      const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

formDataToSend.append('dueDate', formatDate(formData.dueDate));

      // викликаємо API
      const savedUser = await updateUserData(authUser._id, formDataToSend);

      // ⚡ у відповіді бекенд повертає { status, message, data }
      setUser(savedUser.data);

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

  const formInitialData: OnboardingFormValues = {
    childGender: '',
    dueDate: '',
    avatar: authUser?.avatar || '',
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
