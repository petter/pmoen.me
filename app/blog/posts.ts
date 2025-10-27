import { readdir } from 'node:fs/promises';
import { externalPosts } from './external-posts';

interface RawMetadata {
  publishDate?: string | Date;
  title: string;
  image: string;
}

export interface Post {
  title: string;
  slug: string;
  publishDate: Date;
  url: string;
  isExternal: boolean;
  imageUrl: string;
}

function parsePublishDate(value?: string | Date): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

const parsedExternalPosts: Array<Post> = externalPosts
  .map((post) => {
    const publishDate = parsePublishDate(post.publishDate);
    if (!publishDate) {
      return null;
    }

    return {
      ...post,
      publishDate,
      isExternal: true as boolean,
    } satisfies Post;
  })
  .filter((post): post is Post => post !== null);

export async function getBlogPosts(): Promise<Array<Post>> {
  'use cache';

  // Retrieve slugs from post routes
  const slugs = (await readdir('./app/blog', { withFileTypes: true })).filter(
    (dirent) => dirent.isDirectory(),
  );

  // Retrieve metadata from MDX files
  const localPosts = (
    await Promise.all(
      slugs.map(async ({ name }) => {
        const postModule = (await import(`./${name}/page.mdx`)) as {
          metadata?: RawMetadata;
        };
        const metadata = postModule.metadata;
        if (!metadata) {
          return null;
        }

        const publishDate = parsePublishDate(metadata.publishDate);
        if (!publishDate) {
          return null;
        }

        return {
          title: metadata.title,
          slug: name,
          publishDate,
          url: `/blog/${name}`,
          isExternal: false as boolean,
          imageUrl: metadata.image,
        } satisfies Post;
      }),
    )
  ).filter((post): post is Post => post !== null);

  const posts: Array<Post> = [...localPosts, ...parsedExternalPosts];

  // Sort posts from newest to oldest
  posts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());

  return posts;
}
