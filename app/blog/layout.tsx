import type { PropsWithChildren } from 'react';

type CenteredLayoutProps = PropsWithChildren<never>;

export default function CenteredLayout({ children }: CenteredLayoutProps) {
  return <div className="mx-auto w-full max-w-4xl px-4 py-8">{children}</div>;
}
