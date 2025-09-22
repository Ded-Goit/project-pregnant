import React from 'react';
import styles from './Buttons.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
}

export default function Button({
  variant = 'primary',
  size = 'large',
  ...props
}: ButtonProps) {
  const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]}`;

  return (
    <button className={buttonClasses} {...props}>
      {props.children}
    </button>
  );
}
