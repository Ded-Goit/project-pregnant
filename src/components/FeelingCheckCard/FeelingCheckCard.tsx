'use client';

import styles from './FeelingCheckCard.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';
import Button from '../UI/Buttons/Buttons';

interface FeelingCheckCardProps {
  isAuthenticated: boolean;
}

export default function FeelingCheckCard({
  isAuthenticated,
}: FeelingCheckCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
    } else {
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section className={styles.feelingCheckCard}>
      <h3 className={styles.feelingCheckTitle}>Як ви себе почуваєте?</h3>
      <p className={styles.feelingCheckRecommendation}>
        Рекомендація на сьогодні:
      </p>
      <p className={styles.feelingCheckNote}>
        {' '}
        Занотуйте незвичні відчуття у тілі.
      </p>
      <Button variant="primary" size="large" onClick={handleButtonClick}>
        Зробити запис у щоденник
      </Button>

      {modalOpen && (
        <AddDiaryEntryModal
          onClose={closeModal}
          // onSubmit={(entry) => {
          //   closeModal();
          // }}
        />
      )}
    </section>
  );
}
