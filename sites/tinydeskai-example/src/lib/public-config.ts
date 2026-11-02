import { createServerFn } from '@tanstack/react-start';

// Public config the browser needs. Values come from wrangler vars or .dev.vars, not the build.
// Flags say whether a feature is configured; secret values themselves never leave the server.
export const getPublicConfig = createServerFn({ method: 'GET' }).handler(async () => {
  const { getRequest } = await import('@tanstack/react-start/server');
  const { core } = await import('~/core.server');
  const { generationEnabledFor, paymentsOpen } = await import('~/availability.server');
  const env = core.env;
  return {
    recaptchaSiteKey: env.RECAPTCHA_SITE_KEY || null,
    // The button needs the client ID in the browser. Publish it only when the server also has the secret, so a half-configured Google login never shows a dead button.
    googleClientId: env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET ? env.GOOGLE_CLIENT_ID : null,
    paymentsEnabled: paymentsOpen(),
    // Public visitors stay disabled. A signed-in admin sees the control; the API checks the same rule.
    generationEnabled: await generationEnabledFor(getRequest()),
  };
});
