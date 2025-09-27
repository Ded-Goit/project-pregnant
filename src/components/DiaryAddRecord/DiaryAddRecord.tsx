import css from './DiaryAddRecord.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
}

export default function DiaryAddRecord({ onClose }: ModalProps) {
  return createPortal(
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2>Modal Title</h2>
        <p>This is some content inside the modal.</p>
      </div>
    </div>,
    document.body
  );
}
