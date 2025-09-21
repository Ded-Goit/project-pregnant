'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '@/lib/api';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useId } from 'react';
import Link from '@/components/UI/Link';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невірний email')
    .max(64, 'Максимум 64 символи')
    .required('Обов’язково'),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Обов’язково'),
});

export default function LoginForm() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const fieldId = useId();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Вхід</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const { data } = await register(values);
              setUser(data);
              router.push('/profile/edit');
            } catch {
              setErrors({ email: 'Невірні дані', password: 'Невірні дані' });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              <Field
                id={`${fieldId}-email`}
                name="email"
                type="email"
                placeholder="hello@leleka.com"
                className={`${styles.field} ${
                  touched.email && errors.email ? styles.errorField : ''
                }`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.error}
              />

              <Field
                id={`${fieldId}-password`}
                name="password"
                type="password"
                placeholder="Пароль"
                className={`${styles.field} ${
                  touched.password && errors.password ? styles.errorField : ''
                }`}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={styles.error}
              />

              <button type="submit" disabled={isSubmitting}>
                Увійти
              </button>
            </Form>
          )}
        </Formik>

        <p className={styles.text}>
          Немає аккаунту?<Link>Зареєструватися</Link>
        </p>
      </div>
    </section>
  );
}
