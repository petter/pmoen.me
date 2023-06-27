import { ComponentProps } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';

export function Link({ className, ...rest }: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={classNames(
        'border-b-2 border-current duration-200 hover:text-fuchsia-500',
        className
      )}
      {...rest}
    />
  );
}
