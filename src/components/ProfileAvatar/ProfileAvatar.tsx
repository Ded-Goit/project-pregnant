'use client';

import { useState } from 'react';
import styles from './ProfileAvatar.module.css';
import Button from '@/components/UI/Buttons/Buttons';

interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileAvatarProps {
  user: User;
  onAvatarChange: (file: File) => Promise<string>;
}

export default function ProfileAvatar({
  user,
  onAvatarChange,
}: ProfileAvatarProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
      event.target.value = '';
    } catch (error) {
      console.error('Помилка завантаження фото:', error);
      alert('Помилка завантаження фото. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`Аватар ${user.name}`}
              className={styles.avatar}
            />
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

      <div className={styles.uploadSection}>
        <label className={styles.uploadLabel}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className={styles.fileInput}
            disabled={isLoading}
          />
          <Button
            variant="primary"
            size="large"
            disabled={isLoading}
            style={{ width: '100%' }}
          >
            Завантажити нове фото
          </Button>
        </label>
      </div>
    </div>
  );
}
