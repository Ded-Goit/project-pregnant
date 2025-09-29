'use client';

import React from 'react';
import styles from './DiaryEntryDetails.module.css';
import { Diary } from '@/lib/clientApi';

type Props = {
  entry: Diary | undefined;
  onEdit: (mode: boolean) => void;
  onDelete?: () => void;
};

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: Props) {
  if (!entry) {
    return (
      <div className={styles.detailsInner}>
        <div className="detailsBody">
          <p className={styles.placeholder}>
            Наразі записи у щоденнику відсутні
            Наразі записи у щоденнику відсутні
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailsInner}>
      <header className="detailsTop">
        <div className={styles.top}>
          <div className={styles.divTitle}>
            <h3 className={styles.title}>{entry.title}</h3>
              <button
              className="btn-icon"
              aria-label="Редагувати"
              onClick={() => onEdit(true)}
              type="button"
            >✎
            </button>
          </div>
          <div className={styles.actions}>
            <div className={styles.meta}>
              {new Date(entry.createdAt).toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            <button
              className={styles.btnicon}
              aria-label="Видалити"
              onClick={onDelete}
              type="button"
            >
              🗑️
            </button>
          </div>
        </div>
      </header>

      <div className="detailsBody">
        <article className={styles.text}>{entry.descr}</article>
          <div className={styles.tags}>
            {entry.emotions?.map((t) => (
              <span key={t._id} className={styles.chip}>
                {t.title}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
