import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

interface Props {
  caption: ReactNode
  children: ReactNode
};

export function Captioned({
  caption,
children
}: Props) {
  return (
    <div className="overflow-hidden rounded-md">
      <div
        className={twMerge(
          'relative w-full overflow-hidden bg-white',
        )}
      >
      {children}
      </div>
      <div className="bg-fuchsia-200 p-4 text-fuchsia-900">
        {caption}
      </div>
    </div>
  );
}
