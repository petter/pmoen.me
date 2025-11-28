import { PostPreview } from './post-preview';
import { getBlogPosts } from './posts';

export default async function BlogPage() {
  const data = await getBlogPosts();
  return (
    <div>
      <h1 className="font-serif text-4xl font-light tracking-tight text-stone-50 sm:text-5xl">
        Blog
      </h1>
      <ul className="mt-12 flex flex-col">
        {data.map((post, index) => (
          <li
            key={post.slug}
            className={index > 0 ? 'border-t border-stone-800' : ''}
          >
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
