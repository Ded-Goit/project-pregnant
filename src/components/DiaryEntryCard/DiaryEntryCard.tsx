'use client';

import React from 'react';
import styles from './DiaryEntryCard.module.css';
import { Diary } from '@/lib/clientApi';

type Props = {
  entry: Diary;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
};

export default function DiaryEntryCard({ entry, onClick }: Props) {
  return (
    <article className={styles.card} id={entry._id} onClick={onClick}>
      <div className={styles.head}>
        <h3 className={styles.title}>{entry.title}</h3>
        <span className={styles.date}>{entry.createdAt.slice(0, 10)}</span>
      </div>
      <div className={styles.tags}>
        {entry.emotions.map((t) => (
          <span key={t._id} className={styles.chip}>
            {t.title}
          </span>
        ))}
      </div>
    </article>
  );
}
