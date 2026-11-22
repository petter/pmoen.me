import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import {
  LOCATION_CACHE_TAG,
  LocationUpdateSchema,
  saveLocation,
} from '@/app/location';

type AuthResult =
  'ok' | 'secret-not-configured' | 'missing-header' | 'mismatch';

/** Structured log line; never includes the secret. */
function log(
  level: 'info' | 'warn' | 'error',
  event: string,
  data: Record<string, unknown> = {},
) {
  console[level](`[location] ${event}`, JSON.stringify(data));
}

function checkAuth(request: Request): AuthResult {
  const secret = process.env.LOCATION_SECRET;
  if (!secret) return 'secret-not-configured';

  const header = request.headers.get('authorization');
  if (!header) return 'missing-header';

  const expected = Buffer.from(`Bearer ${secret}`);
  const actual = Buffer.from(header);
  return actual.length === expected.length && timingSafeEqual(actual, expected)
    ? 'ok'
    : 'mismatch';
}

/** Key → type map, e.g. { city: 'string', lat: 'number' }, to debug payloads without logging values. */
function describeShape(body: unknown): unknown {
  if (typeof body !== 'object' || body === null) return typeof body;
  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, typeof value]),
  );
}

export async function POST(request: Request) {
  const meta = {
    userAgent: request.headers.get('user-agent'),
    contentType: request.headers.get('content-type'),
  };
  log('info', 'request received', meta);

  const auth = checkAuth(request);
  if (auth !== 'ok') {
    const header = request.headers.get('authorization') ?? '';
    log('warn', 'unauthorized', {
      reason: auth,
      hasBearerPrefix: header.startsWith('Bearer '),
      headerLength: header.length,
    });
    return Response.json(
      { error: 'Unauthorized', reason: auth },
      { status: 401 },
    );
  }

  const raw = await request.text();
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    log('warn', 'invalid json', {
      ...meta,
      length: raw.length,
      preview: raw.slice(0, 80),
    });
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = LocationUpdateSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    log('warn', 'invalid payload', { shape: describeShape(body), issues });
    return Response.json({ error: 'Invalid payload', issues }, { status: 400 });
  }

  try {
    const stored = await saveLocation(parsed.data);
    // Expire immediately so the homepage shows the new city on next visit
    revalidateTag(LOCATION_CACHE_TAG, { expire: 0 });
    log('info', 'saved', {
      city: stored.city,
      countryCode: stored.countryCode,
      visible: stored.visible,
    });
    return Response.json({ ok: true, location: stored });
  } catch (error) {
    log('error', 'storage failed', { error: String(error) });
    return Response.json({ error: 'Storage failed' }, { status: 502 });
  }
}

/** Log wrong-method hits too, so a misconfigured Shortcut shows up in logs. */
export function GET(request: Request) {
  log('warn', 'wrong method', {
    method: 'GET',
    userAgent: request.headers.get('user-agent'),
  });
  return Response.json({ error: 'Use POST' }, { status: 405 });
}
