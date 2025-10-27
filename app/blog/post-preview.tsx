import Image from 'next/image';

import { Heading } from '../../components/typography/heading';
import { Link } from '../../components/typography/link';
import { formatDateTimeText } from '../../components/utils/date-formatting';
import type { Post } from './posts';

interface Props {
  post: Post;
}

export function PostPreview({ post }: Props) {
  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-md border-b-0 bg-fuchsia-200 shadow-lg shadow-black/20 hover:scale-105"
      href={post.url}
      target={post.isExternal ? '_blank' : undefined}
      rel={post.isExternal ? 'noopener noreferrer' : undefined}
      prefetch={post.isExternal ? false : undefined}
    >
      <div className="relative h-80 w-full overflow-hidden bg-white">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-fuchsia-100 via-white to-fuchsia-200 px-6 text-center text-fuchsia-800">
            <span className="text-sm font-semibold tracking-wide uppercase">
              {post.isExternal ? 'Ekstern artikkel' : 'Blogginnlegg'}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 pt-2">
        <time className="text-sm text-gray-600 uppercase">
          {formatDateTimeText(post.publishDate)}
        </time>
        <Heading
          level={2}
          className="text-fuchsia-950 duration-200 group-hover:text-fuchsia-500"
        >
          {post.title}
        </Heading>
        {post.isExternal ? (
          <p className="mt-1 text-sm font-semibold text-fuchsia-800 uppercase">
            External
          </p>
        ) : null}
        {/* <div className="text-fuchsia-950">{post.excerpt}</div> */}
      </div>
    </Link>
  );
}
