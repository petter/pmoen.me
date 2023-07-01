import { z, TypeOf } from 'zod';
import { baseDocumentSchema } from '../../components/utils/zod/base-schema';
import { imageSchema } from '../../components/utils/zod/image-schema';
import { slugSchema } from '../../components/utils/zod/slug-schema';
import { zDateTime } from '@/components/utils/zod/date-time-literal';

export const blogPostItemSchema = baseDocumentSchema('post').extend({
  title: z.string(),
  publishedAt: zDateTime,
  slug: slugSchema,
  mainImage: imageSchema,
  content: z.array(z.unknown()),
});

export type BlogPost = TypeOf<typeof blogPostItemSchema>;

export const blogPostsSchema = z.array(blogPostItemSchema);
