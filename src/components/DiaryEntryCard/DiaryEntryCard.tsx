'use client';

//import dynamic from 'next/dynamic';
import styles from './DiaryEntryCard.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function DiaryEntryCard() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Відображення одного запису у вигляді картки у списку.
      </h1>
    </div>
  );
}
