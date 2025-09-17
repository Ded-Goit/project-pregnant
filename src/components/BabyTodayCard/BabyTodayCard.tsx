'use client';

//import dynamic from 'next/dynamic';
import styles from './BabyTodayCard.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function BabyTodayCard() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Відображення інформації про розвиток дитини на поточному тижні.
      </h1>
    </div>
  );
}
