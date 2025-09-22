'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import styles from './ProfileAvatar.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

interface ProfileAvatarProps {
  user: User;
  onAvatarChange?: (file: File) => Promise<void>;
}

export default function ProfileAvatar({ user, onAvatarChange }: ProfileAvatarProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onAvatarChange) return;

    // Валідація файлу
    if (file.size > 5 * 1024 * 1024) {
      alert('Максимальний розмір файлу: 5MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Будь ласка, виберіть зображення');
      return;
    }

    setIsLoading(true);
    try {
      await onAvatarChange(file);
      event.target.value = ''; // Очищаємо input
    } catch (error) {
      console.error('Помилка завантаження фото:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Відображає поточний аватар користувача та основну інформацію.
      </h1>
      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className={styles.avatarImage} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            {isLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.spinner} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
      </div>

      <label className={`${styles.uploadButton} ${isLoading ? styles.disabled : ''}`}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className={styles.fileInput}
          disabled={isLoading}
        />
        {isLoading ? (
          <>
            <span className={styles.buttonSpinner} />
            Завантаження...
          </>
        ) : (
          'Завантажити нове фото'
        )}
      </label>
    </div>
  );
}