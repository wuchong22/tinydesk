import { createFileRoute } from '@tanstack/react-router';
import { generationClosedResponse } from '~/availability.server';
import { jobsApi } from '~/core.server';

export const Route = createFileRoute('/api/jobs/')({
  server: {
    handlers: {
      GET: ({ request }) => jobsApi.list(request),
      POST: ({ request }) => generationClosedResponse() ?? jobsApi.create(request),
    },
  },
});
