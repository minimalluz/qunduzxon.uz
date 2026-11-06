/**
 * Cloudflare Pages Function: POST /api/lead
 * Формадан келган аризани текширади ва Telegram гуруҳига юборади.
 *
 * Cloudflare Pages → Settings → Environment variables (Secret):
 *   TELEGRAM_BOT_TOKEN  — @BotFather берган токен
 *   TELEGRAM_CHAT_ID    — ёпиқ гуруҳ ёки чат ID (масалан -1001234567890)
 *   TURNSTILE_SECRET    — Turnstile secret key (ихтиёрий; бўлса, текширув мажбурий)
 * Ҳеч қачон бу қийматларни кодга ёзманг.
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  TURNSTILE_SECRET?: string;
}
interface Ctx { request: Request; env: Env }

const DIRECTIONS: Record<string, string> = {
  toy: 'Тўй / тантана',
  korporativ: 'Корпоратив / очилиш',
  food: 'Фуд-обзор / реклама',
  tv: 'ТВ / дикторлик',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

// Telegram HTML режими учун хавфсиз матн
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clip = (v: unknown, n: number) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  // Ботлар учун тузоқ майдон: одам уни тўлдирмайди
  if (clip(data.website, 200)) return json({ ok: true });

  const phone = clip(data.phone, 30);
  const digits = phone.replace(/\D/g, '');
  if (!/^998\d{9}$/.test(digits)) return json({ ok: false, error: 'phone' }, 422);

  if (env.TURNSTILE_SECRET) {
    const token = clip(data['cf-turnstile-response'], 2048);
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET);
    form.append('response', token);
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) form.append('remoteip', ip);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const v = (await r.json()) as { success: boolean };
    if (!v.success) return json({ ok: false, error: 'captcha' }, 403);
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return json({ ok: false, error: 'not_configured' }, 500);

  const direction = DIRECTIONS[clip(data.direction, 20)] ?? '—';
  const lines = [
    '🔔 <b>Янги мурожаат!</b>',
    `Йўналиш: ${esc(direction)}`,
    `Сана: ${esc(clip(data.date, 20) || '—')}`,
    `Исми: ${esc(clip(data.name, 80) || '—')}`,
    `Тел: ${esc(`+${digits}`)}`,
  ];
  const comment = clip(data.comment, 1000);
  if (comment) lines.push(`Изоҳ: ${esc(comment)}`);
  lines.push(`Саҳифа: ${esc(clip(data.page, 300) || request.headers.get('Referer') || '—')}`);

  const tg = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  if (!tg.ok) return json({ ok: false, error: 'telegram' }, 502);
  return json({ ok: true });
};

export const onRequest = async (): Promise<Response> => json({ ok: false, error: 'method' }, 405);
