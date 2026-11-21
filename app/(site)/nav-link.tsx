'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isExact = pathname === href;
  const isSectionActive = isExact || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isExact ? 'page' : undefined}
      className={`group relative inline-flex min-h-11 items-center justify-center transition-colors duration-200 hover:text-stone-50 ${
        isSectionActive ? 'text-stone-50' : 'text-stone-400'
      }`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`absolute right-0 bottom-1.5 left-0 origin-left border-b-2 border-amber-300/85 transition-transform duration-300 ease-out forced-colors:border-[CanvasText] ${
          isSectionActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
}
