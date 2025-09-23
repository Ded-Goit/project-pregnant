'use client';

import React from 'react';
// import styles from './ConfirmationModal.module.css';

export default function ConfirmationModal({
  open, onClose, onConfirm, text = 'Ви впевнені?'
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3 className="text-lg font-semibold">Підтвердження</h3>
          <button className="btn" onClick={onClose}>Закрити</button>
        </header>
        <div className="body"><p>{text}</p></div>
        <div className="actions">
          <button className="btn" onClick={onClose}>Скасувати</button>
          <button className="btn btn-danger" onClick={onConfirm}>Видалити</button>
        </div>
      </div>
    </div>
  );
}

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
