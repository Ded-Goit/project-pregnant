'use client';

import React from 'react';
import { useField } from 'formik';
import styles from './TextInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string; // важливо для Formik
}

export default function TextInput({ label, ...props }: TextInputProps) {
  const [field, meta] = useField(props);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={`${styles.input} ${meta.touched && meta.error ? styles.errorInput : ''}`}
      />
      {meta.touched && meta.error ? (
        <span className={styles.errorText}>{meta.error}</span>
      ) : null}
    </div>
  );
}
