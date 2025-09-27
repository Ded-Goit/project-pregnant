'use client';

import styles from './AddTaskModal.module.css';

import React, { useEffect } from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { Task } from '../../types/note';
import Image from 'next/image';

interface AddTaskModalProps {
  isEdit?: boolean;
  onClose: () => void;
  onSubmit?: (task: Task) => void;
  initialTask?: Task;
}

export default function AddTaskModal({
  // isEdit = false,
  onClose,
  onSubmit,
  initialTask,
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
          <Image src="/close.png" alt="Close" width={24} height={24} />
        </button>
        <h2 className={styles.modalTitle}>Нове завдання</h2>
        <AddTaskForm
          initialText={initialTask}
          onSubmit={(task: Task) => {
            onSubmit?.(task);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
