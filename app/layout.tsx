import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Pacifico, Geist, Geist_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import classNames from 'classnames';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: {
    default: 'Petter Sæther Moen',
    template: '%s · Petter Sæther Moen',
  },
  description:
    'Software Engineer from Oslo, based in Toronto, Canada. Passionate about product development, frontend technology, and AI.',
};

export const viewport: Viewport = {
  themeColor: '#0c0a09',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="dark scroll-pt-24">
      <body
        className={classNames(
          geist.variable,
          geistMono.variable,
          pacifico.variable,
          'min-h-screen bg-stone-950 font-sans text-stone-100 antialiased selection:bg-amber-300/90 selection:text-stone-950',
        )}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
