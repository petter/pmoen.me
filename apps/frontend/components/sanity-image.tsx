import Image from 'next/image';
import { SanityImageSource, getImageDimensions } from '@sanity/asset-utils';
import { imageUrlBuilder } from '../app/image-url-builder';
import { BlogPost } from '../app/blog/blog-post-schema';
import { ComponentProps } from 'react';

type SanityImageProps = {
  image: BlogPost['mainImage'];
} & Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL'
>;

export const SanityImage = ({ image, ...rest }: SanityImageProps) => {
  const alt = image.alt ?? 'An image without an alt, whoops';
  const src = image.src as SanityImageSource;
  const imageBuilder = imageUrlBuilder.image(src);
  return (
    <Image
      src={imageBuilder.url()}
      alt={alt}
      width={getImageDimensions(src).width}
      height={getImageDimensions(src).height}
      placeholder="blur"
      blurDataURL={imageBuilder.width(24).height(24).blur(10).url()}
      sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
      {...rest}
    />
  );
};
