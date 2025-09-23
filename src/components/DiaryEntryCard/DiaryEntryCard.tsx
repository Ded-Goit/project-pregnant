'use client';

import React from 'react';
import styles from './DiaryEntryCard.module.css';

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function DiaryEntryCard({ entry, onClick }: { entry: DiaryEntry; onClick?: (id: string) => void }) {
  return (
    <article className={styles.card} onClick={() => onClick?.(entry.id)}>
      <div className={styles.row}>
        <div style={{ minWidth: 0 }}>
          <h3 className={styles.title}>{entry.title}</h3>
          <div className={styles.tags}>
            {(entry.tags || []).map((t, i) => (
              <span key={i} className="chip">{t}</span>
            ))}
          </div>
        </div>
        <span className={styles.date}>
          {new Date(entry.createdAt).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
    </article>
  );
}




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