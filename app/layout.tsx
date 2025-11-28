import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Pacifico, Geist } from 'next/font/google';
import classNames from 'classnames';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

export const metadata = {
  title: 'Petter Moen',
  description:
    'Software Engineer based in Toronto. Passionate about product development, frontend technology, and AI.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          geist.variable,
          pacifico.variable,
          'font-sans antialiased',
        )}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
