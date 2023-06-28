import { z, TypeOf } from 'zod';
import { baseDocumentSchema } from '../../components/utils/schemas/base-schema';
import { imageSchema } from '../../components/utils/schemas/image-schema';
import { slugSchema } from '../../components/utils/schemas/slug-schema';

export const blogPostSchema = z.array(
  baseDocumentSchema('post').extend({
    title: z.string(),
    slug: slugSchema,
    mainImage: imageSchema,
    content: z.array(z.unknown()),
  })
);

export type BlogPost = TypeOf<typeof blogPostSchema>[number];
