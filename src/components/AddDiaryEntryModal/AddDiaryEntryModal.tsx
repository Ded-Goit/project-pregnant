'use client';

import React, { useMemo, useState } from 'react';
import styles from './AddDiaryEntryModal.module.css';

/**
 * ВАЖНО:
 * Все пропсы сделаны НЕОБЯЗАТЕЛЬНЫМИ, чтобы не ломать чужие места, где модалка вызывается
 * только с onClose. Это снимет типовую ошибку "missing open/onSubmit".
 */
export type AddDiaryEntryPayload = {
  title: string;
  content: string;
  tags: string[];
};

type Props = {
  open?: boolean;
  onClose?: () => void;
  initial?: Partial<AddDiaryEntryPayload>;
  onSubmit?: (payload: AddDiaryEntryPayload) => void;
};

export default function AddDiaryEntryModal({
  open = true,
  onClose,
  initial,
  onSubmit,
}: Props) {
  const init = useMemo(
    () => ({
      title: initial?.title ?? '',
      content: initial?.content ?? '',
      tags: initial?.tags ?? [],
    }),
    [initial]
  );

  const [title, setTitle] = useState(init.title);
  const [content, setContent] = useState(init.content);
  const [tagsText, setTagsText] = useState(init.tags.join(', '));

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h3>Новий запис</h3>
          <button className={styles.btn} onClick={onClose} type="button">Закрити</button>
        </header>

        <div className={styles.body}>
          <div style={{ display: 'grid', gap: 12 }}>
            <label>
              <div style={{ fontSize: 14, color: 'var(--color-neutral-dark)' }}>Заголовок</div>
              <input
                type="text"
                placeholder="Назва запису"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              <div style={{ fontSize: 14, color: 'var(--color-neutral-dark)' }}>Категорії (через кому)</div>
              <input
                type="text"
                placeholder="Натхнення, Енергія"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
              />
            </label>

            <label>
              <div style={{ fontSize: 14, color: 'var(--color-neutral-dark)' }}>Запис</div>
              <textarea
                placeholder="Запишіть, як ви себе відчуваєте"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
            </label>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose} type="button">Скасувати</button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() =>
              onSubmit?.({
                title: title.trim(),
                content: content.trim(),
                tags: tagsText
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
            type="button"
          >
            Зберегти
          </button>
        </div>
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