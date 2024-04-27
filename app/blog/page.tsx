import { Heading } from '../../components/typography/heading';
import { PostPreview } from './post-preview';

async function getBlogPosts() {
  // TODO
  return undefined
}

export default async function BlogPage() {
  const data = await getBlogPosts();
  return (
    <div>
      <Heading level={1} className="mb-8">
        Blog
      </Heading>
      <ul className="flex flex-col gap-10">
        {/* {data.map((post) => (
          <li key={post._id}>
            <PostPreview post={post} />
          </li>
        ))} */}
      </ul>
    </div>
  );
}
