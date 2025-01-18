import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ListProps = { type: 'ordered' | 'unordered' } & ComponentPropsWithoutRef<
  'ol' | 'ul'
>;
export const List = forwardRef<HTMLOListElement, ListProps>(
  ({ type, className, ...props }, ref) => {
    const Component = type === 'ordered' ? 'ol' : 'ul';
    const listStyle = type === 'ordered' ? 'list-decimal' : 'list-disc';
    return (
      <Component
        className={twMerge('pl-5', listStyle, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

List.displayName = 'List';
