import Image from 'next/image';
import { SanityImageSource, getImageDimensions } from '@sanity/asset-utils';
import { imageUrlBuilder } from '../app/image-url-builder';
import { BlogPost } from '../app/blog/blog-post-schema';
import { ComponentProps } from 'react';

type SanityImageProps = {
  image: BlogPost['mainImage'];
  height?: number | ((imageHeight: number) => number);
  width?: number | ((imageWidth: number) => number);
} & Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'placeholder' | 'blurDataURL' | 'width' | 'height'
>;

export const SanityImage = ({
  image,
  height,
  width,
  ...rest
}: SanityImageProps) => {
  const alt = image.alt ?? 'An image without an alt, whoops';
  const src = image.src as SanityImageSource;
  const imageBuilder = imageUrlBuilder.image(src);

  const imageDimensions = getImageDimensions(src);
  const imageHeight = imageDimensions.height;
  const imageWidth = imageDimensions.height;
  const heightValue =
    typeof height === 'number' || height === undefined
      ? height ?? imageHeight
      : height(imageHeight);
  const widthValue =
    typeof width === 'number' || width === undefined
      ? width ?? imageWidth
      : width(imageWidth);

  return (
    <Image
      src={imageBuilder.url()}
      alt={alt}
      width={widthValue}
      height={heightValue}
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
