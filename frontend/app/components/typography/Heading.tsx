import { PropsWithChildren } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingProps = PropsWithChildren<{
  level: HeadingLevel;
}>;

const headingStyles: Record<HeadingLevel, string> = {
  1: 'text-6xl font-extrabold',
  2: 'text-4xl font-bold',
  3: 'text-2xl font-medium',
  4: 'text-xl',
  5: 'text-lg font-light',
  6: 'text-base font-thin',
};

export function Heading({ level, children }: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  return <Component className={headingStyles[level]}>{children}</Component>;
}
