'use client';

//import dynamic from 'next/dynamic';
import styles from './FeelingCheckCard.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function FeelingCheckCard() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Відображає блок для рефлексії самопочуття.
      </h1>
    </div>
  );
}
