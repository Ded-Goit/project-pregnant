import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/Providers/AuthProvider';
import localFont from 'next/font/local';
import { Lato, Comfortaa } from 'next/font/google';

//  Google Fonts (Lato: 400, 700, 900)
const latoGoogle = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato-google',
  display: 'swap',
});

//  Google Fonts (Comfortaa: 700)
const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-comfortaa',
  display: 'swap',
});

//  Local Fonts (Lato 500, 600)
const latoLocal = localFont({
  src: [
    {
      path: '../fonts/latomedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/latosemibold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-lato-local',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pregnancy App',
  description: 'Щоденник вагітності',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      className={`${latoGoogle.variable} ${latoLocal.variable} ${comfortaa.variable}`}
    >
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
