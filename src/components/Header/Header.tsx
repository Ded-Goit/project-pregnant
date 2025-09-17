'use client';

//import dynamic from 'next/dynamic';
import styles from './Header.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function Header() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Компонент відображається тільки на мобільній версії та планшеті. На
        десктопній версії хедер відсутній.
      </h1>
    </div>
  );
}
