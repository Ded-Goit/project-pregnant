'use client';

import React, { useState } from 'react';
import styles from './journeypage.module.css';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetailsBaby from '@/components/JourneyDetailsBaby/JourneyDetailsBaby';
import JourneyDetailsMom from '@/components/JourneyDetailsMom/JourneyDetailsMom';
import ButtonMomAndBaby from '@/components/ButtonMomAndBaby/ButtonMomAndBaby';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';

export default function Page() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<'baby' | 'mom'>('baby');
  const [currentWeek, setCurrentWeek] = useState<number | null>(
    user?.currentWeek.weekNumber || null
  );

  const router = useRouter();
  const weekChange = (week: number) => {
    setCurrentWeek(week);
    router.push(`/journey/${currentWeek}`);
  };

  return (
    <div className={styles.container}>
      <GreetingBlock userName={user?.name} />

      <WeekSelector
        total={42}
        startAt={1}
        onWeekChange={weekChange}
        currentWeek={currentWeek}
      />

      <ButtonMomAndBaby activeTab={activeTab} setActiveTab={setActiveTab} />

      {currentWeek &&
        (activeTab === 'baby' ? (
          <JourneyDetailsBaby currentWeek={currentWeek} />
        ) : (
          <JourneyDetailsMom currentWeek={currentWeek} />
        ))}
    </div>
  );
}
