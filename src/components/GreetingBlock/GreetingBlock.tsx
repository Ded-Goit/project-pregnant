'use client';

import React from 'react';
import styles from './GreetingBlock.module.css';

type GreetingBlockProps = {
  userName?: string;
};

function getGreeting(): string {
  const hours = new Date().getHours();

  if (hours >= 6 && hours < 12) {
    return 'Доброго ранку';
  } else if (hours >= 12 && hours < 18) {
    return 'Доброго дня';
  } else if (hours >= 18 && hours < 24) {
    return 'Доброго вечора';
  } else {
    return 'Доброї ночі';
  }
}

export default function GreetingBlock({ userName }: GreetingBlockProps) {
  const greeting = getGreeting();
  const greetingChoice = userName || 'майбутня мама';

  return (
    <h1 className={styles.root}>
      {greeting}, {greetingChoice}!
    </h1>
  );
}
