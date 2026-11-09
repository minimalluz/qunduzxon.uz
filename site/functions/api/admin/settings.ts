// GET /api/admin/settings — жорий созламалар (GitHub'даги файлдан)
// PUT /api/admin/settings — { settings, sha } → текшириб, GitHub'га коммит; Cloudflare сайтни қайта йиғади
import { json, isAuthed, sameOrigin, configured, validate, readFile, writeFile, SETTINGS_PATH, type Ctx } from '../../../functions-lib/admin';

export const onRequestGet = async ({ request, env }: Ctx): Promise<Response> => {
  if (!configured(env)) return json({ ok: false, error: 'not_configured' }, 503);
  if (!(await isAuthed(request, env))) return json({ ok: false, error: 'auth' }, 401);
  try {
    const { text, sha } = await readFile(env, SETTINGS_PATH);
    return json({ ok: true, settings: JSON.parse(text), sha });
  } catch (e) {
    return json({ ok: false, error: 'github', detail: String(e) }, 502);
  }
};

export const onRequestPut = async ({ request, env }: Ctx): Promise<Response> => {
  if (!sameOrigin(request)) return json({ ok: false, error: 'origin' }, 403);
  if (!configured(env)) return json({ ok: false, error: 'not_configured' }, 503);
  if (!(await isAuthed(request, env))) return json({ ok: false, error: 'auth' }, 401);

  let data: { settings?: Record<string, unknown>; sha?: unknown };
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }
  if (!data.settings || typeof data.sha !== 'string') return json({ ok: false, error: 'bad_request' }, 400);

  const v = validate(data.settings);
  if (!v.ok) return json({ ok: false, error: 'invalid', errors: v.errors }, 422);

  try {
    const r = await writeFile(env, SETTINGS_PATH, JSON.stringify(v.value, null, 2) + '\n', data.sha, 'Админ панел: сайт созламалари янгиланди');
    if (!r.ok) return json({ ok: false, error: 'conflict' }, 409);
    return json({ ok: true, settings: v.value, sha: r.sha });
  } catch (e) {
    return json({ ok: false, error: 'github', detail: String(e) }, 502);
  }
};

export const onRequest = async (): Promise<Response> => json({ ok: false, error: 'method' }, 405);
