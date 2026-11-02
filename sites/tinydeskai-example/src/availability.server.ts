import { getBalance, grantCredits } from '@shipwords/core/credits/ledger';
import { errorResponse } from '@shipwords/core/http';
import { core } from '~/core.server';
import site from '../site.config';
import models from '../site.models';

interface GateEnv {
  APP_URL?: string;
  YIR_API_KEY?: string;
  UPSTREAM_MOCK?: string;
  /** Must be the string "1" before the public site can generate. A model key alone does not open it. */
  PUBLIC_GENERATION?: string;
  /** Must be the string "1" before checkout can open. Stripe keys alone do not open it. */
  PAYMENTS?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  /** Comma-separated Google account emails allowed to run one internal test while the public site stays closed. */
  GENERATION_ADMINS?: string;
}

function localApp(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host.endsWith('.localhost');
  } catch {
    return false;
  }
}

function gateEnv(): GateEnv {
  return core.env as GateEnv;
}

/**
 * Public generation. Local mock stays available for local preview.
 * Production stays closed until PUBLIC_GENERATION is exactly "1" and a real model key is set.
 */
/** Purchases stay closed unless PAYMENTS is exactly "1", both Stripe secrets exist, and every product has a Price id. */
export function paymentsOpen(): boolean {
  const env = gateEnv();
  if (env.PAYMENTS !== '1') return false;
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) return false;
  return site.products.every((product) => Boolean(product.refs?.stripe));
}

export function paymentsClosedResponse(): Response | null {
  if (paymentsOpen()) return null;
  return errorResponse(503, 'payments_unavailable', 'Checkout stays closed until payments are enabled.');
}

export function publicGenerationOpen(): boolean {
  const env = gateEnv();
  if (env.UPSTREAM_MOCK) return localApp(env.APP_URL);
  if (env.PUBLIC_GENERATION !== '1') return false;
  return Boolean(env.YIR_API_KEY);
}

function adminEmails(): Set<string> {
  const raw = gateEnv().GENERATION_ADMINS ?? '';
  return new Set(
    raw
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email.length > 0),
  );
}

/** Signed-in Google user whose email is listed in GENERATION_ADMINS. An empty list allows nobody. */
export async function isGenerationAdmin(request: Request): Promise<boolean> {
  const allow = adminEmails();
  if (allow.size === 0) return false;
  const user = await core.getUser(request);
  return Boolean(user && allow.has(user.email.trim().toLowerCase()));
}

/** True for the public site when the switch is on, or for a signed-in admin while it stays off. */
export async function generationEnabledFor(request: Request): Promise<boolean> {
  if (publicGenerationOpen()) return true;
  return isGenerationAdmin(request);
}

export async function generationClosedResponse(request: Request): Promise<Response | null> {
  if (await generationEnabledFor(request)) return null;
  return errorResponse(503, 'generation_unavailable', 'Video generation is not available yet.');
}

function testCredits(): number {
  const model = models.find((item) => item.id === 'tiny-desk');
  return typeof model?.credits === 'number' ? model.credits : 0;
}

/**
 * One internal test needs the normal credit charge, and payments stay closed.
 * Grant the model price once per admin. A later submit does not grant again.
 */
export async function prepareAdminTest(request: Request): Promise<void> {
  if (publicGenerationOpen()) return;
  if (!(await isGenerationAdmin(request))) return;
  const user = await core.getUser(request);
  const amount = testCredits();
  if (!user || amount <= 0) return;
  const balance = await getBalance(core.db, user.id);
  if (balance.available >= amount) return;
  await grantCredits(core.db, {
    userId: user.id,
    amount,
    idemKey: `admin-test:${user.id}`,
    source: 'admin-test',
    sourceRef: user.id,
  });
}
