'use client';

import React from 'react';
import styles from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import { Diary } from '@/lib/clientApi';

type Props = {
  entries: Diary[];
  onAddClick: (mode: boolean) => void;
  onSelect?: (e: React.MouseEvent) => void | Promise<void>;
};

export default function DiaryList({ entries, onAddClick, onSelect }: Props) {
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваші записи</h2>
        <div className={styles.tools}>
          <button
            aria-label="Додати"
            className="roundBtn"
            onClick={() => onAddClick(false)}
            type="button"
          >
            Новий запис ＋
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {entries.map((e) => (
          <DiaryEntryCard key={e._id} entry={e} onClick={onSelect} />
        ))}
      </div>
    </>
  );
}

// import styles from './DiaryList.module.css';
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
