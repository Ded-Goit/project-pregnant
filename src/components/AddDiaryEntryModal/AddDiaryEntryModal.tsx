'use client';

//import dynamic from 'next/dynamic';
import styles from './AddDiaryEntryModal.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function AddDiaryEntryModal() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Блок `Модальне вікно створення/редагування запису в щоденник` |
        AddDiaryEntryModal
      </h1>
    </div>
  );
}
