'use client';

//import dynamic from 'next/dynamic';
import styles from './AddDiaryEntryModal.module.css';
import React, { useEffect } from 'react';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import type { DiaryEntry } from '../../types/note';
import Image from 'next/image';
import { Diary } from '@/lib/clientApi';

interface AddDiaryEntryModalProps {
  isEdit?: boolean;
  initialEntry?: Diary;
  onClose: () => void;
  onSubmit?: (payload: Diary) => void;
}

export default function AddDiaryEntryModal({
  isEdit = false,
  initialEntry,
  onClose,
  onSubmit,
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
        <h2 className={styles.modalTitle}>
          {isEdit ? 'Редагувати запис' : 'Новий запис'}
        </h2>
        <AddDiaryEntryForm
          initialEntry={initialEntry}
          onSubmit={async (entry) => {
            await onSubmit?.(entry);
            onClose();
          }}
        />
      </div>
    </div>
  );
}

// import styles from './AddDiaryEntryModal.module.css';
//import dynamic from 'next/dynamic';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/
