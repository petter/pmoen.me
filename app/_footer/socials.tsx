import type { IconType } from 'react-icons';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBluesky,
  FaXTwitter,
} from 'react-icons/fa6';

import { Heading } from '../../components/typography/heading';
import { Link } from '../../components/typography/link';

interface SocialMedia {
  socialMedia: 'github' | 'x' | 'linkedin' | 'email' | 'bluesky';
  handle: string;
}
function getSocials() {
  return [
    {
      handle: 'petter',
      socialMedia: 'github',
    },
    {
      handle: 'pettersmoen',
      socialMedia: 'x',
    },
    {
      handle: 'pmoen.me',
      socialMedia: 'bluesky',
    },
    {
      handle: 'pettersmoen',
      socialMedia: 'linkedin',
    },
    {
      handle: 'pettersmoen@gmail.com',
      socialMedia: 'email',
    },
  ] satisfies Array<SocialMedia>;
}

function getSocialLink({ socialMedia, handle }: SocialMedia): string {
  switch (socialMedia) {
    case 'github':
      return `https://github.com/${handle}`;
    case 'x':
      return `https://x.com/${handle}`;
    case 'linkedin':
      return `https://linkedin.com/in/${handle}`;
    case 'bluesky':
      return `https://bsky.app/profile/${handle}`;
    case 'email':
      return `mailto:${handle}`;
  }
}

const soMeLogo: Record<SocialMedia['socialMedia'], IconType> = {
  github: FaGithub,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  bluesky: FaBluesky,
};

export async function Socials() {
  const socials = await getSocials();

  const sorting: SocialMedia['socialMedia'][] = [
    'github',
    'bluesky',
    'x',
    'linkedin',
    'email',
  ];
  const socialsSorted = [...socials].sort(
    (a, b) => sorting.indexOf(a.socialMedia) - sorting.indexOf(b.socialMedia),
  );

  return (
    <div className="p-4">
      <Heading level={3} className="mb-4">
        Socials
      </Heading>
      <ul className="flex flex-col gap-2 pl-2">
        {socialsSorted.map(({ socialMedia, handle }) => {
          const Logo = soMeLogo[socialMedia];
          return (
            <li
              key={socialMedia}
              className="flex w-max flex-row items-center gap-2"
            >
              <Logo size="1.5em" />
              <Link href={getSocialLink({ handle, socialMedia })}>
                {socialMedia !== 'email' && '@'}
                {handle}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
