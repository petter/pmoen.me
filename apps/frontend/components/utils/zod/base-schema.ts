import { z } from 'zod';
import { zDateTime } from './date-time-literal';

export function baseDocumentSchema<T extends string>(type: T) {
  return z.object({
    _id: z.string(),
    _rev: z.string(),
    _type: z.enum([type]),
    _createdAt: zDateTime,
    _updatedAt: zDateTime,
  });
}
