import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { AxiosError } from 'axios';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await api.post('/auth/register', body);

    const cookieData = await cookies();
    const setCookie = response.headers['set-cookie'];

    if (setCookie) {
      const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const newCookieString of cookiesArray) {
        const parsedCookie = parse(newCookieString);

        const options = {
          path: parsedCookie.Path,
          maxAge: Number(parsedCookie['Max-Age']),
          expires: parsedCookie.Expires
            ? new Date(parsedCookie.Expires)
            : undefined,
          httpOnly: true,
          secure: true,
        };

        if (parsedCookie.accessToken) {
          cookieData.set('accessToken', parsedCookie.accessToken, options);
        }
        if (parsedCookie.refreshToken) {
          cookieData.set('refreshToken', parsedCookie.refreshToken, options);
        }
      }
    }

    const { data, status } = response;

    return NextResponse.json(data, { status });
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
