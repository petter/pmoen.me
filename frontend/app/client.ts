import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '72xijfsf',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-06-27',
});
