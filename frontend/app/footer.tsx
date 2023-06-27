import { sanityClient } from './client';

async function getSocials(): Promise<
  { _id: string; socialMedia: string; handle: string }[]
> {
  return await sanityClient.fetch('*[_type == "socialMedias"]');
}

export async function Footer() {
  const socials = await getSocials();
  return (
    <footer>
      <ul>
        {socials.map(({ _id, socialMedia, handle }) => (
          <li key={_id}>
            {socialMedia} {handle}
          </li>
        ))}
      </ul>
    </footer>
  );
}
