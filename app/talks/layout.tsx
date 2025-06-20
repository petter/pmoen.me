import type { PropsWithChildren } from 'react';

type CenteredLayoutProps = PropsWithChildren<never>;

export default function CenteredLayout({ children }: CenteredLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-8">
      {children}
    </div>
  );
}
