import Link from 'next/link';
import { AmbientBackdrop } from '@/components/ambient-backdrop';
import { RouteBadge } from '@/components/route-badge';
import { SocialLinks } from '@/components/social-links';
import { Heading } from '@/components/typography/heading';
import { CurrentlyWorkingOn } from './currently-working-on';

const NAV_ITEMS = [
  { href: '/blog', label: 'Blog' },
  { href: '/talks', label: 'Talks' },
  { href: '/products', label: 'Products' },
] as const;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-stone-950 text-stone-100">
      <AmbientBackdrop />

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-14 sm:px-8 md:py-20">
        <div>
          {/* Signature Pacifico Name + organic tapered calligraphic ink flourish */}
          <div className="enter-up">
            <Heading level={1} className="inline-block md:text-6xl">
              <span className="relative inline-block pb-3">
                Petter Sæther Moen
                <svg
                  aria-hidden="true"
                  viewBox="0 0 380 20"
                  className="ink-reveal pointer-events-none absolute -right-2 -bottom-0.5 left-0 w-[calc(100%+0.5rem)] text-amber-300/80"
                  fill="none"
                >
                  <path
                    d="M3 14.5C58 9.2 132 5.8 214 6.4C276 6.8 332 9.4 374 12.2C376.5 12.4 377.4 13.7 375.3 14.3C333 11.4 277 9.4 214 9.1C134 8.7 61 11.6 5.5 16.4C2.4 16.7 1.1 14.8 3 14.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </Heading>
          </div>

          {/* Role + playful Oslo -> Toronto flight micro-badge */}
          <div
            className="enter-up mt-4 flex flex-wrap items-center gap-x-4 gap-y-2.5"
            style={{ animationDelay: '70ms' }}
          >
            <p className="text-lg text-stone-300 md:text-xl">
              Software Engineer
            </p>
            <RouteBadge />
          </div>

          {/* Live GitHub activity */}
          <CurrentlyWorkingOn />

          {/* Bio — consistent contrast & non-breaking Toronto, Canada */}
          <div
            className="enter-up mt-8 max-w-[58ch] space-y-3.5 text-[15px] leading-relaxed text-stone-300 sm:text-base"
            style={{ animationDelay: '210ms' }}
          >
            <p>
              M.Sc. from University of Oslo. Based in{' '}
              <span className="text-stone-100">Toronto,&nbsp;Canada</span>.
            </p>
            <p>
              Passionate about product development, frontend technology, and AI.
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Primary"
            className="enter-up mt-10 border-t border-stone-800/80 pt-6"
            style={{ animationDelay: '280ms' }}
          >
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm tracking-wide uppercase sm:gap-x-9">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative inline-flex min-h-11 items-baseline py-2 text-stone-200 transition-colors duration-200 hover:text-stone-50"
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 w-full origin-left scale-x-0 border-b-2 border-amber-300/85 transition-transform duration-300 ease-out group-hover:scale-x-100 forced-colors:border-[CanvasText]"
                      />
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://cv.pmoen.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex min-h-11 items-baseline gap-1 py-2 text-stone-200 transition-colors duration-200 hover:text-stone-50"
                >
                  <span className="relative">
                    CV
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 w-full origin-left scale-x-0 border-b-2 border-amber-300/85 transition-transform duration-300 ease-out group-hover:scale-x-100 forced-colors:border-[CanvasText]"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs text-stone-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300"
                  >
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Clean borderless social icon row optically aligned to left edge */}
          <div className="enter-up mt-4" style={{ animationDelay: '350ms' }}>
            <SocialLinks className="-ml-3" iconClassName="h-[19px] w-[19px]" />
          </div>
        </div>
      </main>
    </div>
  );
}
