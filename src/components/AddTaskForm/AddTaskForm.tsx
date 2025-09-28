'use client';

import styles from './AddTaskForm.module.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../UI/Buttons/Buttons';
import type { Task } from '../../types/note';
// import axios from 'axios';
// import next from 'next';
import { nextServer } from '@/lib/api';

interface AddTaskFormProps {
  initialText?: Task;
  onSubmit: (task: Task) => void;
}

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .min(3, 'Завдання має бути не менше 3 символів')
    .max(255, 'Завдання занадто довге')
    .required("Обов'язкове поле"),
  date: Yup.date()
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      'Дата не може бути у минулому'
    )
    .required("Обов'язкове поле"),
});

export async function saveTask(
  taskId: string | undefined,
  data: Omit<Task, 'id'>
): Promise<Task> {
  let response;
  if (taskId) {
    response = await nextServer.patch(`/tasks/${taskId}/status`, data);
    return response.data.data.data;
  } else {
    response = await nextServer.post('/tasks', data);
    return response.data.data.data;
  }
}

export default function AddTaskForm({
  initialText,
  onSubmit,
}: AddTaskFormProps) {
  return (
    <div>
      <Formik
        initialValues={{
          text: initialText?.name || '',
          date: initialText?.date
            ? initialText.date.slice(0, 10)
            : new Date().toISOString().slice(0, 10),
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const savedTask = await saveTask(initialText?.id, {
              name: values.text,
              date: values.date,
              isDone: initialText?.isDone ?? false,
            });
            setSubmitting(false);
            onSubmit(savedTask);
          } catch (error: unknown) {
            if (
              error &&
              typeof error === 'object' &&
              'response' in error &&
              error.response &&
              typeof error.response === 'object' &&
              'data' in error.response &&
              error.response.data &&
              typeof error.response.data === 'object' &&
              'message' in error.response.data
            ) {
              setStatus((error.response.data as { message?: string }).message);
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
