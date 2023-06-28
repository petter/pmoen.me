import { z } from 'zod';

export const imageSchema = z.object({
  src: z.unknown(),
  alt: z.string(),
  caption: z.string().optional(),
});
