'use client';

import React from 'react';
import styles from './DiaryEntryDetails.module.css';
import type { DiaryEntry } from '@/components/DiaryEntryCard/DiaryEntryCard';

export default function DiaryEntryDetails({
  entry,
  onEdit,
  onDelete,
}: {
  entry: DiaryEntry | null;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  if (!entry) {
    return (
      <section className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <header className={styles.header}><h2>Деталі запису</h2></header>
        <div style={{ padding: 16 }}>
          <p className={styles.placeholder}>Наразі записи у щоденнику відстні</p>
        </div>
      </section>
    );
  }

  return (
    <section className="card" style={{ padding: 8, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div className={styles.wrap}>
        <header className={styles.headerInner}>
          <div>
            <h2 className={styles.title}>{entry.title}</h2>
            <p className={styles.meta}>Створено: {new Date(entry.createdAt).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className={styles.actions}>
            <button className="btn" onClick={onEdit} aria-label="Редагувати">🖉</button>
            <button className="btn btn-danger" onClick={onDelete} aria-label="Видалити">🗑</button>
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.tags}>
            {(entry.tags || []).map((t, i) => <span key={i} className="chip">{t}</span>)}
          </div>
          <article className={styles.text}>{entry.content}</article>
        </div>
      </div>
    </section>
  );
}




//import dynamic from 'next/dynamic';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

// export default function DiaryEntryDetails() {
//   return (
//     <div className={styles.component}>
//       <h1 className={styles.title}>
//         Відображає повну інформацію обраного запису. На мобілці/планшеті є
//         окремою сторінкою.
//       </h1>
//     </div>
//   );
// }