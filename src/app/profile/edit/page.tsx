'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingForm, {
  OnboardingFormValues,
} from '@/components/OnboardingForm/OnboardingForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './onboarding.module.css';
import { updateUserData } from '@/lib/clientApi';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';

interface AxiosErrorResponse {
  status: number;
  message: { context?: { message?: string } }[];
  data?: unknown;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user: authUser, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser === undefined) return;

    if (authUser?.onboardingCompleted) {
      router.push('/dashboard');
      return;
    }

    setIsLoading(false);
  }, [authUser, router]);

  const handleOnboardingSubmit = async (
    formData: OnboardingFormValues
  ): Promise<void> => {
    console.log(formData);

    if (!authUser) return;

    try {
      const formDataToSend = new FormData();

      if (formData.avatar instanceof File) {
        formDataToSend.append('photo', formData.avatar);
      }

      formDataToSend.append('gender', formData.childGender);

      const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toISOString().split('T')[0];
      };

      formDataToSend.append('dueDate', formatDate(formData.dueDate));

      const savedUser = await updateUserData(authUser._id, formDataToSend);

      setUser(savedUser.data);

      router.push('/dashboard');
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'isAxiosError' in error &&
        (error as AxiosError).isAxiosError
      ) {
        const axiosError = error as AxiosError;

        const responseData = axiosError.response?.data as AxiosErrorResponse;
        const axiosMessage = responseData?.message;

        const text = Array.isArray(axiosMessage)
          ? (axiosMessage[0]?.context?.message ?? 'Помилка')
          : (axiosMessage ?? 'Помилка');

        toast.error(text);
      } else {
        toast.error('Щось пішло не так');
      }
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
      <div className={styles.container}>
        <OnboardingForm
          initialData={formInitialData}
          onSubmit={handleOnboardingSubmit}
          onAvatarUpload={handleAvatarUpload}
        />
      </div>
      <Toaster></Toaster>
    </div>
  );
}
