import { Heading } from '../../components/typography/heading';
import { PostPreview } from './post-preview';
import { getBlogPosts } from './posts';

export default async function BlogPage() {
  const data = await getBlogPosts();
  return (
    <div>
      <Heading level={1} className="mb-8">
        Blog
      </Heading>
      <ul className="flex flex-col gap-10">
        {data.map((post) => (
          <li key={post.slug}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
