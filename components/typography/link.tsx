import { ComponentProps } from 'react';
import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

export function Link({ className, ...rest }: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={twMerge(
        'border-b border-amber-300/60 text-stone-100 transition-colors duration-200 hover:border-amber-300 hover:text-amber-200',
        className,
      )}
      {...rest}
    />
  );
}
