import { NextResponse } from 'next/server';
import { api } from '../api';
import { AxiosError } from 'axios';

export async function GET() {
  try {
    const response = await api.get('/emotions');
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
