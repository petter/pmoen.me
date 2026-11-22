import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  countryCodeFromName,
  englishCountryName,
  resolveCountryCode,
} from './country';

describe('countryCodeFromName', () => {
  it('resolves English and Norwegian names, ignoring case and accents', () => {
    assert.equal(countryCodeFromName('Canada'), 'CA');
    assert.equal(countryCodeFromName('Norway'), 'NO');
    assert.equal(countryCodeFromName('norge'), 'NO');
    assert.equal(countryCodeFromName('United States'), 'US');
    assert.equal(countryCodeFromName('Österreich'), 'AT');
    assert.equal(countryCodeFromName('osterreich'), 'AT');
  });

  it('returns undefined for unknown names', () => {
    assert.equal(countryCodeFromName('Atlantis'), undefined);
  });
});

describe('resolveCountryCode', () => {
  // Regression: Shortcut sent "" for ISO Country Code
  it('derives the code when the provided one is empty', () => {
    assert.equal(resolveCountryCode('', 'Canada'), 'CA');
    assert.equal(resolveCountryCode(undefined, 'Norge'), 'NO');
  });

  it('prefers a valid provided code', () => {
    assert.equal(resolveCountryCode(' no ', 'Canada'), 'NO');
  });
});

describe('englishCountryName', () => {
  it('returns the English name for a code', () => {
    assert.equal(englishCountryName('NO'), 'Norway');
  });
});
