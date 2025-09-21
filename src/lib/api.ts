import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  gender: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  const { user } = useAuthStore.getState();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const register = async (payload: RegisterRequest) => {
  const { data } = await nextServer.post('/auth/register', payload);
  return data;
};

export default nextServer;
