'use client';

import React from 'react';
import styles from './DiaryEntryDetails.module.css';
import type { DiaryEntry } from '../DiaryEntryCard/DiaryEntryCard';

type Props = {
  entry: DiaryEntry | null;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: Props) {
  if (!entry) {
    return (
      <div className={styles.detailsInner}>
        <div className={styles.detailsBody}>
          <p className={styles.placeholder}>Наразі записи у щоденнику відсутні</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailsInner}>
      <header className="detailsTop">
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
            <button className="btn-icon" aria-label="Редагувати" onClick={onEdit} type="button">Редагувати</button>
            <button className="btn-icon" aria-label="Видалити" onClick={onDelete} type="button">Видалити</button>
          </div>
        </div>
      </header>

      <div className="detailsBody">
        <div className={styles.tags}>
          {entry.tags?.map((t, i) => (
            <span key={i} className="chip">{t}</span>
          ))}
        </div>
        <article className={styles.text}>{entry.content}</article>
      </div>
    </div>
  );
}
















// import styles from './DiaryEntryDetails.module.css';
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