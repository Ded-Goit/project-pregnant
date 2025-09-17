'use client';

//import dynamic from 'next/dynamic';
import styles from './MomTipCard.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function MomTipCard() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Відображає корисну пораду для мами на поточний день.
      </h1>
    </div>
  );
}
