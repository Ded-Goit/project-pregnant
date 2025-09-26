'use client';

import React from 'react';
import styles from './DiaryEntryCard.module.css';

export type DiaryEntry = {
  id: string;
  title: string;
  createdAt: string;   // ISO
  tags: string[];
  content?: string;
};

type Props = {
  entry: DiaryEntry;
  onClick?: (id: string) => void; // мобайл/планшет: переход на /diary/[entryId]
};

export default function DiaryEntryCard({ entry, onClick }: Props) {
  return (
    <article className={styles.card} onClick={() => onClick?.(entry.id)}>
      <div className={styles.head}>
        <h3 className={styles.title}>Дивне бажання</h3>
        <span className={styles.date}>
          {new Date(entry.createdAt).toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
      <div className={styles.tags}>
        {entry.tags?.map((t, i) => (
          <span key={i} className="chip">{t}</span>
        ))}
      </div>
    </article>
  );
}
















// import styles from './DiaryEntryCard.module.css';
//import dynamic from 'next/dynamic';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

// export default function DiaryEntryCard() {
//   return (
//     <div className={styles.component}>
//       <h1 className={styles.title}>
//         Відображення одного запису у вигляді картки у списку.
//       </h1>
//     </div>
//   );
// }