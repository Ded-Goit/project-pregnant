import { NextResponse } from 'next/server';
import { api } from '../api';
import { AxiosError } from 'axios';

export async function GET() {
  // const cookieData = await cookies();
  // const accessToken = cookieData.get('accessToken')?.value;

  try {
    const response = await api.get('/weeks/public/dashboard'); /*, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }*/

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

// import { nextServer } from '@/lib/api';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   try {
//     // Forward cookies from the client to the backend
//     const cookie = request.headers.get('cookie');
//     const headers: Record<string, string> = {};
//     if (cookie) {
//       headers['Cookie'] = cookie;
//     }

//     const response = await nextServer.get('/weeks/public/dashboard', {
//       headers,
//     });
//     return NextResponse.json(response.data, { status: response.status });
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: error.response?.data?.message || 'Internal Server Error' },
//       { status: error.response?.status || 500 }
//     );
//   }
// }
