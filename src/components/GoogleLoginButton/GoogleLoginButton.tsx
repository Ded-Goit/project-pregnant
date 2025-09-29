'use client';

import { api } from '@/app/api/api';
import styles from './GoogleLoginButton.module.css';



export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      const res = await api.get('/auth/get-oauth-url');

      const url = res.data.data.url;
      window.location.href = url;
    } catch (error) {
      console.error('Google login error:', error);
    }
  };


  return (

    <button className={styles.googleBtn} onClick={handleGoogleLogin}>
      <span className={styles.googleIcon} aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <path
            fill="#EA4335"
            d="M9 7.5v3h4.4c-.2 1.2-1.3 3.4-4.4 3.4-2.6 0-4.8-2.1-4.8-4.8S6.4 4.3 9 4.3c1.5 0 2.6.6 3.2 1.1l2.2-2.1C13.8 2.2 11.7 1 9 1 4.6 1 1 4.6 1 9s3.6 8 8 8c4.6 0 7.8-3.1 7.8-7.5 0-.5-.1-1-.2-1.5H9z"
          />
          <path
            fill="#FBBC05"
            d="M1 5.3l3 2.2C4.5 6 6.6 4.3 9 4.3c1.5 0 2.6.6 3.2 1.1l2.2-2.1C13.8 2.2 11.7 1 9 1 6 1 3.5 2.4 1 5.3z"
          />
          <path
            fill="#34A853"
            d="M9 16.9c2.6 0 4.8-1 6.3-2.7l-3-2.4C11.3 13.9 10.3 14.4 9 14.4c-3 0-5.1-1.9-5.9-4.5L1 11.6C1.9 14.8 4.9 16.9 9 16.9z"
          />
          <path
            fill="#4285F4"
            d="M17.9 9c0-.6-.1-1-.2-1.5H9v3h4.9c-.2 1.2-1.3 3.4-4.4 3.4 0 0 0 0 0 0v2.1c4.1 0 7.1-2.1 7.6-5.1z"
          />
        </svg>
      </span>
      <span className={styles.googleText}>Увійти за допомогою Google</span>
    </button>
  );
}
