'use client';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmationModal.module.css';

export type ConfirmationModalProps = {
  open: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export default function ConfirmationModal({
  open,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const confirmBtnRef = useRef<HTMLButtonElement | null>(null);

  // Закриття по Escape + простий focus trap
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCancel();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusable).filter((el) => !el.hasAttribute('disabled'));
        if (list.length === 0) return;

        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open, onCancel]);

  // Фокус на кнопку підтвердження при відкритті
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => confirmBtnRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  if (!open) return null;

  const modal = (
    <div className={styles.root} aria-hidden={!open}>
      <div className={styles.backdrop} onClick={onCancel} />
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        ref={dialogRef}
      >
        <h2 id="confirmation-modal-title" className={styles.title}>
          {title}
        </h2>

        <div className={styles.actions}>
          <button type="button" className={styles.btnSecondary} onClick={onCancel}>
            {cancelButtonText}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={onConfirm}
            ref={confirmBtnRef}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );

  // Портал у document.body (SSR-safe перевірка)
  if (typeof window === 'undefined') return null;
  return ReactDOM.createPortal(modal, document.body);
}