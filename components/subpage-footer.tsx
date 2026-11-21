import { SocialLinks } from './social-links';

export function SubpageFooter() {
  return (
    <footer className="relative z-10 mx-auto mt-8 w-full max-w-2xl px-6 pb-12 sm:mt-10 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-800/80 pt-7">
        <div className="flex items-baseline gap-2.5">
          <span className="inline-flex items-baseline gap-1.5">
            <span
              aria-hidden="true"
              className="font-sans text-sm text-stone-500"
            >
              —
            </span>
            <span className="font-serif text-lg leading-none text-stone-300">
              Petter
            </span>
          </span>
          <span aria-hidden="true" className="text-stone-600">
            ·
          </span>
          <span className="font-mono text-xs text-stone-400">
            Oslo → Toronto
          </span>
        </div>

        <SocialLinks className="-ml-3 sm:mr-[-0.75rem] sm:ml-0" />
      </div>
    </footer>
  );
}
