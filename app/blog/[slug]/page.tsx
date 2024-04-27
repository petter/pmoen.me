import { notFound } from 'next/navigation';
import { isAfter } from 'date-fns';

import { Heading } from '@/components/typography/heading';
import { formatDateTimeText } from '@/components/utils/date-formatting';
import { Captioned } from '@/components/captioned-image';

async function getBlogPost(slug: string) {
//todo
return undefined
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
      {/* <Heading level={1}>{data.title}</Heading> */}
      {/* <StyledPortableText
        value={data.excerpt as ComponentProps<typeof PortableText>['value']}
      /> */}
      <div>
        {/* <Captioned caption={data.caption}>
          <img src={data.mainImage} alt={data.mainImageAlt} />
        </Captioned> */}
        <div className="mt-2 text-sm uppercase text-gray-600">
          {/* <p>
            Published: <time>{formatDateTimeText(data.publishedAt)}</time>
          </p>
          {isAfter(data._updatedAt, data.publishedAt) && (
            <p>
              Edited: <time>{formatDateTimeText(data._updatedAt)}</time>
            </p>
          )} */}
        </div>
      </div>
      {/* <StyledPortableText
        value={data.content as ComponentProps<typeof PortableText>['value']}
      /> */}
    </div>
  );
}
