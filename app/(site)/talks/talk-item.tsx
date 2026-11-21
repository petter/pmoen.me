import { Play } from 'lucide-react';

interface TalkItemProps {
  href: string;
  title: string;
  conference: string;
  location: string;
  date: string;
  summary?: string;
}

export function TalkItem({
  href,
  title,
  conference,
  location,
  date,
  summary,
}: TalkItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block py-6 transition-colors duration-200"
    >
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-mono text-xs text-stone-400">
        <span>{date}</span>
        <span aria-hidden="true" className="text-stone-600">
          ·
        </span>
        <span className="text-stone-300">
          {conference}, {location}
        </span>
      </div>

      <h2 className="mt-2.5 text-2xl font-medium tracking-tight text-balance text-stone-100 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-stone-50">
        {title}
      </h2>

      {summary && (
        <p className="mt-3 max-w-[56ch] leading-relaxed text-stone-300">
          {summary}
        </p>
      )}

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-stone-200 transition-colors duration-200 group-hover:text-amber-300">
        <Play
          aria-hidden="true"
          className="h-3.5 w-3.5 fill-current text-amber-300 transition-transform duration-200 group-hover:scale-110"
        />
        <span>Watch recording</span>
        <span
          aria-hidden="true"
          className="inline-block text-xs text-stone-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300"
        >
          ↗
        </span>
      </span>
    </a>
  );
}
