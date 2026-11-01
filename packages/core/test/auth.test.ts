import { env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import { createAuth } from '../src/auth/server';
import { createDb } from '../src/db/client';
import type { CoreEnv } from '../src/env';
import { defineSite } from '../src/site';

const db = createDb(env.DB);

const site = defineSite({
  id: 'test',
  name: 'Test',
  url: 'https://test.example',
  locales: ['en'],
  defaultLocale: 'en',
  products: [],
  signup: { bonusCredits: 0, bonusExpiresDays: null, bonusPerIpDaily: 3, bonusSiteDaily: 100 },
  guest: { dailyPerDevice: 1, dailyPerIp: 3, dailySiteBudget: 100, minRecaptchaScore: 0.5 },
  billing: { provider: 'stripe', automaticTax: false },
});

const auth = (secret: string | undefined) =>
  createAuth({
    db,
    env: { BETTER_AUTH_SECRET: secret } as unknown as CoreEnv,
    site,
    baseURL: 'https://test.example',
    log: () => {},
  });

describe('auth secret', () => {
  it('refuses to start without a real secret instead of falling back to the public default', () => {
    expect(() => auth(undefined)).toThrow(/BETTER_AUTH_SECRET/);
    expect(() => auth('')).toThrow(/BETTER_AUTH_SECRET/);
    expect(() => auth('replace-with-32-random-bytes')).toThrow(/BETTER_AUTH_SECRET/);
    expect(() => auth('x'.repeat(32))).not.toThrow();
  });

  it('the email change link route, which signs users in, is disabled', async () => {
    const response = await auth('x'.repeat(32)).handler(
      new Request('https://test.example/api/auth/verify-email?token=forged'),
    );
    expect(response.status).toBe(404);
  });

  it('keeps email code routes when a site has not turned them off', async () => {
    const response = await postOtp(auth('x'.repeat(32)), '/email-otp/send-verification-otp');
    expect(response.status).not.toBe(404);
  });

  it('disables email code sign-in and sending when the site turns email OTP off', async () => {
    const googleOnly = createAuth({
      db,
      env: { BETTER_AUTH_SECRET: 'x'.repeat(32) } as unknown as CoreEnv,
      site: defineSite({ ...site, auth: { emailOtp: false } }),
      baseURL: 'https://test.example',
      log: () => {},
    });
    for (const path of ['/email-otp/send-verification-otp', '/sign-in/email-otp']) {
      const response = await postOtp(googleOnly, path);
      expect(response.status).toBe(404);
    }
  });
});

function postOtp(instance: ReturnType<typeof createAuth>, path: string) {
  return instance.handler(
    new Request(`https://test.example/api/auth${path}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://test.example' },
      body: JSON.stringify({ email: 'person@example.com', type: 'sign-in', otp: '000000' }),
    }),
  );
}
