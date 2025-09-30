import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';

type Props = {
  params: Promise<{ week: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { week } = await params;

  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;

  try {
    const { data } = await api.get(`weeks/${week}/mom`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

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
