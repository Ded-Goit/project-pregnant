'use client';

import React, { useEffect } from 'react';
import styles from './ConfirmationModal.module.css';

type Props = {
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function ConfirmationModal({
  message,
  onClose,
  onConfirm,
}: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>

          <h3>Підтвердження</h3>

          <button className={styles.btn} onClick={onClose} type="button">
            Закрити
          </button>
        </header>

        <div className={styles.body}>
          <p>{message}</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose} type="button">
            Скасувати
          </button>
          <button
            className={`${styles.btn} ${styles.btnDanger}`}
            onClick={onConfirm}
            type="button"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}

// import styles from './ConfirmationModal.module.css';
//import dynamic from 'next/dynamic';

/*const GreetingBlock = dynamic(
  () => import('@/components/dashboard/greeting-block')
);*/

// export default function ConfirmationModal() {
//   return (
//     <div className={styles.component}>
//       <h1 className={styles.title}>
//         Блок `Універсальне модальне вікно підтвердження` | ConfirmationModal
//       </h1>
//     </div>
//   );
// }
