import Link from 'next/link';
import { formatDateTimeText } from '@/components/utils/date-formatting';
import type { Post } from './posts';

interface Props {
  post: Post;
}

export function PostPreview({ post }: Props) {
  const Component = post.isExternal ? 'a' : Link;
  const linkProps = post.isExternal
    ? { href: post.url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: post.url };

  return (
    <Component
      {...linkProps}
      className="group block py-8 transition-colors duration-200"
    >
      <time className="text-sm text-stone-500">
        {formatDateTimeText(post.publishDate)}
      </time>
      <h2 className="mt-2 text-xl font-medium text-stone-200 transition-colors duration-200 group-hover:text-stone-50">
        {post.title}
      </h2>
      {post.isExternal && (
        <span className="mt-2 inline-block text-xs tracking-wide text-stone-500 uppercase">
          External ↗
        </span>
      )}
    </Component>
  );
}
