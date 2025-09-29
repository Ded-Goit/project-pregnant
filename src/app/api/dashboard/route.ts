import { nextServer } from '@/lib/api';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await nextServer.get('/weeks/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return NextResponse.json(
      { message: err.response?.data?.message || 'Internal Server Error' },
      { status: err.response?.status || 500 }
    );
  }
}
