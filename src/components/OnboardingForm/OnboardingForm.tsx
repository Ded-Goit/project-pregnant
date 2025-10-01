'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId, useState } from 'react';
import styles from './OnboardingForm.module.css';
import Button from '@/components/UI/Buttons/Buttons';
import Image from 'next/image';

// Тип значень форми
export interface OnboardingFormValues {
  avatar: File | string | null;
  childGender: string;
  dueDate: string;
}

// Пропси від сторінки
interface OnboardingFormProps {
  initialData: OnboardingFormValues;
  onSubmit: (values: OnboardingFormValues) => Promise<void>;
  onAvatarUpload: (file: File) => Promise<string>;
}

// Схема валідації Yup
const OnboardingSchema: Yup.ObjectSchema<OnboardingFormValues> = Yup.object({
  avatar: Yup.mixed<File | string>()
    .nullable()
    .default(null)
    .test(
      'fileSize',
      'Файл занадто великий (макс 2MB)',
      (value) =>
        !value ||
        (value instanceof File && value.size <= 2 * 1024 * 1024) ||
        typeof value === 'string'
    )
    .test(
      'fileType',
      'Невірний формат (тільки JPG/PNG)',
      (value) =>
        !value ||
        typeof value === 'string' ||
        (value instanceof File &&
          ['image/jpeg', 'image/png'].includes(value.type))
    ),
  childGender: Yup.string().required('Оберіть стать дитини'),
  dueDate: Yup.string().required('Оберіть дату'),
});

export default function OnboardingForm({
  initialData,
  onSubmit,
  onAvatarUpload,
}: OnboardingFormProps) {
  const fieldId = useId();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    typeof initialData.avatar === 'string' ? initialData.avatar : null
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Давайте познайомимось ближче</h1>

        <Formik<OnboardingFormValues>
          initialValues={initialData}
          validationSchema={OnboardingSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting, errors, touched, values }) => (
            <Form className={styles.form}>
              {/* Аватар */}
              <div className={styles.avatarWrapper}>
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Аватар"
                    width={164}
                    height={164}
                    className={styles.avatarPreview}
                  />
                ) : (
                  <Image
                    src="/auth/avatar-image.webp"
                    alt="Аватар за замовчуванням"
                    width={164}
                    height={164}
                    className={styles.avatarPreview}
                  />
                )}

                <label
                  htmlFor={`${fieldId}-avatar`}
                  className={styles.uploadBtn}
                >
                  Завантажити фото
                </label>
                <input
                  id={`${fieldId}-avatar`}
                  name="avatar"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={async (e) => {
                    const file = e.currentTarget.files?.[0] || null;
                    if (file) {
                      setFieldValue('avatar', file);
                      const previewUrl = await onAvatarUpload(file);
                      setAvatarPreview(previewUrl);
                    } else {
                      setFieldValue('avatar', null);
                      setAvatarPreview(null);
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <ErrorMessage
                  name="avatar"
                  component="span"
                  className={styles.error}
                />
              </div>

              {/* Стать дитини */}
              <div className={styles.data_selection}>
                <label
                  className={styles.label}
                  htmlFor={`${fieldId}-childGender`}
                >
                  Стать дитини
                  <div className={styles.selectWrapper}>
                    <Field
                      as="select"
                      id={`${fieldId}-childGender`}
                      name="childGender"
                      className={`${styles.field} ${
                        !values.childGender ? styles.placeholder : ''
                      } ${
                        touched.childGender && errors.childGender
                          ? styles.errorField
                          : ''
                      }`}
                    >
                      <option value="" disabled>
                        Оберіть стать
                      </option>
                      <option value="boy">Хлопчик</option>
                      <option value="girl">Дівчинка</option>
                      <option value="I don`t know yet">Ще не знаю</option>
                    </Field>
                    <span className={styles.arrow}></span>
                  </div>
                  <ErrorMessage
                    name="childGender"
                    component="span"
                    className={styles.error}
                  />
                </label>

                {/* Дата пологів */}
                <label className={styles.label} htmlFor={`${fieldId}-dueDate`}>
                  Планова дата пологів
                  <Field
                    id={`${fieldId}-dueDate`}
                    name="dueDate"
                    type="date"
                    className={`${styles.field} ${
                      !values.dueDate ? styles.placeholder : ''
                    } ${
                      touched.dueDate && errors.dueDate ? styles.errorField : ''
                    }`}
                    placeholder="Оберіть дату"
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="span"
                    className={styles.error}
                  />
                </label>
              </div>

              <Button type="submit" disabled={isSubmitting}>
                Зберегти
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Ілюстрація справа */}
      <Image
        className={styles.vision}
        src="/auth/onboarding.webp"
        alt=""
        width={720}
        height={900}
      />
    </div>
  );
}
