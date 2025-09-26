'use client';

import React, { useState } from 'react';
import styles from './Tabs.module.css';

interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: TabItem[];
  onTabChange: (value: string) => void;
  initialValue: string;
}

export default function Tabs({ tabs, onTabChange, initialValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(initialValue);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <div className={styles.tabsWrapper}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={`${styles.tab} ${activeTab === tab.value ? styles.active : styles.inactive}`}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
