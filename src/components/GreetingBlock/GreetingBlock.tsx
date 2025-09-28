'use client';

import React from 'react';
import styles from './GreetingBlock.module.css';

type GreetingBlockProps = {
  userName?: string;
};

export default function GreetingBlock({ userName }: GreetingBlockProps) {
  return <h1 className={styles.root}>Доброго ранку, {userName}!</h1>;
}

// import styles from './GreetingBlock.module.css';

// const FeelingCheckCard = dynamic(
//   () => import('@/components/dashboard/feeling-check-card')
// );
