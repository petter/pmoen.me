import type { MDXComponents } from 'mdx/types';
import { Heading } from './components/typography/heading';
import { InlineCode } from './components/typography/inline-code';
import { Link } from './components/typography/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Heading level={1} {...props} />,
    h2: (props) => <Heading level={2} {...props} />,
    h3: (props) => <Heading level={3} {...props} />,
    h4: (props) => <Heading level={4} {...props} />,
    h5: (props) => <Heading level={5} {...props} />,
    h6: (props) => <Heading level={6} {...props} />,
    code: (props) => <InlineCode {...props} />,
    a: (props) => <Link href={props.href ?? ''} {...props} />,
    ...components,
  };
}
