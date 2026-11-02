import { createFileRoute } from '@tanstack/react-router';
import { generationClosedResponse, prepareAdminTest } from '~/availability.server';
import { jobsApi } from '~/core.server';

export const Route = createFileRoute('/api/jobs/')({
  server: {
    handlers: {
      GET: ({ request }) => jobsApi.list(request),
      POST: async ({ request }) => {
        const closed = await generationClosedResponse(request);
        if (closed) return closed;
        await prepareAdminTest(request);
        return jobsApi.create(request);
      },
    },
  },
});
