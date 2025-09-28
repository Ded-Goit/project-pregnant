'use client';

import { api } from '@/app/api/api';
import styles from './GoogleLoginButton.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
}

export default function GoogleLoginButton({
  variant = 'primary',
  size = 'large',
}: ButtonProps) {
  const handleGoogleLogin = async () => {
    try {
      const res = await api.get('/auth/get-oauth-url');

      const url = res.data.data.url;
      window.location.href = url;
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]}`;

  return (
    <button className={buttonClasses} onClick={handleGoogleLogin}>
      Увійти через Google
    </button>
  );
}
