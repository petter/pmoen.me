import { z } from 'zod';

export const zDateTime = z
  .string()
  .datetime()
  .transform((date) => new Date(date));
