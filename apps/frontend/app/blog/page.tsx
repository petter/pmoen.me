import { Heading } from '../../components/typography/heading';
import { sanityClient } from '../client';
import { blogPostSchema } from './blog-post-schema';
import { PostPreview } from './post-preview';

async function getBlogPosts() {
  const data = await sanityClient.fetch(
    '*[_type == "post" && dateTime(publishedAt) < dateTime(now())] | order(publishedAt desc)'
  );
  return blogPostSchema.parse(data);
}

export default async function BlogPage() {
  const data = await getBlogPosts();
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <Heading level={1} className="mb-8">
        Blog
      </Heading>
      <ul className="flex flex-col gap-10">
        {data.map((post) => (
          <li key={post._id}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
