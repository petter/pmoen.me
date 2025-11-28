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
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-lg bg-stone-900 transition-all duration-200 hover:bg-stone-800"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-stone-200 transition-colors duration-200 group-hover:text-stone-50">
          {title}
        </h3>
        <p className="mt-1 text-sm text-stone-500">{conference}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-700 px-2.5 py-0.5 text-xs text-stone-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
