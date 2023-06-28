import { SanityImage } from '../../components/sanity-image';
import { Heading } from '../../components/typography/heading';
import { Link } from '../../components/typography/link';
import { formatDate } from '../../components/utils/date-formatting';
import { BlogPost } from './blog-post-schema';

type PostPreviewProps = {
  post: BlogPost;
};

export function PostPreview({ post }: PostPreviewProps) {
  return (
    <Link
      className="flex flex-col rounded-sm border-b-0 bg-fuchsia-200 p-4 hover:scale-105"
      href={`/blog/${post.slug.current}`}
    >
      <div className="relative h-80 w-full overflow-hidden rounded-md bg-white">
        <SanityImage
          image={post.mainImage}
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center"
        />
      </div>
      <Heading level={2}>{post.title}</Heading>
      <p>{formatDate(post._createdAt)}</p>
    </Link>
  );
}
