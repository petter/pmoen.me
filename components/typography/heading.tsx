import type { JSX, PropsWithChildren } from 'react';
import classNames from 'classnames';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingProps = PropsWithChildren<{
  level: HeadingLevel;
  className?: string;
}>;

const headingStyles: Record<HeadingLevel, string> = {
  1: 'text-4xl sm:text-5xl font-serif font-light mb-6 text-stone-50',
  2: 'text-3xl sm:text-4xl font-serif font-light mb-6 text-stone-50',
  3: 'text-2xl font-medium tracking-tight',
  4: 'text-xl',
  5: 'text-lg font-light',
  6: 'text-base font-thin',
};

export function Heading({ level, children, className }: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Component className={classNames(headingStyles[level], className)}>
      {children}
    </Component>
  );
}
