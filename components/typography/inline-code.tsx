import { ComponentProps, ComponentPropsWithoutRef, forwardRef } from 'react';
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
        'rounded-md bg-fuchsia-200 px-2 py-1 text-fuchsia-900',
        className
      )}
    />
  );
});

InlineCode.displayName = 'InlineCode';
