import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

type LinkProps = PropsWithChildren<{
  href: string;
}>;
export function Link({ href, children }: LinkProps) {
  return (
    <NextLink
      href={href}
      className="border-b-2 border-current duration-200 hover:text-fuchsia-500"
    >
      {children}
    </NextLink>
  );
}
