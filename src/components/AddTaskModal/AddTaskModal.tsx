'use client';

//import dynamic from 'next/dynamic';
import styles from './AddTaskModal.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function AddTaskModal() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Блок `Модальне вікно створення/редагування завдання` | AddTaskModal
      </h1>
    </div>
  );
}
