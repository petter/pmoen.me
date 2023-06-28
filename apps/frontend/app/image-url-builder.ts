import builder from '@sanity/image-url';
import { sanityClient } from './client';

export const imageUrlBuilder = builder(sanityClient);
