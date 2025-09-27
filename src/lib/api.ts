import axios from 'axios';

export const nextServer = axios.create({
  // baseURL: '/api',
  baseURL: 'https://project-pregnant.vercel.app/api',
  withCredentials: true,
});
