// POST /api/admin/logout — сессияни ўчириш
import { json, clearCookie, sameOrigin, type Ctx } from '../../../functions-lib/admin';

export const onRequestPost = async ({ request }: Ctx): Promise<Response> => {
  if (!sameOrigin(request)) return json({ ok: false, error: 'origin' }, 403);
  return json({ ok: true }, 200, { 'set-cookie': clearCookie() });
};

export const onRequest = async (): Promise<Response> => json({ ok: false, error: 'method' }, 405);
