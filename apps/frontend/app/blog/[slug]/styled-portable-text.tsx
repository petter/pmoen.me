import { CaptionedSanityImage } from '@/components/captioned-sanity-image';
import { List } from '@/components/list';
import { Heading } from '@/components/typography/heading';
import { Link } from '@/components/typography/link';
import { PortableText } from '@portabletext/react';
import { ComponentProps } from 'react';

type StyledPortableTextProps = Omit<
  ComponentProps<typeof PortableText>,
  'components'
>;

export function StyledPortableText(props: StyledPortableTextProps) {
  return (
    <PortableText
      {...props}
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
        types: {
          captionedImage: ({ value }) => <CaptionedSanityImage image={value} />,
        },
        list: {
          bullet: ({ children }) => <List type="unordered">{children}</List>,
          number: ({ children }) => <List type="ordered">{children}</List>,
        },
      }}
    />
  );
}
