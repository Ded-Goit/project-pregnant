'use client';

import React from 'react';
import DiaryEntryCard, { DiaryEntry } from '@/components/DiaryEntryCard/DiaryEntryCard';
import styles from './DiaryList.module.css';

export default function DiaryList({
  entries,
  onNew,
  onSelect,
}: {
  entries: DiaryEntry[];
  onNew?: () => void;
  onSelect?: (id: string) => void;
}) {
  return (
    <section className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <header className={styles.header}>
        <h2>Щоденник</h2>
        <button className="btn btn-primary" onClick={onNew}>Новий запис</button>
      </header>
      <div className={styles.body}>
        {entries.length === 0 ? (
          <div className={styles.empty}>Поки що немає жодного запису.</div>
        ) : (
          <div className={styles.grid}>
            {entries.map((e) => (
              <DiaryEntryCard key={e.id} entry={e} onClick={onSelect} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}



//import dynamic from 'next/dynamic';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

// export default function DiaryList() {
//   return (
//     <div className={styles.component}>
//       <h1 className={styles.title}>
//         Компонент відображає список записів щоденника.
//       </h1>
//     </div>
//   );
// }