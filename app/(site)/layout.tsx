import Link from 'next/link';
import { NavLink } from './nav-link';
import { GrainOverlay } from '@/components/grain-overlay';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-stone-950 text-stone-100">
      <GrainOverlay />

      {/* Header with navigation */}
      <header className="relative flex items-center justify-between px-8 py-8 md:px-16 lg:px-24">
        <Link
          href="/"
          className="text-sm tracking-wide text-stone-500 uppercase transition-colors duration-200 hover:text-stone-50"
        >
          ← Home
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex gap-6 text-sm tracking-wide uppercase">
            <li>
              <NavLink href="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink href="/talks">Talks</NavLink>
            </li>
            <li>
              <NavLink href="/products">Products</NavLink>
            </li>
            <li>
              <a
                href="https://cv.pmoen.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 transition-colors duration-200 hover:text-stone-50"
              >
                CV
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative flex-1 px-8 pb-16 md:px-16 lg:px-24">
        {children}
      </main>
    </div>
  );
}
