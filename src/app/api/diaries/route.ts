import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;

  try {
    const response = await api.post('/diaries', body, {
      headers: { Authorization: ` Bearer ${accessToken}` },
    });
    const { data } = response;
    return NextResponse.json(
      {
        data,
      },
      { status: data.status }
    );
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

export async function GET() {
  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;

  try {
    const response = await api.get('/diaries', {
      headers: { Authorization: ` Bearer ${accessToken}` },
    });
    const { data } = response;
    return NextResponse.json(
      {
        data,
      },
      { status: data.status }
    );
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
