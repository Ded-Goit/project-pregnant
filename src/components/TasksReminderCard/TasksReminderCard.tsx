'use client';

import styles from './TasksReminderCard.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuthStore';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { Task } from '../../types/note';
import Image from 'next/image';
import Button from '../UI/Buttons/Buttons';
import SpinnerFlowersLine from '../SpinnerFlowersLine/SpinnerFlowersLine';
import { nextServer } from '@/lib/api';

// Тип для завдання, як воно приходить з API
type ApiTask = Task & { _id: string };

export default function TasksReminderCard() {
  const { isAuthenticated } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    nextServer
      .get('/tasks')
      .then((response) => {
        const fetchedTasks = response.data.data.data as ApiTask[];
        const normalizedTasks: Task[] = fetchedTasks.map((task) => ({
          ...task,
          id: task._id, // Завжди використовуємо _id з API
        }));
        setTasks(normalizedTasks);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isAuthenticated]);

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
    } else {
      setModalOpen(true);
    }
  };

  const handleCheckboxChange = (taskId: string, isDone: boolean) => {
    nextServer
      .patch(`/tasks/${taskId}`, { isDone })
      .then(() => {
        setTasks((prev) =>
          // ✅ Тепер t.id гарантовано містить ID
          prev.map((t) => (t.id === taskId ? { ...t, isDone } : t))
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const closeAddTaskModal = () => setModalOpen(false);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  };

  const addTaskToList = (task: Task) => {
    setTasks((prev) => {
      // Створюємо нормалізоване завдання з гарантованим id
      const newTask: Task = {
        ...task,
        id: (task as ApiTask)._id || task.id, // Пріоритет _id, якщо є
      };

      const updatedTasks = [...prev, newTask];
      return updatedTasks.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });
  };

  if (loading && isAuthenticated)
    return (
      <section className={styles.tasksReminderCard}>
        <SpinnerFlowersLine />
      </section>
    );

  if (error)
    return (
      <section className={styles.tasksReminderCard} style={{ color: 'red' }}>
        Помилка: {error}
      </section>
    );

  return (
    <section className={styles.tasksReminderCard}>
      <button className={styles.addTaskButton} onClick={handleButtonClick}>
        <Image src="/vector.png" alt="Додати завдання" width={24} height={24} />
      </button>
      <h3 className={styles.tasksReminderTitle}>Важливі завдання</h3>
      <div className={styles.taskListWrapper}>
        {tasks.length === 0 && isAuthenticated ? (
          <div className={styles.noTasksMessageContainer}>
            <p className={styles.noTasksMessageTitle}>
              Наразі немає жодних завдань
            </p>
            <p className={styles.noTasksMessage}>
              Створіть мерщій нове завдання!
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={handleButtonClick}
              style={{ width: '173px', height: '42px' }}
            >
              Додати завдання
            </Button>
          </div>
        ) : (
          <ul className={styles.tasksList}>
            {tasks.map(({ id, date, name, isDone }) => {
              const taskIdForPatch = id as string; // ✅ Гарантуємо, що 'id' є рядком

              return (
                <li key={taskIdForPatch}>
                  <p className={styles.taskDate}>{formatDate(date)}</p>
                  <label className={styles.taskLabel}>
                    <input
                      type="checkbox"
                      checked={isDone}
                      // ✅ Передаємо гарантований ID
                      onChange={(e) =>
                        handleCheckboxChange(taskIdForPatch, e.target.checked)
                      }
                    />
                    <span className={styles.customCheckbox}></span>
                    <span className={styles.checkmark}>{name}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {modalOpen && (
        <AddTaskModal
          onClose={closeAddTaskModal}
          onSubmit={async (task: Task) => {
            console.log('Task received from form:', task); // 👈 Додайте цей лог

            addTaskToList(task);
            closeAddTaskModal();
          }}
        />
      )}
    </section>
  );
}
