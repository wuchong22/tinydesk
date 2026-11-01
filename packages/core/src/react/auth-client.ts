import { emailOTPClient, oneTapClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

// Browser auth client. Email OTP stays on unless a site opts out. Google One Tap is on when a client ID is configured.

export function createSiteAuthClient(options: { googleClientId?: string | null; emailOtp?: boolean } = {}) {
  return createAuthClient({
    plugins: [
      ...(options.emailOtp === false ? [] : [emailOTPClient()]),
      ...(options.googleClientId
        ? [oneTapClient({ clientId: options.googleClientId, promptOptions: { maxAttempts: 1 } })]
        : []),
    ],
  });
}

export type SiteAuthClient = ReturnType<typeof createSiteAuthClient>;
