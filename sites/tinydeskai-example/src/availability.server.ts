import { errorResponse } from '@shipwords/core/http';
import { core } from '~/core.server';

interface GateEnv {
  APP_URL?: string;
  YIR_API_KEY?: string;
  UPSTREAM_MOCK?: string;
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

/** Real generation needs YIR_API_KEY. Mock stays on local APP_URL only and is never served for the public site. */
export function generationOpen(): boolean {
  const env = core.env as GateEnv;
  if (env.UPSTREAM_MOCK) return localApp(env.APP_URL);
  return Boolean(env.YIR_API_KEY);
}

export function generationClosedResponse(): Response | null {
  if (generationOpen()) return null;
  return errorResponse(503, 'generation_unavailable', 'Video generation is not available yet.');
}
