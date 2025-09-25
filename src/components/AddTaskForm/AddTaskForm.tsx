'use client';

//import dynamic from 'next/dynamic';
import styles from './AddTaskForm.module.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from '../UI/Buttons/Buttons';

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
    <div>
      <Formik
        initialValues={{
          text: initialTask?.text || '',
          date: initialTask?.date || new Date().toISOString().slice(0, 10),
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const response = initialTask?.id
              ? await axios.put(`/api/tasks/${initialTask.id}`, {
                  ...values,
                  completed: initialTask.completed ?? false,
                })
              : await axios.post('/api/tasks', { ...values, completed: false });
            setSubmitting(false);
            // Передаємо повний Task у onSubmit
            onSubmit(response.data);
          } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
              setStatus(error.response.data.message);
            } else {
              setStatus('Помилка при збереженні');
            }
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className={styles.formWrapper}>
            <div className={styles.formGroup}>
              <label className={styles.taskLabel} htmlFor="text">
                Назва завдання
              </label>
              <Field
                className={styles.taskItem}
                type="text"
                name="text"
                id="text"
                placeholder="Прийняти вітаміни"
              />
              <ErrorMessage
                name="text"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.taskLabel} htmlFor="date">
                Дата
              </label>
              <Field
                className={styles.taskItem}
                type="date"
                name="date"
                id="date"
              />
              <ErrorMessage
                name="date"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />
            </div>
            {status && <div style={{ color: 'red' }}>{status}</div>}
            <Button
              variant="primary"
              size="large"
              type="submit"
              disabled={isSubmitting}
              style={{ width: '295px' }}
            >
              Зберегти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
