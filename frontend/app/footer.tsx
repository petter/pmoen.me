import { sanityClient } from './client';
import { Heading } from './components/typography/Heading';
import { Link } from './components/typography/Link';

type SocialMediaTypes = 'github' | 'twitter' | 'linkedin';
type SocialMedia = {
  _id: string;
  socialMedia: SocialMediaTypes;
  handle: string;
};
async function getSocials(): Promise<SocialMedia[]> {
  return await sanityClient.fetch('*[_type == "socialMedias"]');
}

function getSocialLink({
  socialMedia,
  handle,
}: Omit<SocialMedia, '_id'>): string {
  switch (socialMedia) {
    case 'github':
      return `https://github.com/${handle}`;
    case 'twitter':
      return `https://twitter.com/${handle}`;
    case 'linkedin':
      return `https://linkedin.com/in/${handle}`;
  }
}
export async function Footer() {
  const socials = await getSocials();
  return (
    <footer className="w-full bg-stone-950 p-8 text-stone-100">
      <div className="p-4">
        <Heading level={3} className="mb-2">
          Socials
        </Heading>
        <ul>
          {socials.map(({ _id, socialMedia, handle }) => (
            <li key={_id}>
              {socialMedia}{' '}
              <Link href={getSocialLink({ handle, socialMedia })}>
                @{handle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
