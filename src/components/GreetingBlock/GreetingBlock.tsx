'use client';

// import axios from 'axios';
//import dynamic from 'next/dynamic';
import styles from './GreetingBlock.module.css';
// import React, { useEffect, useState } from 'react';

// axios.defaults.baseURL = 'https://project-pregnant-back.onrender.com';
/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function GreetingBlock({ userName }: GreetingBlockProps) {
  return <h1 className={styles.root}>Доброго ранку, {userName}!</h1>;
}

// import styles from './GreetingBlock.module.css';

// const FeelingCheckCard = dynamic(
//   () => import('@/components/dashboard/feeling-check-card')
// );
