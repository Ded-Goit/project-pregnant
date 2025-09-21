'use client';

import React, { useState } from 'react';
import styles from './Select.module.css';

interface SelectProps {
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

export default function Select({
  options,
  placeholder = 'Select one...',
  onSelect,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(value);
  };

  const displayValue = selectedValue || placeholder;

  return (
    <div className={styles.selectWrapper}>
      <button
        type="button"
        className={`${styles.selectButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleDropdown}
      >
        {displayValue}
        <span className={styles.icon}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`${styles.dropdownItem} ${selectedValue === option ? styles.active : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
