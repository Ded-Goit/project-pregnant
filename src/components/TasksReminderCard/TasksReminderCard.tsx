'use client';

import styles from './TasksReminderCard.module.css';
import React, { useState, useEffect } from 'react'; /**/
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuthStore';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { Task } from '../../types/note';
import Image from 'next/image';
import Button from '../UI/Buttons/Buttons';
import SpinnerFlowersLine from '../SpinnerFlowersLine/SpinnerFlowersLine';

// interface TasksReminderCardProps {
//   isAuthenticated: boolean;
// }

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
    axios
      .get('/api/tasks')
      .then((response) => {
        setTasks(response.data);
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

  const handleCheckboxChange = (taskId: string, completed: boolean) => {
    axios
      .patch(`/api/tasks/${taskId}/status`, { completed })
      .then(() => {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, completed } : t))
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // const openAddTaskModal = () => {
  //   if (isAuthenticated) {
  //     router.push('/auth/register');
  //     return;
  //   }
  //   setModalOpen(true);
  // };

  const closeAddTaskModal = () => setModalOpen(false);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  };

  const addTaskToList = (task: Task) => {
    setTasks((prev) => {
      const updatedTasks = [...prev, task];
      updatedTasks.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return updatedTasks;
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

  //ДОДАВ ПОТОЧНУ ДАТУ ДЛЯ ТАСКІВ НЕЗАРЕЄСТРОВАНОГО КОРИСТУВАЧА==================================================

  // Функція для отримання актуальної дати у форматі ДД.ММ
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  };

  // const currentDate = getCurrentDate();

  const staticTasks: Task[] = [
    {
      id: '1',
      date: new Date().toISOString(),
      name: 'Звернутись до гінеколога',
      isDone: false,
    },
    {
      id: '2',
      date: new Date().toISOString(),
      name: 'Почати приймати фолієву кислоту',
      isDone: false,
    },
    {
      id: '3',
      date: new Date().toISOString(),
      name: 'Відмовитись від шкідливих звичок',
      isDone: false,
    },
    {
      id: '4',
      date: new Date().toISOString(),
      name: 'Переглянути харчування',
      isDone: false,
    },
    {
      id: '5',
      date: new Date().toISOString(),
      name: 'Дотримуватись легкої фізичної активності',
      isDone: false,
    },
    {
      id: '6',
      date: new Date().toISOString(),
      name: 'Дбати про емоційний стан',
      isDone: false,
    },
    {
      id: '7',
      date: new Date().toISOString(),
      name: 'Подбати про безпеку в авто',
      isDone: false,
    },
    {
      id: '8',
      date: new Date().toISOString(),
      name: 'Повідомити близьких про вагітність',
      isDone: false,
    },
  ];

  const tasksToRender = isAuthenticated ? tasks : staticTasks;

  return (
    <section className={styles.tasksReminderCard}>
      <button className={styles.addTaskButton} onClick={handleButtonClick}>
        <Image src="/vector.png" alt="Додати завдання" width={24} height={24} />
      </button>
      <h3 className={styles.tasksReminderTitle}>Важливі завдання</h3>
      <div className={styles.taskListWrapper}>
        {tasksToRender.length === 0 && isAuthenticated ? (
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
            {tasksToRender.map(({ id, date, name, isDone }) => (
              <li key={id}>
                <p className={styles.taskDate}>
                  {isAuthenticated ? formatDate(date) : getCurrentDate()}
                </p>
                <label className={styles.taskLabel}>
                  <input
                    type="checkbox"
                    defaultChecked={isDone}
                    onChange={(e) =>
                      isAuthenticated &&
                      typeof id === 'string' &&
                      handleCheckboxChange(id, e.target.checked)
                    }
                    disabled={!isAuthenticated}
                  />
                  <span className={styles.customCheckbox}></span>
                  <span className={styles.checkmark}>{name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {modalOpen && (
        <AddTaskModal
          onClose={closeAddTaskModal}
          onSubmit={async (task: Task) => {
            addTaskToList(task);
            closeAddTaskModal();
          }}
        />
      )}
    </section>
  );
}
