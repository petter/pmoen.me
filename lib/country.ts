/**
 * Resolves an ISO 3166-1 alpha-2 code from a country name, e.g. "Norway" or
 * "Norge" → "NO". iOS Shortcuts reports country names in the phone's
 * language, so names are matched across a few locales.
 */
const LOCALES = ['en', 'nb', 'nn', 'sv', 'da', 'de', 'fr', 'es'];

const normalize = (name: string) =>
  name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

let nameToCode: Map<string, string> | null = null;

function buildIndex(): Map<string, string> {
  const index = new Map<string, string>();
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (const locale of LOCALES) {
    const names = new Intl.DisplayNames([locale], {
      type: 'region',
      fallback: 'none',
    });
    for (const a of letters) {
      for (const b of letters) {
        const code = a + b;
        const name = names.of(code);
        if (name && !index.has(normalize(name))) {
          index.set(normalize(name), code);
        }
      }
    }
  }
  return index;
}

export function countryCodeFromName(name: string): string | undefined {
  nameToCode ??= buildIndex();
  return nameToCode.get(normalize(name));
}

/** Uses a valid two-letter code as-is, otherwise derives it from the name. */
export function resolveCountryCode(
  code: string | undefined,
  country: string,
): string | undefined {
  const trimmed = code?.trim().toUpperCase();
  if (trimmed && /^[A-Z]{2}$/.test(trimmed)) return trimmed;
  return countryCodeFromName(country);
}

const englishNames = new Intl.DisplayNames(['en'], {
  type: 'region',
  fallback: 'none',
});

/** English display name for a code, e.g. "NO" → "Norway". */
export function englishCountryName(code: string): string | undefined {
  return englishNames.of(code);
}
