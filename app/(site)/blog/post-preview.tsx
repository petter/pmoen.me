import Link from 'next/link';
import { formatPublishDate } from '@/components/utils/date-formatting';
import type { Post } from './posts';

interface Props {
  post: Post;
  hideEnglishBadge?: boolean;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'external';
  }
}

export function PostPreview({ post, hideEnglishBadge = false }: Props) {
  const Component = post.isExternal ? 'a' : Link;
  const linkProps = post.isExternal
    ? { href: post.url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: post.url };
  const host = post.isExternal ? getHostname(post.url) : null;

  return (
    <Component
      {...linkProps}
      className="group block py-6 transition-colors duration-200"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
        <time
          dateTime={post.publishDate.toISOString()}
          className="text-stone-400 tabular-nums"
        >
          {formatPublishDate(post.publishDate)}
        </time>

        {host && (
          <>
            <span aria-hidden="true" className="text-stone-600">
              ·
            </span>
            <span className="text-stone-400 transition-colors duration-200 group-hover:text-stone-200">
              {host}
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300"
              >
                ↗
              </span>
            </span>
          </>
        )}

        {post.language === 'english' && !hideEnglishBadge && (
          <span className="rounded border border-amber-300/35 bg-amber-300/10 px-1.5 py-[1px] text-[10px] leading-none font-medium tracking-wider text-amber-200 uppercase">
            EN
          </span>
        )}
      </div>

      <h2
        lang={post.language === 'norwegian' ? 'nb' : undefined}
        className="mt-2 max-w-[60ch] text-lg leading-snug font-medium text-stone-200 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-stone-50 sm:text-xl"
      >
        {post.title}
      </h2>
    </Component>
  );
}
