'use cache';

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Heading } from '@/components/typography/heading';
import { BlogPostsList } from './blog-posts-list';
import { LanguageFilter } from './language-filter';
import { getBlogPosts } from './posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on frontend technology, React, CSS, Next.js, and side projects.',
};

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  const englishCount = allPosts.filter(
    (post) => post.language === 'english',
  ).length;

  return (
    <div>
      <header className="enter-up">
        <Heading level={1}>Blog</Heading>
        <p className="mt-4 max-w-[56ch] text-base text-stone-400">
          Notes and articles on frontend engineering, web standards, and side
          projects.
        </p>
      </header>

      <div className="mt-8">
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="h-11 w-56 rounded bg-stone-900 motion-safe:animate-pulse"
            />
          }
        >
          <LanguageFilter
            totalCount={allPosts.length}
            englishCount={englishCount}
          />
        </Suspense>

        <div className="mt-1">
          <Suspense
            fallback={
              <div className="py-8 text-stone-400">Loading posts...</div>
            }
          >
            <BlogPostsList posts={allPosts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
