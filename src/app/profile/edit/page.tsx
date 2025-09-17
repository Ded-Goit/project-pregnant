'use client';

import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';
//import dynamic from 'next/dynamic';
import styles from './profileedit.module.css';

export default function ProfileEditPage() {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>
        Блок `Сторінка онбордингу зареєстрованого користувача` | OnboardingPage
        | route: /profile/edit
      </h1>
      <OnboardingForm />{' '}
    </div>
  );
}
