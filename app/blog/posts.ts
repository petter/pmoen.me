import { readdir } from 'fs/promises';

export interface Post {
  slug: string;
  publishDate: Date;
}

export async function getBlogPosts(): Promise<Array<Post>> {
  // Retrieve slugs from post routes
  const slugs = (await readdir('./app/blog', { withFileTypes: true })).filter(
    (dirent) => dirent.isDirectory(),
  );

  // Retrieve metadata from MDX files
  const posts = (
    await Promise.all(
      slugs.map(async ({ name }) => {
        const { metadata } = await import(`./${name}/page.mdx`);
        return { slug: name, ...metadata };
      }),
    )
  ).filter(({ publishDate }) => !!publishDate);

  // Sort posts from newest to oldest
  posts.sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));

  return posts;
}
