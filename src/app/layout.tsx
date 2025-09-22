import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import localFont from 'next/font/local';
import { Lato, Comfortaa } from 'next/font/google';
import Preloader from '@/components/preloader/Preloader';

// Fonts...
const latoGoogle = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato-google',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-comfortaa',
  display: 'swap',
});

const latoLocal = localFont({
  src: [
    { path: '../fonts/latomedium.ttf', weight: '500', style: 'normal' },
    { path: '../fonts/latosemibold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-lato-local',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pregnancy App',
  description: 'Щоденник вагітності',
  icons: { icon: '/favicon.ico' },
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
        <Preloader />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
