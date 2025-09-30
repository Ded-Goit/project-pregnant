import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import localFont from 'next/font/local';
import { Lato, Comfortaa } from 'next/font/google';
import LayoutClient from '@/components/LayoutClient';
import Preloader from '@/components/Preloader/Preloader';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

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
  title: {
    default: 'Pregnancy App — Щоденник вагітності',
    template: '%s | Pregnancy App',
  },
  description:
    'Pregnancy App — це зручний щоденник вагітності. Ведіть нотатки, відстежуйте розвиток малюка та отримуйте корисні поради кожного дня.',
  keywords: [
    'вагітність',
    'щоденник вагітності',
    'поради для майбутніх мам',
    'трекер вагітності',
    'календар вагітності',
    'Pregnancy App',
  ],
  authors: [{ name: 'CoreStack Ukraine' }],
  creator: 'CoreStack Ukraine',
  publisher: 'Creativ Studio DED Production',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://project-pregnant.vercel.app',
    siteName: 'Pregnancy App',
    title: 'Щоденник вагітності',
    description:
      'Ведіть особистий щоденник вагітності, дізнавайтеся про розвиток дитини та отримуйте поради для здоров`я мами.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Щоденник вагітності',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Щоденник вагітності',
    description:
      'Зручний щоденник для майбутніх мам: завдання, нотатки, поради та календар вагітності.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://project-pregnant.vercel.app'),
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
        <AuthProvider>
          <ThemeProvider>
            <LayoutClient>{children}</LayoutClient>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
