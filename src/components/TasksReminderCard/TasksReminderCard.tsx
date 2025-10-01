'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdAddCircleOutline } from 'react-icons/md';

import styles from './TasksReminderCard.module.css';
import { useAuthStore } from '@/hooks/useAuthStore';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { Task } from '../../types/note';
import Button from '../UI/Buttons/Buttons';
import SpinnerFlowersLine from '../SpinnerFlowersLine/SpinnerFlowersLine';
import { nextServer } from '@/lib/api';

type ApiTask = Task & { _id: string };

export default function TasksReminderCard() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [updatingTasks, setUpdatingTasks] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    nextServer
      .get('/tasks')
      .then((res) => {
        const fetchedTasks = res.data.data.data as ApiTask[];
        const normalized = fetchedTasks.map((t) => ({ ...t, id: t._id }));
        setTasks(normalized);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isAuthenticated]);

  const handleButtonClick = () => {
    if (!isAuthenticated) router.push('/auth/register');
    else setModalOpen(true);
  };

  const handleCheckboxChange = (taskId: string, isDone: boolean) => {
    setUpdatingTasks((prev) => new Set(prev).add(taskId));

    nextServer
      .patch(`/tasks/${taskId}`, { isDone })
      .then(() => {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, isDone } : t))
        );
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setUpdatingTasks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(taskId);
          return newSet;
        });
      });
  };

  const closeAddTaskModal = () => setModalOpen(false);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${`${d.getDate()}`.padStart(2, '0')}.${`${d.getMonth() + 1}`.padStart(2, '0')}`;
  };

  const addTaskToList = (task: Task) => {
    setTasks((prev) => {
      const newTask: Task = { ...task, id: (task as ApiTask)._id || task.id };
      return [...prev, newTask].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });
  };

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekLater = new Date(today);
  weekLater.setDate(today.getDate() + 7);

  const tasksToday = tasksToRender.filter((t) => {
    const d = new Date(t.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const tasksNextWeek = tasksToRender.filter((t) => {
    const d = new Date(t.date);
    d.setHours(0, 0, 0, 0);
    return d > today && d <= weekLater;
  });

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
      <button
        className={styles.addTaskButton}
        onClick={handleButtonClick}
        aria-label="Додати завдання"
      >
        <MdAddCircleOutline className={styles.svg} />
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
              style={{ width: 173, height: 42 }}
            >
              Додати завдання
            </Button>
          </div>
        ) : (
          <>
            <h4 className={styles.groupTitle}>Сьогодні</h4>
            {tasksToday.length ? (
              <ul className={styles.tasksList}>
                {tasksToday.map(({ id, date, name, isDone }) => (
                  <li key={id} className={styles.taskItem}>
                    <p className={styles.taskDate}>{formatDate(date)}</p>
                    <label className={styles.taskLabel}>
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={(e) =>
                          handleCheckboxChange(id, e.target.checked)
                        }
                      />
                      <span className={styles.customCheckbox}></span>
                      <span
                        className={`${styles.taskNameWrapper} ${isDone ? styles.done : ''}`}
                      >
                        {/* Текст завдання стає прозорим, якщо оновлюється */}
                        <span
                          className={
                            updatingTasks.has(id) ? styles.taskNameHidden : ''
                          }
                        >
                          {name}
                        </span>
                        {updatingTasks.has(id) && (
                          <span className={styles.taskLoader}>
                            <SpinnerFlowersLine />
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noTasksMessage}>Завдань на сьогодні немає</p>
            )}

            <h4 className={styles.groupTitle}>Найближчий тиждень</h4>
            {tasksNextWeek.length ? (
              <ul className={styles.tasksList}>
                {tasksNextWeek.map(({ id, date, name, isDone }) => (
                  <li key={id}>
                    <p className={styles.taskDate}>{formatDate(date)}</p>
                    <label className={styles.taskLabel}>
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={(e) =>
                          handleCheckboxChange(id, e.target.checked)
                        }
                      />
                      <span className={styles.customCheckbox}></span>
                      <span className={styles.checkmark}>{name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noTasksMessage}>
                Завдань на найближчий тиждень немає
              </p>
            )}
          </>
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
