import { createFileRoute } from '@tanstack/react-router';
import { generationClosedResponse } from '~/availability.server';
import { jobsApi } from '~/core.server';

export const Route = createFileRoute('/api/uploads')({
  server: {
    handlers: {
      POST: async ({ request }) => (await generationClosedResponse(request)) ?? jobsApi.upload(request),
    },
  },
});
