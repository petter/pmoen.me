import { ReactNode } from 'react';
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
      href={`/blog/${post.slug}`}
    >
      <div className="relative h-80 w-full bg-white">
        {/* <img
        src={post.mainImageSrc}
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center"
        /> */}
      </div>

      <div className="p-4 pt-2">
        <time className="text-sm uppercase text-gray-600">
          {formatDateTimeText(post.publishDate)}
        </time>
        <Heading
          level={2}
          className="text-fuchsia-950 duration-200 group-hover:text-fuchsia-500"
        >
          {post.title}
        </Heading>
        {/* <div className="text-fuchsia-950">{post.excerpt}</div> */}
      </div>
    </Link>
  );
}
