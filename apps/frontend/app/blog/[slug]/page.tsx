import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import groq from 'groq';

import { sanityClient } from '@/app/client';
import { blogPostItemSchema } from '../blog-post-schema';
import { Heading } from '@/components/typography/heading';
import { SanityImage } from '@/components/sanity-image';
import { ComponentProps } from 'react';
import { Link } from '@/components/typography/link';

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
      <div className="overflow-hidden rounded-md">
        <div className="relative h-80 w-full overflow-hidden bg-white">
          <SanityImage
            image={data.mainImage}
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="bg-fuchsia-200 p-4">
          <p>{data.mainImage.caption}</p>
        </div>
      </div>
      <PortableText
        components={{
          block: {
            h1: ({ children }) => <Heading level={1}>{children}</Heading>,
            h2: ({ children }) => <Heading level={2}>{children}</Heading>,
            h3: ({ children }) => <Heading level={3}>{children}</Heading>,
            h4: ({ children }) => <Heading level={4}>{children}</Heading>,
            h5: ({ children }) => <Heading level={5}>{children}</Heading>,
            h6: ({ children }) => <Heading level={6}>{children}</Heading>,
          },
          marks: {
            link: ({ value, children }) => <Link {...value}>{children}</Link>,
          },
        }}
        value={data.content as ComponentProps<typeof PortableText>['value']}
      />
    </div>
  );
}
