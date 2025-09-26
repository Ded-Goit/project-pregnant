'use client';

import { api } from '@/app/api/api';

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

  return <button onClick={handleGoogleLogin}>Увійти через Google</button>;
}
