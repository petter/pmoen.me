'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`transition-colors duration-200 hover:text-stone-50 ${
        isActive ? 'text-stone-50' : 'text-stone-500'
      }`}
    >
      {children}
    </Link>
  );
}
