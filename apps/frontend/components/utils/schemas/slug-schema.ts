import { z } from 'zod';

export const slugSchema = z.object({
  _type: z.enum(['slug']),
  current: z.string(),
});
