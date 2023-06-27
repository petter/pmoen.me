import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="flex w-full flex-row items-center justify-between bg-stone-950 px-8 py-4 text-stone-100 duration-200 hover:text-fuchsia-500">
      <Link
        href="/"
        className="text-2xl font-medium lowercase tracking-tighter"
      >
        Moen.
      </Link>
    </nav>
  );
}
