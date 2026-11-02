import { createFileRoute } from '@tanstack/react-router';
import { paymentsClosedResponse } from '~/availability.server';
import { core } from '~/core.server';

// Set the Stripe webhook URL to https://<domain>/api/webhooks/stripe; the event list is in docs/site-launch.md.
// The handler stays closed until PAYMENTS is exactly "1", so a configured secret cannot grant credits early.
export const Route = createFileRoute('/api/webhooks/stripe')({
  server: {
    handlers: {
      POST: ({ request }) => paymentsClosedResponse() ?? core.billing.webhook(request),
    },
  },
});
