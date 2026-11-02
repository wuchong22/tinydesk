import { createFileRoute } from '@tanstack/react-router';
import { paymentsClosedResponse } from '~/availability.server';
import { core } from '~/core.server';

export const Route = createFileRoute('/api/billing/checkout')({
  server: {
    handlers: {
      POST: ({ request }) => paymentsClosedResponse() ?? core.billing.checkout(request),
    },
  },
});
