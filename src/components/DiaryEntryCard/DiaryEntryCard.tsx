'use client';

import React from 'react';
import styles from './DiaryEntryCard.module.css';
import { Diary } from '@/lib/clientApi';

// export type DiaryEntry = {
//   id: string;
//   title: string;
//   createdAt: string; // ISO
//   tags: string[];
//   content?: string;
// };

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
          <span key={t._id} className="chip">
            {t.title}
          </span>
        ))}
      </div>
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
