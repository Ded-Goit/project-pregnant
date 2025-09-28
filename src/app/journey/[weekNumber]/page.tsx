'use client';

import React, { useState } from "react";
import styles from "./journeypage.module.css";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import JourneyDetailsBaby from "@/components/JourneyDetailsBaby/JourneyDetailsBaby";
import JourneyDetailsMom from "@/components/JourneyDetailsMom/JourneyDetailsMom";
import ButtonMomAndBaby from "@/components/ButtonMomAndBaby/ButtonMomAndBaby";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"baby" | "mom">("baby");
  const [currentWeek, setCurrentWeek] = useState<number>(1);

  return (
    <div className={styles.container}>
      <GreetingBlock userName="Пані" />

      <WeekSelector total={42} startAt={1} onWeekChange={setCurrentWeek} />

      <ButtonMomAndBaby activeTab={activeTab} setActiveTab={setActiveTab} />

      {currentWeek && (
        activeTab === "baby" ? (
          <JourneyDetailsBaby currentWeek={currentWeek} />
        ) : (
          <JourneyDetailsMom currentWeek={currentWeek} />
        )
      )}
    </div>
  );
}