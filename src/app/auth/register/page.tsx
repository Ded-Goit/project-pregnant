'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '@/lib/api';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';
import { useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().max(32, 'Максимум 32 символи').required('Обов’язково'),
  email: Yup.string()
    .email('Невірний email')
    .max(64, 'Максимум 64 символи')
    .required('Обов’язково'),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Обов’язково'),
});

export default function RegistrationForm() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const fieldId = useId();

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Реєстрація</h1>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const data = await register(values);
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
                <label className={styles.label} htmlFor={`${fieldId}-username`}>
                  Ім’я*
                  <Field
                    id={`${fieldId}-username`}
                    name="name"
                    type="text"
                    placeholder="Ваше імʼя"
                    className={`${styles.field} ${
                      touched.name && errors.name ? styles.errorField : ''
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={styles.error}
                  />
                </label>

                <label className={styles.label} htmlFor={`${fieldId}-email`}>
                  Пошта*
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
                </label>

                <label className={styles.label} htmlFor={`${fieldId}-password`}>
                  Пароль*
                  <Field
                    id={`${fieldId}-password`}
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    className={`${styles.field} ${
                      touched.password && errors.password
                        ? styles.errorField
                        : ''
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className={styles.error}
                  />
                </label>

                <button type="submit" disabled={isSubmitting}>
                  Зареєструватися
                </button>
              </Form>
            )}
          </Formik>

          <p className={styles.text}>
            Вже маєте аккаунт?
            <Link href="/auth/login" className={styles.link}>
              Увійти
            </Link>
          </p>
        </div>
      </section>
      <Image
        className={styles.vision}
        src="/auth/register.webp"
        alt=""
        width={720}
        height={900}
      />
    </div>
  );
}
