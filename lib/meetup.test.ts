import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  HOME,
  STALE_AFTER_MS,
  distanceKm,
  getMeetupPrompt,
  resolveMyLocation,
  type MyLocation,
} from './meetup';

const now = new Date('2026-11-21T12:00:00Z');

const oslo: MyLocation = {
  city: 'Oslo',
  country: 'Norway',
  countryCode: 'NO',
  lat: 59.9,
  lon: 10.8,
  updatedAt: new Date(now.getTime() - 60 * 60 * 1000),
  visible: true,
};

describe('distanceKm', () => {
  it('measures Oslo to Bergen at roughly 300 km', () => {
    const km = distanceKm(oslo, { lat: 60.39, lon: 5.32 });
    assert.ok(km > 290 && km < 320, `got ${km}`);
  });
});

describe('resolveMyLocation', () => {
  it('uses a fresh visible update', () => {
    assert.equal(resolveMyLocation(oslo, now), oslo);
  });

  it('falls back to home when missing, hidden or stale', () => {
    assert.equal(resolveMyLocation(null, now), HOME);
    assert.equal(resolveMyLocation({ ...oslo, visible: false }, now), HOME);
    const stale = new Date(now.getTime() - STALE_AFTER_MS - 1);
    assert.equal(resolveMyLocation({ ...oslo, updatedAt: stale }, now), HOME);
  });
});

describe('getMeetupPrompt', () => {
  it('offers coffee when the visitor is in the same metro', () => {
    // Bærum, just outside Oslo city limits
    const prompt = getMeetupPrompt(oslo, {
      city: 'Baerum',
      countryCode: 'NO',
      lat: 59.89,
      lon: 10.52,
    });
    assert.equal(prompt.variant, 'same-city');
    assert.equal(prompt.lead, "Looks like we're both in Oslo.");
    assert.equal(prompt.cta, 'Grab a coffee?');
  });

  it('suggests a chat when only the country matches', () => {
    const prompt = getMeetupPrompt(oslo, {
      countryCode: 'no',
      lat: 60.39,
      lon: 5.32,
    });
    assert.equal(prompt.variant, 'same-country');
    assert.equal(prompt.lead, "We're both in Norway right now.");
    assert.equal(prompt.cta, 'How about a chat?');
  });

  it('suggests a chat without mentioning the visitor location otherwise', () => {
    const prompt = getMeetupPrompt(oslo, {
      city: 'Stockholm',
      countryCode: 'SE',
      lat: 59.33,
      lon: 18.07,
    });
    assert.equal(prompt.variant, 'remote');
    assert.equal(prompt.lead, "I'm in Oslo this week.");
    assert.ok(!prompt.dmText.includes('Stockholm'));
  });

  it('drops "this week" when at home and handles unknown visitors', () => {
    const prompt = getMeetupPrompt(HOME, null);
    assert.equal(prompt.variant, 'remote');
    assert.equal(prompt.lead, "I'm in Toronto.");
  });

  it('treats Mississauga as Toronto', () => {
    const prompt = getMeetupPrompt(HOME, {
      city: 'Mississauga',
      countryCode: 'CA',
      lat: 43.59,
      lon: -79.64,
    });
    assert.equal(prompt.variant, 'same-city');
  });
});
