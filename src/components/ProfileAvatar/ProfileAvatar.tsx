'use client';

import { useRef, useState } from 'react';
import styles from './ProfileAvatar.module.css';
import Button from '@/components/UI/Buttons/Buttons';
import Image from 'next/image';

interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileAvatarProps {
  user: User;
  onAvatarChange: (file: File) => Promise<string>;
  setIsPhoto: (mode: boolean) => void;
}

export default function ProfileAvatar({
  user,
  onAvatarChange,
  setIsPhoto,
}: ProfileAvatarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user.photo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

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
      alert('Будь ласка, виберіть зображення (JPEG, PNG, WebP)');
      return;
    }

    setIsLoading(true);
    try {
      const newAvatarUrl = await onAvatarChange(file);
      setCurrentAvatar(newAvatarUrl);
      setIsPhoto(true);
    } catch (error) {
      console.error('Помилка завантаження фото:', error);
      alert('Помилка завантаження фото. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const avatarSrc = currentAvatar || user.photo;
  const showAvatar = avatarSrc && avatarSrc !== '';

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          {showAvatar ? (
            <Image
              width={132}
              height={132}
              src={avatarSrc}
              alt={`Аватар ${user.name}`}
              className={styles.avatar}
              onError={(e) => {
                console.error('Помилка завантаження аватара:', avatarSrc);
                e.currentTarget.style.display = 'none';
                const placeholder = document.querySelector(
                  `.${styles.avatarPlaceholder}`
                ) as HTMLDivElement;
                if (placeholder) {
                  placeholder.style.display = 'flex';
                }
              }}
            />
          ) : null}
          <div
            className={styles.avatarPlaceholder}
            style={{ display: showAvatar ? 'none' : 'flex' }}
          >
            {getInitials(user.name)}
          </div>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
        </div>

        <div className={styles.uploadSection}>
          <input
            form="profile-form"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className={styles.fileInput}
            disabled={isLoading}
            id="avatar-upload"
            ref={inputRef}
          />
          <label htmlFor="avatar-upload" className={styles.uploadLabel}>
            <Button
              variant="secondary"
              size="large"
              disabled={isLoading}
              onClick={handleClick}
            >
              {isLoading ? 'Завантаження...' : 'Завантажити нове фото'}
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
}
