export interface Place {
  city: string;
  countryCode: string;
  lat: number;
  lon: number;
}

export interface MyLocation extends Place {
  country: string;
  updatedAt: Date;
  visible: boolean;
}

export type Visitor = Partial<Place> | null;

export type MeetupVariant = 'same-city' | 'same-country' | 'remote';

export interface MeetupPrompt {
  variant: MeetupVariant;
  /** Lead-in sentence, e.g. "Looks like we're both in Oslo." */
  lead: string;
  /** Call-to-action link label, e.g. "Grab a coffee?" */
  cta: string;
  /** Prefilled DM text */
  dmText: string;
}

export const HOME: MyLocation = {
  city: 'Toronto',
  country: 'Canada',
  countryCode: 'CA',
  lat: 43.65,
  lon: -79.38,
  updatedAt: new Date(0),
  visible: true,
};

/** Within this distance two places count as the same city/metro. */
export const NEAR_KM = 50;

/** Location updates older than this fall back to HOME. */
export const STALE_AFTER_MS = 72 * 60 * 60 * 1000;

const EARTH_RADIUS_KM = 6371;

export function distanceKm(
  a: Pick<Place, 'lat' | 'lon'>,
  b: Pick<Place, 'lat' | 'lon'>,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** Where to present myself as: the latest fresh, visible update, else HOME. */
export function resolveMyLocation(
  stored: MyLocation | null,
  now: Date,
): MyLocation {
  if (!stored || !stored.visible) return HOME;
  if (now.getTime() - stored.updatedAt.getTime() > STALE_AFTER_MS) return HOME;
  return stored;
}

function isNear(me: Place, visitor: Visitor): boolean {
  if (visitor?.lat === undefined || visitor.lon === undefined) return false;
  return distanceKm(me, { lat: visitor.lat, lon: visitor.lon }) <= NEAR_KM;
}

function isSameCountry(me: Place, visitor: Visitor): boolean {
  return (
    !!visitor?.countryCode &&
    visitor.countryCode.toUpperCase() === me.countryCode.toUpperCase()
  );
}

export function getMeetupPrompt(
  me: MyLocation,
  visitor: Visitor,
): MeetupPrompt {
  if (isNear(me, visitor)) {
    return {
      variant: 'same-city',
      lead: `Looks like we're both in ${me.city}.`,
      cta: 'Grab a coffee?',
      dmText: `Hey Petter! Looks like we're both in ${me.city}. Up for a coffee?`,
    };
  }

  const atHome = distanceKm(me, HOME) <= NEAR_KM;

  if (isSameCountry(me, visitor)) {
    return {
      variant: 'same-country',
      lead: `We're both in ${me.country} right now.`,
      cta: 'How about a chat?',
      dmText: `Hey Petter! Saw we're both in ${me.country}. Fancy a chat?`,
    };
  }

  return {
    variant: 'remote',
    lead: atHome ? `I'm in ${me.city}.` : `I'm in ${me.city} this week.`,
    cta: 'How about a chat?',
    dmText: `Hey Petter! Saw your site, fancy a chat?`,
  };
}
