// POST /api/admin/login — { password, 'cf-turnstile-response'? } → сессия cookie
import { json, configured, samePassword, sessionCookie, sameOrigin, type Ctx } from '../../../functions-lib/admin';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  if (!sameOrigin(request)) return json({ ok: false, error: 'origin' }, 403);
  if (!configured(env)) return json({ ok: false, error: 'not_configured' }, 503);

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  if (env.TURNSTILE_SECRET) {
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET);
    form.append('response', typeof data['cf-turnstile-response'] === 'string' ? data['cf-turnstile-response'] : '');
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) form.append('remoteip', ip);
    const v = (await (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })).json()) as { success: boolean };
    if (!v.success) return json({ ok: false, error: 'captcha' }, 403);
  }

  const password = typeof data.password === 'string' ? data.password : '';
  if (!(await samePassword(password, env.ADMIN_PASSWORD!))) {
    await sleep(1500); // паролни тахмин қилишни секинлатиш
    return json({ ok: false, error: 'password' }, 401);
  }
  return json({ ok: true }, 200, { 'set-cookie': await sessionCookie(env) });
};

export const onRequest = async (): Promise<Response> => json({ ok: false, error: 'method' }, 405);
