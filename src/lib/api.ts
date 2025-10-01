import axios from 'axios';

export const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'https://project-pregnant.vercel.app/api',
  withCredentials: true,
});
