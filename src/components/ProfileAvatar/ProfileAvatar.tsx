'use client';

import { useState } from 'react';
import styles from './ProfileAvatar.module.css';

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
    <div className={styles.component}>
      {/* Avatar Image / Avatar Content */}
      <div className={styles.avatarContent}>
        <div className={styles.avatarImage}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.name} аватар`}
              className={styles.avatarImg}
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

        {/* Frame 48 - User Info */}
        <div className={styles.frame48}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
        </div>

        {/* Frame 47 - Upload Button */}
        <div className={styles.frame47}>
          <label
            className={`${styles.uploadButton} ${isLoading ? styles.disabled : ''}`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className={styles.fileInput}
              disabled={isLoading}
            />
            {isLoading ? (
              <>
                <div className={styles.buttonSpinner} />
                Завантаження...
              </>
            ) : (
              'Завантажити нове фото'
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
