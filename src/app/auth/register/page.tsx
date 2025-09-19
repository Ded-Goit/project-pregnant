'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '@/lib/api';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';
import { useId } from 'react';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Обов’язково'),
  email: Yup.string().email('Невірний email').required('Обов’язково'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Обов’язково'),
});

export default function RegistrationForm() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const fieldId = useId();

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Реєстрація</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const { data } = await api.post('/auth/register', values);
            setUser(data);
            router.push('/');
          } catch {
            setErrors({ email: 'Невірні дані', password: ' ' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <label className={styles.label} htmlFor={`${fieldId}-username`}>
              Ім’я*
              <Field
                type="text"
                name="name"
                placeholder="Ваше імʼя"
                id={`${fieldId}-username`}
              />
              <ErrorMessage name="name" component="div" />
            </label>

            <label className={styles.label} htmlFor={`${fieldId}-email`}>
              Пошта*
              <Field
                type="email"
                name="email"
                placeholder="hello@leleka.com"
                id={`${fieldId}-email`}
              />
              <ErrorMessage name="email" component="div" />
            </label>

            <label className={styles.label} htmlFor={`${fieldId}-password`}>
              Пароль*
              <Field
                type="password"
                name="password"
                placeholder="Пароль"
                id={`${fieldId}-password`}
              />
              <ErrorMessage name="password" component="div" />
            </label>

            <button type="submit" disabled={isSubmitting}>
              Зареєструватися
            </button>
          </Form>
        )}
      </Formik>
      <p>Вже маєте аккаунт?</p>
    </section>
  );
}
