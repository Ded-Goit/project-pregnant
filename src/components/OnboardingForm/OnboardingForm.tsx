'use client';

//import dynamic from 'next/dynamic';
import styles from './OnboardingForm.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function OnboardingForm() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Надання можливості ввести початкові дані новому користувачеві.
      </h1>
    </div>
  );
}
