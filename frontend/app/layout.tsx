import { Footer } from './footer';
import './globals.css';
import { Inter } from 'next/font/google';
import classNames from 'classnames';

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
          'flex min-h-screen w-full max-w-full flex-col'
        )}
      >
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
