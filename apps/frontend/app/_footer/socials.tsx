import { type IconType } from 'react-icons';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { z, TypeOf } from 'zod';

import { Heading } from '../../components/typography/heading';
import { Link } from '../../components/typography/link';
import { sanityClient } from '../client';
import { baseDocumentSchema } from '../../components/utils/schemas/base-schema';

export const socialMediaSchema = z.array(
  baseDocumentSchema('socialMedias').extend({
    socialMedia: z.enum(['github', 'linkedin', 'twitter']),
    handle: z.string(),
  })
);

type SocialMedia = TypeOf<typeof socialMediaSchema>[number];

async function getSocials() {
  const data = await sanityClient.fetch('*[_type == "socialMedias"]');
  return socialMediaSchema.parse(data);
}

function getSocialLink({
  socialMedia,
  handle,
}: Pick<SocialMedia, 'socialMedia' | 'handle'>): string {
  switch (socialMedia) {
    case 'github':
      return `https://github.com/${handle}`;
    case 'twitter':
      return `https://twitter.com/${handle}`;
    case 'linkedin':
      return `https://linkedin.com/in/${handle}`;
  }
}

const soMeLogo: Record<SocialMedia['socialMedia'], IconType> = {
  github: FaGithub,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
};

export async function Socials() {
  const socials = await getSocials();

  return (
    <div className="p-4">
      <Heading level={3} className="mb-4">
        Socials
      </Heading>
      <ul className="flex flex-col gap-2 pl-2">
        {socials.map(({ _id, socialMedia, handle }) => {
          const Logo = soMeLogo[socialMedia];
          return (
            <li key={_id} className="flex w-max flex-row items-center gap-2">
              <Logo size="1.5em" />
              <Link href={getSocialLink({ handle, socialMedia })}>
                @{handle}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
