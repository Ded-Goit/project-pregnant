'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '@/lib/api';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Невірний email').required('Обов’язково'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Обов’язково'),
});

export default function LoginForm() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return (
    <div className={styles.dashboardWrapper}>
      <h1 className={styles.title}>
        Вхід сторінка вводу логіну з компонентами
      </h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const { data } = await api.post('/auth/login', values);
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
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder="Пароль" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Увійти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
