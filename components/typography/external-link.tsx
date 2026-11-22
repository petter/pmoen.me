import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

/** Inline external link with an amber underline and a nudging ↗ arrow. */
export function ExternalLink({
  className,
  children,
  ...rest
}: Omit<ComponentProps<'a'>, 'target' | 'rel'>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        'group font-medium whitespace-nowrap text-stone-100 underline decoration-amber-300/50 underline-offset-4 transition-colors hover:text-stone-50 hover:decoration-amber-300',
        className,
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block text-xs text-stone-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300"
      >
        ↗
      </span>
    </a>
  );
}
