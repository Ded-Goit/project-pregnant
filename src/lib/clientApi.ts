import axios from 'axios';
import type { DiaryEntry } from '../types/note';
import { Task } from '@/types/note';

axios.defaults.baseURL = 'https://project-pregnant-back.onrender.com';

export async function getDashboardData(isAuthenticated: boolean) {
  const response = await axios.get(
    isAuthenticated ? '/api/weeks/dashboard' : '/api/weeks/public/dashboard'
  );
  return response.data;
}

export async function saveDiaryEntry(
  id: string | undefined,
  data: Omit<DiaryEntry, 'id' | 'createdAt'>
): Promise<DiaryEntry> {
  if (id) {
    const response = await axios.put(`/api/diary/${id}`, data);
    return response.data;
  } else {
    const response = await axios.post('/api/diary', data);
    return response.data;
  }
}

export async function saveTask(
  id: string | undefined,
  data: Omit<Task, 'id'>
): Promise<Task> {
  if (id) {
    const response = await axios.put(`/api/tasks/${id}`, data);
    return response.data;
  } else {
    const response = await axios.post('/api/tasks', data);
    return response.data;
  }
}
