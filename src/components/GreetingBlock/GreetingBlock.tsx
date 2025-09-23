'use client';

//import dynamic from 'next/dynamic';
import styles from './GreetingBlock.module.css';

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
  );
}

