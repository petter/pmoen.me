import Link from 'next/link';

interface TalkItemProps {
  href: string;
  title: string;
  conference: string;
  location: string;
  date: string;
}

export function TalkItem({
  href,
  title,
  conference,
  location,
  date,
}: TalkItemProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block py-8 transition-colors duration-200"
    >
      <span className="text-sm text-stone-500">{date}</span>
      <h2 className="mt-2 text-xl font-medium text-stone-200 transition-colors duration-200 group-hover:text-stone-50">
        {title}
      </h2>
      <p className="mt-1 text-stone-500">
        {conference} · {location}
      </p>
      <span className="mt-2 inline-block text-xs tracking-wide text-stone-500 uppercase">
        Watch ↗
      </span>
    </Link>
  );
}
