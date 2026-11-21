import Link from 'next/link';
import { AmbientBackdrop } from '@/components/ambient-backdrop';
import { SubpageFooter } from '@/components/subpage-footer';
import { NavLink } from './nav-link';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-stone-950 text-stone-100">
      <AmbientBackdrop />

      {/* Translucent sticky header letting the warm top glow run seamlessly behind it */}
      <header className="sticky top-0 z-30 border-b border-stone-800/45 bg-stone-950/55 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 px-6 py-3 sm:px-8 sm:py-3.5">
          <Link
            href="/"
            className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[11px] tracking-wide text-stone-400 uppercase transition-colors duration-200 hover:text-stone-50 sm:text-sm"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-x-1"
            >
              ←
            </span>
            <span>Home</span>
          </Link>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-3 text-[11px] tracking-normal uppercase sm:gap-7 sm:text-sm sm:tracking-wide">
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
                  className="group inline-flex min-h-11 items-center gap-0.5 text-stone-400 transition-colors duration-200 hover:text-stone-50"
                >
                  <span>CV</span>
                  <span
                    aria-hidden="true"
                    className="text-[11px] text-stone-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300"
                  >
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content — naturally flows into footer without hollow gaps on short pages */}
      <main className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-12 pb-6 sm:px-8 sm:pt-16">
        {children}
      </main>

      <SubpageFooter />
    </div>
  );
}
