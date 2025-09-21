'use client';

//import dynamic from 'next/dynamic';
import styles from './AddTaskModal.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

import React, { useEffect } from 'react';
import AddTaskForm, { Task } from '../AddTaskForm/AddTaskForm';

interface AddTaskModalProps {
  isEdit?: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialText?: string;
}

export default function AddTaskModal({
  isEdit = false,
  onClose,
  onSubmit,
  initialText,
}: AddTaskModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          <img src="/close.png" alt="Close" />
        </button>
        <h2 className={styles.modalTitle}>
          {isEdit ? 'Редагувати завдання' : 'Нове завдання'}
        </h2>
        <AddTaskForm
          initialText={initialText}
          onSubmit={(task: Task) => {
            onSubmit(task);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
