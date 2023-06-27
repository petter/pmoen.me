import NextLink from 'next/link';
import { Link } from '../../components/typography/Link';

export function Navigation() {
  return (
    <nav className="flex w-full flex-row items-center justify-between bg-stone-950 px-8 py-4 text-stone-100 duration-200 ">
      <NextLink
        href="/"
        className="text-2xl font-medium lowercase tracking-tighter hover:text-fuchsia-500"
      >
        Moen.
      </NextLink>

      <div className="flex flex-row gap-4">
        <Link href="/blog">Blog</Link>
      </div>
    </nav>
  );
}
