import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const InlineCode = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'code'>
>(({ className, ...props }, ref) => {
  return (
    <code
      {...props}
      ref={ref}
      className={twMerge(
        'rounded-md border border-stone-800 bg-stone-900 px-1.5 py-0.5 font-mono text-sm text-amber-200',
        className,
      )}
    />
  );
});

InlineCode.displayName = 'InlineCode';
