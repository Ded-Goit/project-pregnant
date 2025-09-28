import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api'; // Переконайтеся, що шлях до api коректний
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const body = await request.json(); // Отримуємо { isDone: boolean }
  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;
  const { taskId } = params; // ID завдання

  try {
    // 💡 Відправляємо запит на зовнішній бекенд
    const response = await api.patch(`/tasks/${taskId}/status`, body, {
      headers: { Authorization: ` Bearer ${accessToken}` },
    });

    const { data } = response;

    return NextResponse.json(data);
  } catch (error) {
    const err = error as AxiosError;

    if (err.response) {
      return NextResponse.json(err.response.data, {
        status: err.response.status,
      });
    }
    return NextResponse.json({ message: 'Щось пішло не так' }, { status: 500 });
  }
}
