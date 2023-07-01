import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import groq from 'groq';

import { sanityClient } from '@/app/client';
import { blogPostItemSchema } from '../blog-post-schema';
import { Heading } from '@/components/typography/heading';
import { SanityImage } from '@/components/sanity-image';
import { ComponentProps } from 'react';
import { Link } from '@/components/typography/link';
import { StyledPortableText } from './styled-portable-text';
import { CaptionedSanityImage } from '@/components/captioned-sanity-image';

async function getBlogPost(slug: string) {
  const blogPostItemQuery = groq`*[
        _type == "post"
        && dateTime(publishedAt) < dateTime(now())
        && slug.current == "${slug}"
    ][0]`;
  const data = await sanityClient.fetch(blogPostItemQuery);

  if (data === null) {
    return undefined;
  }

  return blogPostItemSchema.parse(data);
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getBlogPost(params.slug);
  if (data === undefined) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      <Heading level={1}>{data.title}</Heading>
      <CaptionedSanityImage image={data.mainImage} />
      <StyledPortableText
        value={data.content as ComponentProps<typeof PortableText>['value']}
      />
    </div>
  );
}
