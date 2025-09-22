'use client';

//import dynamic from 'next/dynamic';
import styles from './TasksReminderCard.module.css';
import React, { useState } from 'react'; /*, useEffect*/
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { Task } from '../AddTaskForm/AddTaskForm';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

interface TasksReminderCardProps {
  isAuthenticated: boolean;
}

export default function TasksReminderCard({
  isAuthenticated,
}: TasksReminderCardProps) {
  // const [tasks, setTasks] = useState<Task[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setLoading(false);
  //     return;
  //   }
  //   axios
  //     .get('/api/user/tasks')
  //     .then((response) => {
  //       setTasks(response.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, [isAuthenticated]);

  // const handleCheckboxChange = (taskId: string, completed: boolean) => {
  //   axios
  //     .patch(`/api/user/tasks/${taskId}`, { completed })
  //     .then(() => {
  //       setTasks((prev) =>
  //         prev.map((t) => (t.id === taskId ? { ...t, completed } : t))
  //       );
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  const openAddTaskModal = () => {
    if (!isAuthenticated) {
      // router.push('/auth/register');
      return;
    }
    setModalOpen(true);
  };

  const closeAddTaskModal = () => setModalOpen(false);

  // const addTaskToList = (task: Task) => {
  //   setTasks((prev) => {
  //     const updatedTasks = [...prev, task];
  //     updatedTasks.sort(
  //       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  //     );
  //     return updatedTasks;
  //   });
  // };

  // if (loading)
  //   return (
  //     <section className="block tasks-reminder-card">
  //       Завантаження завдань...
  //     </section>
  //   );
  // if (error)
  //   return (
  //     <section className="block tasks-reminder-card" style={{ color: 'red' }}>
  //       Помилка: {error}
  //     </section>
  //   );

  return (
    <section className={styles.tasksReminderCard}>
      <button className={styles.addTaskButton} onClick={openAddTaskModal}>
        <img src="/vector.png" alt="Додати завдання" />
      </button>
      <h3 className={styles.tasksReminderTitle}>Важливі завдання</h3>
      <div className={styles.taskListWrapper}>
        <ul className={styles.tasksList}>
          <li>
            <p className={styles.taskDate}>22.07</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Записатися на другий плановий скринінг за 3 дні
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>22.07</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Записатися на другий плановий скринінг за 3 дні
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>22.07</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Записатися на другий плановий скринінг за 3 дні
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>22.07</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Записатися на другий плановий скринінг за 3 дні
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>22.07</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Записатися на другий плановий скринінг за 3 дні
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>22.07</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Записатися на другий плановий скринінг за 3 дні
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>22.07</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Записатися на другий плановий скринінг за 3 дні
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>22.07</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Записатися на другий плановий скринінг за 3 дні
              </span>
            </label>
          </li>
        </ul>

        {/* {tasks.length === 0 && <p>Немає активних завдань</p>}

        <ul>
          {tasks.map(({ id, text, completed }) => (
            <li key={id}>
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => {
                    if (typeof id === 'string') {
                      handleCheckboxChange(id, e.target.checked);
                    }
                  }}
                />
                {text}
              </label>
            </li>
          ))}
        </ul> */}
      </div>
      {modalOpen && (
        <AddTaskModal
          onClose={closeAddTaskModal}
          onSubmit={async (task: Task) => {
            // addTaskToList(task);
            closeAddTaskModal();
          }}
        />
      )}
    </section>
  );
}
