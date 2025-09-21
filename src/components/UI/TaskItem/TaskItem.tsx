'use client';

import React from 'react';
import styles from './TaskItem.module.css';

interface Task {
  id: string;
  label: string;
  date: string;
  isCompleted: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div
      className={`${styles.taskItem} ${task.isCompleted ? styles.completed : ''}`}
      onClick={() => onToggle(task.id)}
    >
      <div
        className={`${styles.checkbox} ${task.isCompleted ? styles.checked : ''}`}
      >
        {task.isCompleted && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33333 8.66667L6.66667 12L12.6667 5.33333"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className={styles.content}>
        <span
          className={`${styles.date} ${task.isCompleted ? styles.completedText : ''}`}
        >
          {task.date}
        </span>
        <span
          className={`${styles.label} ${task.isCompleted ? styles.completedText : ''}`}
        >
          {task.label}
        </span>
      </div>
    </div>
  );
}
