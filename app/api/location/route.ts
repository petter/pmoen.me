import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import {
  LOCATION_CACHE_TAG,
  LocationUpdateSchema,
  saveLocation,
} from '@/app/location';

function isAuthorized(request: Request): boolean {
  const secret = process.env.LOCATION_SECRET;
  if (!secret) return false;

  const header = request.headers.get('authorization') ?? '';
  const expected = Buffer.from(`Bearer ${secret}`);
  const actual = Buffer.from(header);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = LocationUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Invalid payload', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const stored = await saveLocation(parsed.data);
    // Expire immediately so the homepage shows the new city on next visit
    revalidateTag(LOCATION_CACHE_TAG, { expire: 0 });
    return Response.json({ ok: true, location: stored });
  } catch (error) {
    console.error('Failed to save location:', error);
    return Response.json({ error: 'Storage failed' }, { status: 502 });
  }
}
