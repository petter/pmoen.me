import { sanityClient } from './client';
import { Heading } from './components/typography/Heading';

async function getSocials(): Promise<
  { _id: string; socialMedia: string; handle: string }[]
> {
  return await sanityClient.fetch('*[_type == "socialMedias"]');
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
              {socialMedia} @{handle}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
