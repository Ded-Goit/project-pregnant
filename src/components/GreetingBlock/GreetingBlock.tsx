'use client';

import React from 'react';
import styles from './GreetingBlock.module.css';

type GreetingBlockProps = {
  userName?: string;
};

export default function GreetingBlock({ userName }: GreetingBlockProps) {
  return <h1 className={styles.root}>Доброго ранку, {userName}!</h1>;
}
