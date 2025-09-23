'use client';

//import dynamic from 'next/dynamic';
// import styles from './AddTaskForm.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

// export default function AddTaskForm() {
//   return (
//     <div className={styles.component}>
//       <h1 className={styles.title}>
//         Отримує дані в поля для вводу від користувача та відправляє запит на
//         бекенд для збереження інформації в БД.
//       </h1>
//     </div>
//   );
// }
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Тип завдання
export interface Task {
  id?: string;
  text: string;
  date: string;
  completed?: boolean;
}

interface AddTaskFormProps {
  initialText?: string;
  initialTask?: Task;
  onSubmit: (task: Task) => void;
}

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .min(3, 'Завдання має бути не менше 3 символів')
    .max(255, 'Завдання занадто довге')
    .required("Обов'язкове поле"),
  date: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Формат дати: РРРР-ММ-ДД')
    .required("Обов'язкове поле"),
});

export default function AddTaskForm({
  initialTask,
  onSubmit,
}: AddTaskFormProps) {
  return (
    <div></div>
    // <Formik
    //   initialValues={{
    //     text: initialTask?.text || '',
    //     date: initialTask?.date || new Date().toISOString().slice(0, 10),
    //   }}
    //   validationSchema={validationSchema}
    //   onSubmit={async (values, { setSubmitting, setStatus }) => {
    //     try {
    //       const response = initialTask?.id
    //         ? await axios.put(`/api/tasks/${initialTask.id}`, {
    //             ...values,
    //             completed: initialTask.completed ?? false,
    //           })
    //         : await axios.post('/api/tasks', { ...values, completed: false });
    //       setSubmitting(false);
    //       // Передаємо повний Task у onSubmit
    //       onSubmit(response.data);
    //     } catch (error: any) {
    //       setStatus(error.response?.data?.message || 'Помилка при збереженні');
    //       setSubmitting(false);
    //     }
    //   }}
    // >
    //   {({ isSubmitting, status }) => (
    //     <Form>
    //       <div>
    //         <label htmlFor="text">Завдання</label>
    //         <Field type="text" name="text" id="text" />
    //         <ErrorMessage
    //           name="text"
    //           render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="date">Дата</label>
    //         <Field type="date" name="date" id="date" />
    //         <ErrorMessage
    //           name="date"
    //           render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
    //         />
    //       </div>
    //       {status && <div style={{ color: 'red' }}>{status}</div>}
    //       <button type="submit" disabled={isSubmitting}>
    //         Зберегти
    //       </button>
    //     </Form>
    //   )}
    // </Formik>
  );
}
