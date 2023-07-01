import { twMerge } from 'tailwind-merge';
import { SanityImage } from './sanity-image';
import { BlogPost } from '@/app/blog/blog-post-schema';

type CaptionedSanityImageProps = {
  image: BlogPost['mainImage'];
  imageClassName?: string;
};

export function CaptionedSanityImage({
  image,
  imageClassName,
}: CaptionedSanityImageProps) {
  return (
    <div className="overflow-hidden rounded-md">
      <div
        className={twMerge(
          'relative w-full overflow-hidden bg-white',
          imageClassName
        )}
      >
        <SanityImage image={image} className="w-full" />
      </div>
      <div className="bg-fuchsia-200 p-4">
        <p>{image.caption}</p>
      </div>
    </div>
  );
}
