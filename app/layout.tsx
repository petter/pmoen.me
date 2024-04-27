import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import classNames from 'classnames';
import { Navigation } from './_navigation/navigation';
import { Footer } from './_footer/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Petter Moen',
  description: "Petter Moen's blog.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          'flex min-h-screen w-full max-w-full flex-col bg-fuchsia-50',
        )}
      >
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
