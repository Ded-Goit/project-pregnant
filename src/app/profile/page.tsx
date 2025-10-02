'use client';

import { useState } from 'react';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm, {
  ProfileFormData,
} from '@/components/ProfileEditForm/ProfileEditForm';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './profile.module.css';
import { updateUserDataEdit } from '@/lib/clientApi';
import Loading from '../loading';

export default function ProfilePage() {
  const { user: authUser } = useAuthStore();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);

  const handleAvatarUpdate = async (file: File): Promise<string> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return URL.createObjectURL(file);
    } catch (error) {
      console.error('Помилка завантаження фото:', error);
      throw error;
    }
  };

  const handleProfileUpdate = async (formData: FormData): Promise<void> => {
    try {
      if (authUser) {
        setIsLoading(true);
        const { data } = await updateUserDataEdit(authUser?._id, formData);

        setUser(data.user);
      }
    } catch (error) {
      console.error('Помилка оновлення профілю:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
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
    dueDate: displayUser.dueDate || '',
  };

  if (!displayUser) {
    return <Loading />;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <ProfileAvatar
            user={displayUser}
            onAvatarChange={handleAvatarUpdate}
            setIsPhoto={setIsPhoto}
          />

          <ProfileEditForm
            initialData={formInitialData}
            onSubmit={handleProfileUpdate}
            isPhoto={isPhoto}
            setIsPhoto={setIsPhoto}
          />
        </div>
      </div>
    </div>
  );
}
