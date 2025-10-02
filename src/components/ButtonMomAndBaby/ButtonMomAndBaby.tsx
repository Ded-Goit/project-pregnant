import React from 'react';
import styles from './ButtonMomAndBaby.module.css';

interface ButtonMomAndBabyProps {
  activeTab: 'baby' | 'mom';
  setActiveTab: (tab: 'baby' | 'mom') => void;
}

export default function ButtonMomAndBaby({
  activeTab,
  setActiveTab,
}: ButtonMomAndBabyProps) {
  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'baby' ? styles.active : ''}`}
          onClick={() => setActiveTab('baby')}
        >
          Розвиток малюка
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'mom' ? styles.active : ''}`}
          onClick={() => setActiveTab('mom')}
        >
          Тіло мами
        </button>
      </div>
    </div>
  );
}
