'use cache';

import { Suspense } from 'react';
import { BlogPostsList } from './blog-posts-list';
import { LanguageFilter } from './language-filter';
import { getBlogPosts } from './posts';

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  return (
    <div>
      <h1 className="font-serif text-4xl font-light tracking-tight text-stone-50 sm:text-5xl">
        Blog
      </h1>
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
