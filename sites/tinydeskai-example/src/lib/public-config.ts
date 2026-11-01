import { createServerFn } from '@tanstack/react-start';

// Public config the browser needs. Values come from wrangler vars or .dev.vars, not the build.
// Flags say whether a feature is configured; secret values themselves never leave the server.
export const getPublicConfig = createServerFn({ method: 'GET' }).handler(async () => {
  const { core } = await import('~/core.server');
  const { generationOpen } = await import('~/availability.server');
  const env = core.env;
  return {
    recaptchaSiteKey: env.RECAPTCHA_SITE_KEY || null,
    googleClientId: env.GOOGLE_CLIENT_ID || null,
    paymentsEnabled: Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET),
    generationEnabled: generationOpen(),
  };
});
