import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';
import FormDataNode from 'form-data';

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const incomingFormData = await request.formData();
  const photo = incomingFormData.get('photo') as File | null;
  const body = {
    gender: incomingFormData.get('gender') as string,
    dueDate: incomingFormData.get('dueDate') as string,
  };

  if (!photo) {
    return NextResponse.json({ message: 'Фото не передано' }, { status: 400 });
  }

  const formData = new FormDataNode();
  formData.append('photo', Buffer.from(await photo.arrayBuffer()), {
    filename: photo.name,
  });

  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;

  try {
    await api.patch(`/users/updateUserPhoto/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...formData.getHeaders(),
      },
    });

    const { data } = await api.patch(`/users/updateUserData/${id}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    const err = error as AxiosError;

    if (err.response) {
      const responseData = err.response.data as {
        status: number;
        message: { context?: { message?: string } }[];
        data?: unknown;
      };

      const firstMessage = Array.isArray(responseData.message)
        ? responseData.message[0]?.context?.message
        : 'Щось пішло не так';

      return NextResponse.json(
        { message: firstMessage },
        { status: err.response.status }
      );
    }
    return NextResponse.json({ message: 'Щось пішло не так' }, { status: 500 });
  }
}
