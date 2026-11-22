import { MapPin } from 'lucide-react';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import { twMerge } from 'tailwind-merge';
import { ExternalLink } from '@/components/typography/external-link';
import { getMeetupPrompt, resolveMyLocation, type Visitor } from '@/lib/meetup';
import { getStoredLocation } from './location';

/** Numeric id for @pettersmoen, needed by X's DM compose URL */
const X_USER_ID = '1618540546439487488';

function dmUrl(text: string): string {
  const params = new URLSearchParams({ recipient_id: X_USER_ID, text });
  return `https://x.com/messages/compose?${params}`;
}

function parseCoord(value: string | null | undefined): number | undefined {
  if (!value) return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

/**
 * Visitor location from Vercel's IP geolocation headers. Used only to pick
 * the copy for this request: never stored, logged or sent anywhere.
 */
async function getVisitor(geoOverride: string | undefined): Promise<Visitor> {
  // Local/preview testing: ?geo=59.91,10.75,NO
  if (geoOverride && process.env.VERCEL_ENV !== 'production') {
    const [lat, lon, countryCode] = geoOverride.split(',');
    return { lat: parseCoord(lat), lon: parseCoord(lon), countryCode };
  }

  const h = await headers();
  return {
    countryCode: h.get('x-vercel-ip-country') ?? undefined,
    lat: parseCoord(h.get('x-vercel-ip-latitude')),
    lon: parseCoord(h.get('x-vercel-ip-longitude')),
  };
}

function InviteSkeleton() {
  return (
    <p className="flex items-center gap-2.5 text-sm text-stone-300">
      <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-stone-600" />
      <span className="sr-only">Loading where I am</span>
      <span
        aria-hidden="true"
        className="inline-block h-4 w-56 rounded bg-stone-800 motion-safe:animate-pulse"
      />
    </p>
  );
}

async function InviteContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { geo } = await searchParams;
  const visitor = await getVisitor(typeof geo === 'string' ? geo : undefined);
  const me = resolveMyLocation(await getStoredLocation(), new Date());
  const prompt = getMeetupPrompt(me, visitor);
  const isLocal = prompt.variant === 'same-city';

  return (
    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-300 sm:items-center">
      <MapPin
        aria-hidden="true"
        className={twMerge(
          'mt-0.5 h-4 w-4 shrink-0 sm:mt-0',
          isLocal ? 'text-amber-300' : 'text-stone-500',
        )}
      />
      <span>
        {prompt.lead}{' '}
        <ExternalLink href={dmUrl(prompt.dmText)}>{prompt.cta}</ExternalLink>
      </span>
    </p>
  );
}

export function MeetupInvite({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="enter-up mt-6" style={{ animationDelay: '245ms' }}>
      <Suspense fallback={<InviteSkeleton />}>
        <InviteContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
