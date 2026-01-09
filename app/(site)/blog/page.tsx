'use cache';

import { Suspense } from 'react';
import { Heading } from '@/components/typography/heading';
import { BlogPostsList } from './blog-posts-list';
import { LanguageFilter } from './language-filter';
import { getBlogPosts } from './posts';

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  return (
    <div>
      <Heading level={1}>Blog</Heading>
      <div className="mt-12">
        <Suspense
          fallback={
            <div className="h-6 w-48 animate-pulse rounded bg-stone-800" />
          }
        >
          <LanguageFilter />
        </Suspense>
        <Suspense
          fallback={<div className="text-stone-400">Loading posts...</div>}
        >
          <BlogPostsList posts={allPosts} />
        </Suspense>
      </div>
    </div>
  );
}
