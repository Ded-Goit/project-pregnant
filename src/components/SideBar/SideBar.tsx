'use client';

//import dynamic from 'next/dynamic';
import styles from './SideBar.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function SideBar() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Бічна панель, розташована зліва. Містить логотип та основні елементи
        навігації. Мобілка/Планшет: Функціонал сайдбару ховається в `бургер`
        меню, яке потрібно реалізувати відповідно до макету.
      </h1>
    </div>
  );
}
