'use client';

import styles from './NewAddDiaryEntryModal.module.css';
import React, { useEffect } from 'react';
import NewAddDiaryEntryForm from '../NewAddDiaryEntryForm/NewAddDiaryEntryForm';
import Image from 'next/image';
import { Diary } from '@/lib/clientApi';

interface AddDiaryEntryModalProps {
  onClose: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  initialData?: Diary;
}

export default function NewAddDiaryEntryModal({
  onClose,
  onSubmit,
  initialData,
}: AddDiaryEntryModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onBackdropClick}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Image src="/close.png" alt="Закрити" width={24} height={24} />
        </button>
        <h2 className={styles.modalTitle}>Новий запис</h2>
        <NewAddDiaryEntryForm onSubmit={onSubmit} initialData={initialData} />
      </div>
    </div>
  );
}
