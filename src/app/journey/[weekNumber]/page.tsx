'use client';

import React from 'react';
import styles from './journeypage.module.css';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetailsBaby from '@/components/JourneyDetailsBaby/JourneyDetailsBaby';
import JourneyDetailsMom from '@/components/JourneyDetailsMom/JourneyDetailsMom';
import ButtonMomAndBaby from '@/components/ButtonMomAndBaby/ButtonMomAndBaby';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useParams } from 'next/navigation';

export default function Page() {
  const { weekNumber } = useParams<{ weekNumber: string }>();
  const user = useAuthStore((state) => state.user);

  const activeTab = useAuthStore((s) => s.activeTab);
  const setActiveTab = useAuthStore((s) => s.setActiveTab);
  const week = Number(weekNumber);
  return (
    <div className={styles.container}>
      <GreetingBlock userName={user?.name} />

      <WeekSelector total={42} startAt={1} currentWeek={week} />

      <ButtonMomAndBaby activeTab={activeTab} setActiveTab={setActiveTab} />

      {weekNumber &&
        (activeTab === 'baby' ? (
          <JourneyDetailsBaby currentWeek={week} />
        ) : (
          <JourneyDetailsMom currentWeek={week} />
        ))}
    </div>
  );
}
