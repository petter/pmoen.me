import { type IconType } from 'react-icons';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

import { Heading } from '../../components/typography/heading';
import { Link } from '../../components/typography/link';

interface SocialMedia {
  socialMedia: 'github' | 'twitter' | 'linkedin' | 'email';
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
      socialMedia: 'twitter',
    },
    {
      handle: 'pettersmoen',
      socialMedia: 'linkedin',
    },
    {
      handle: 'pettersmoen@gmail.com',
      socialMedia: 'email',
    },
  ] as Array<SocialMedia>;
}

function getSocialLink({ socialMedia, handle }: SocialMedia): string {
  switch (socialMedia) {
    case 'github':
      return `https://github.com/${handle}`;
    case 'twitter':
      return `https://twitter.com/${handle}`;
    case 'linkedin':
      return `https://linkedin.com/in/${handle}`;
    case 'email':
      return `mailto:${handle}`;
  }
}

const soMeLogo: Record<SocialMedia['socialMedia'], IconType> = {
  github: FaGithub,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  email: FaEnvelope,
};

export async function Socials() {
  const socials = await getSocials();

  const sorting: SocialMedia['socialMedia'][] = [
    'github',
    'twitter',
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
