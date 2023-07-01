import groq from 'groq';

import { Heading } from '../../components/typography/heading';
import { sanityClient } from '../client';
import { blogPostsSchema } from './blog-post-schema';
import { PostPreview } from './post-preview';

async function getBlogPosts() {
  const data = await sanityClient.fetch(
    groq`*[_type == "post" && dateTime(publishedAt) < dateTime(now())] | order(publishedAt desc)`
  );
  return blogPostsSchema.parse(data);
}

export default async function BlogPage() {
  const data = await getBlogPosts();
  return (
    <div>
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
