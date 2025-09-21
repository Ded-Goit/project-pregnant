'use client';

//import dynamic from 'next/dynamic';
import styles from './GreetingBlock.module.css';
import React, { useEffect, useState } from 'react';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

function getGreeting(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour <= 11) {
    return 'Доброго ранку';
  } else if (hour >= 12 && hour <= 17) {
    return 'Доброго дня';
  } else if (hour >= 18 && hour <= 23) {
    return 'Доброго вечора';
  } else {
    return 'Доброї ночі';
  }
}

export default function GreetingBlock() {
  const greeting = getGreeting();

  const [userName, setUserName] = useState<string>('Пані');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetch('/api/user/profile')
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('Помилка при завантаженні імені');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data.name) {
  //         setUserName(data.name);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <section className={styles.greetingBlock}>
      <h2>
        {greeting}, {userName}!
      </h2>
      {/* {loading && <p>Завантаження...</p>} */}
      {/* {error && <p style={{ color: 'red' }}>Помилка: {error}</p>} */}
    </section>
  );
}
