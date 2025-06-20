import { Heading } from '@/components/typography/heading';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

interface TalkCardProps {
  href: string;
  image: StaticImageData;
  title: string;
  conference: string;
  tags: string[];
}

export function TalkCard({
  href,
  image,
  title,
  conference,
  tags,
}: TalkCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg bg-fuchsia-200 shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105"
    >
      <div className="relative">
        <Image src={image} alt={title} className="w-full" />
      </div>
      <div className="p-4">
        <Heading
          level={3}
          className="text-fuchsia-950 duration-200 group-hover:text-fuchsia-500"
        >
          {title}
        </Heading>
        <p className="mt-1 text-sm text-fuchsia-900">{conference}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-sky-800/20 bg-sky-300/50 px-2.5 py-0.5 text-xs font-medium text-sky-950"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
