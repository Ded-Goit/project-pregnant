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
      <div className={styles.detailsinner}>
        <div className={styles.detailsbody}>
          <p className={styles.placeholder}>
            Наразі записи у щоденнику відсутні
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailsinner}>
      <header className={styles.detailstop}>
        <div className={styles.top}>
          <div>
            <h3 className={styles.title}>{entry.title}</h3>
            <div className={styles.meta}>
              {new Date(entry.createdAt).toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.btnicon}
              aria-label="Редагувати"
              onClick={() => onEdit(true)}
              type="button"
            >
              🖉
            </button>
            <button
              className={styles.btnicon}
              aria-label="Видалити"
              onClick={onDelete}
              type="button"
            >
              🗑
            </button>
          </div>
        </div>
      </header>

      <div className={styles.detailsbody}>
        <div className={styles.tags}>
          {entry.emotions?.map((t) => (
            <span key={t._id} className={styles.chip}>
              {t.title}
            </span>
          ))}
        </div>
        <article className={styles.text}>{entry.descr}</article>
      </div>
    </div>
  );
}
