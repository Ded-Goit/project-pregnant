'use client';

//import dynamic from 'next/dynamic';
import styles from './TasksReminderCard.module.css';
import React, { useState } from 'react'; /*, useEffect*/
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
//import { Task } from '../AddTaskForm/AddTaskForm';
import Image from 'next/image';

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

  //ДОДАВ ПОТОЧНУ ДАТУ ДЛЯ ТАСКІВ НЕЗАРЕЄСТРОВАНОГО КОРИСТУВАЧА==================================================

  // Функція для отримання актуальної дати у форматі ДД.ММ
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  };

  const currentDate = getCurrentDate();


  return (
    <section className={styles.tasksReminderCard}>
      <button className={styles.addTaskButton} onClick={openAddTaskModal}>
        <Image src="/vector.png" alt="Додати завдання" width={24} height={24} />
      </button>
      <h3 className={styles.tasksReminderTitle}>Важливі завдання</h3>
      <div className={styles.taskListWrapper}>
        <ul className={styles.tasksList}>
          <li>
            <p className={styles.taskDate}>{currentDate}</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Звернутись до гінеколога
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>{currentDate}</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Почати приймати фолієву кислоту
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>{currentDate}</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Відмовитись від шкідливих звичок
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>{currentDate}</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Переглянути харчування
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>{currentDate}</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Дотримуватись легкої фізичної активності
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>{currentDate}</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Дбати про емоційний стан
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>{currentDate}</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Подбати про безпеку в авто
              </span>
            </label>
          </li>
          <li>
            <p className={styles.taskDate}>{currentDate}</p>
            <label className={styles.taskLabel}>
              <input type="checkbox" />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkmark}>
                Повідомити близьких про вагітність
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
          // onSubmit={async (task: Task) => {
          //   // addTaskToList(task);
          //   closeAddTaskModal();
          // }}
        />
      )}
    </section>
  );
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//ПОДИВИСЬ ЦЕЙ ВАРІАНТ
/**Якщо користувач неавторизований → показати список статичних завдань (які ти написав) з поточним днем.

Якщо авторизований → підтягувати завдання з бекенду й показувати їх.

Ось адаптований код:

'use client';

import styles from './TasksReminderCard.module.css';
import React, { useState, useEffect } from 'react';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import Image from 'next/image';

interface Task {
  id: string;
  date: string; // формат YYYY-MM-DD
  text: string;
  completed: boolean;
}

interface TasksReminderCardProps {
  isAuthenticated: boolean;
}

export default function TasksReminderCard({
  isAuthenticated,
}: TasksReminderCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openAddTaskModal = () => {
    if (!isAuthenticated) return;
    setModalOpen(true);
  };

  const closeAddTaskModal = () => setModalOpen(false);

  // форматування дати у ДД.ММ
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  };

  // функція для поточної дати
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  };

  // статичні завдання для незареєстрованого користувача
  const staticTasks: Task[] = [
    { id: '1', date: new Date().toISOString(), text: 'Звернутись до гінеколога', completed: false },
    { id: '2', date: new Date().toISOString(), text: 'Почати приймати фолієву кислоту', completed: false },
    { id: '3', date: new Date().toISOString(), text: 'Відмовитись від шкідливих звичок', completed: false },
    { id: '4', date: new Date().toISOString(), text: 'Переглянути харчування', completed: false },
    { id: '5', date: new Date().toISOString(), text: 'Дотримуватись легкої фізичної активності', completed: false },
    { id: '6', date: new Date().toISOString(), text: 'Дбати про емоційний стан', completed: false },
    { id: '7', date: new Date().toISOString(), text: 'Подбати про безпеку в авто', completed: false },
    { id: '8', date: new Date().toISOString(), text: 'Повідомити близьких про вагітність', completed: false },
  ];

  // отримання даних з бекенду для авторизованого користувача
  useEffect(() => {
    if (!isAuthenticated) {
      setTasks(staticTasks);
      setLoading(false);
      return;
    }

    fetch('/api/user/tasks')
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isAuthenticated]);

  if (loading) {
    return <section className={styles.tasksReminderCard}>Завантаження...</section>;
  }

  if (error) {
    return (
      <section className={styles.tasksReminderCard} style={{ color: 'red' }}>
        Помилка: {error}
      </section>
    );
  }

  return (
    <section className={styles.tasksReminderCard}>
      <button className={styles.addTaskButton} onClick={openAddTaskModal}>
        <Image src="/vector.png" alt="Додати завдання" width={24} height={24} />
      </button>
      <h3 className={styles.tasksReminderTitle}>Важливі завдання</h3>
      <div className={styles.taskListWrapper}>
        {tasks.length === 0 ? (
          <p>Немає активних завдань</p>
        ) : (
          <ul className={styles.tasksList}>
            {tasks.map(({ id, date, text, completed }) => (
              <li key={id}>
                <p className={styles.taskDate}>
                  {isAuthenticated ? formatDate(date) : getCurrentDate()}
                </p>
                <label className={styles.taskLabel}>
                  <input type="checkbox" defaultChecked={completed} />
                  <span className={styles.customCheckbox}></span>
                  <span className={styles.checkmark}>{text}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {modalOpen && <AddTaskModal onClose={closeAddTaskModal} />}
    </section>
  );
} */