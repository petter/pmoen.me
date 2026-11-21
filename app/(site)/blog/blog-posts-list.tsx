'use client';

import type { Post } from './posts';
import { PostPreview } from './post-preview';
import { useSearchParams } from 'next/navigation';

interface Props {
  posts: Array<Post>;
}

export function BlogPostsList({ posts }: Props) {
  const searchParams = useSearchParams();
  const englishOnly = searchParams.get('englishOnly') === 'true';
  const filteredPosts = englishOnly
    ? posts.filter((post) => post.language === 'english')
    : posts;

  return (
    <ul className="flex flex-col">
      {filteredPosts.map((post, index) => (
        <li
          key={post.slug}
          className={`enter-up ${index > 0 ? 'border-t border-stone-800/90' : ''}`}
          style={{ animationDelay: `${Math.min(index, 8) * 45 + 90}ms` }}
        >
          <PostPreview post={post} hideEnglishBadge={englishOnly} />
        </li>
      ))}
    </ul>
  );
}
