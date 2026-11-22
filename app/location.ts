import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';
import { englishCountryName, resolveCountryCode } from '@/lib/country';
import type { MyLocation } from '@/lib/meetup';

export const LOCATION_CACHE_TAG = 'location';
const REDIS_KEY = 'pmoen:location';

const LocationFieldsSchema = z.object({
  city: z.string().trim().min(1).max(80),
  country: z.string().trim().min(1).max(80),
  countryCode: z.string().length(2),
  // Shortcuts may send numbers as strings
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  visible: z.boolean().optional().default(true),
});

/**
 * Payload posted by the iPhone Shortcut. `countryCode` is optional: when it
 * is missing or empty it is derived from the country name.
 */
export const LocationUpdateSchema = LocationFieldsSchema.extend({
  countryCode: z.string().optional(),
}).transform((data, ctx) => {
  const countryCode = resolveCountryCode(data.countryCode, data.country);
  if (!countryCode) {
    ctx.addIssue({
      code: 'custom',
      path: ['countryCode'],
      message: `Unknown country "${data.country}"; send countryCode explicitly`,
    });
    return z.NEVER;
  }
  // Store the English name so the homepage copy is consistent
  const country = englishCountryName(countryCode) ?? data.country;
  return { ...data, country, countryCode };
});

const StoredLocationSchema = LocationFieldsSchema.extend({
  updatedAt: z.iso.datetime(),
});

type StoredLocation = z.infer<typeof StoredLocationSchema>;

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

/** Runs a single command against the Upstash Redis REST API. */
async function redis(command: string[]): Promise<unknown> {
  const config = redisConfig();
  if (!config) throw new Error('Upstash Redis env vars not set');

  const response = await fetch(config.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.token}` },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Upstash error: ${response.status} ${response.statusText}`);
  }
  const { result } = (await response.json()) as { result: unknown };
  return result;
}

/** ~11 km precision: enough for city matching, never pinpoints a venue. */
const roundCoord = (value: number) => Math.round(value * 10) / 10;

export async function saveLocation(
  update: z.output<typeof LocationUpdateSchema>,
): Promise<StoredLocation> {
  const stored: StoredLocation = {
    ...update,
    lat: roundCoord(update.lat),
    lon: roundCoord(update.lon),
    updatedAt: new Date().toISOString(),
  };
  await redis(['SET', REDIS_KEY, JSON.stringify(stored)]);
  return stored;
}

export async function getStoredLocation(): Promise<MyLocation | null> {
  'use cache';
  cacheTag(LOCATION_CACHE_TAG);
  cacheLife('hours');

  if (!redisConfig()) {
    console.warn('Upstash Redis not configured, using home location');
    return null;
  }

  try {
    const raw = await redis(['GET', REDIS_KEY]);
    if (typeof raw !== 'string') return null;

    const parsed = StoredLocationSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return null;

    return { ...parsed.data, updatedAt: new Date(parsed.data.updatedAt) };
  } catch (error) {
    console.error('Failed to read location:', error);
    return null;
  }
}
