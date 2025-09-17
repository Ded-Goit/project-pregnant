'use client';

//import dynamic from 'next/dynamic';
import styles from './DiaryList.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function DiaryList() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Компонент відображає список записів щоденника.
      </h1>
    </div>
  );
}
