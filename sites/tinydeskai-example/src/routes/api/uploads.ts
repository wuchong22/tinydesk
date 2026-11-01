import { createFileRoute } from '@tanstack/react-router';
import { generationClosedResponse } from '~/availability.server';
import { jobsApi } from '~/core.server';

export const Route = createFileRoute('/api/uploads')({
  server: { handlers: { POST: ({ request }) => generationClosedResponse() ?? jobsApi.upload(request) } },
});
