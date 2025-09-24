'use client';

import axios from 'axios';
//import dynamic from 'next/dynamic';
import styles from './GreetingBlock.module.css';
// import React, { useEffect, useState } from 'react';

axios.defaults.baseURL = 'https://project-pregnant-back.onrender.com';
/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/



import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function GreetingBlock() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/users/currentUser");
        setUserName(res.data.data.name);
      } catch {
        setUserName("майбутня мама")
        toast.error("Не вдалося завантажити ім’я користувача");
      }
    }

    fetchUser();
  }, []);

  function getGreeting(): string {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 6 && hours < 12) return "Доброго ранку";
    if (hours >= 12 && hours < 18) return "Доброго дня";
    if (hours >= 18 && hours < 24) return "Доброго вечора";
    return "Доброї ночі";
  }

  return (
    <div className={styles.container}>
        <p className={styles.text}>
          {getGreeting()}, {userName}!
        </p>

      <Toaster position="top-right" reverseOrder={false} />
    </div>

interface GreetingBlockProps {
  userName: string;
}

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

export default function GreetingBlock({ userName }: GreetingBlockProps) {
  const greeting = getGreeting();

 

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

