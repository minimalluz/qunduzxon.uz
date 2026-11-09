import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

interface Secrets {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  TURNSTILE_SECRET_KEY?: string;
}
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TURNSTILE_SECRET_KEY } = env as unknown as Secrets;

/**
 * Cloudflare Worker endpoint: formadan kelgan arizani tekshiradi (Turnstile)
 * va Telegram guruh/botga yuboradi. Kalitlar faqat server muhitida saqlanadi.
 */
export const prerender = false;

const PURPOSES: Record<string, string> = {
  toy: '💍 Тўй / Тантана',
  korporativ: '🏢 Корпоратив / Очилиш',
  food: '🍽 Фуд-обзор / Реклама',
  tv: '🎙 ТВ / Дикторлик',
};

const FORMS: Record<string, string> = {
  quick: 'Бўш санани текшириш',
  booking: 'Банд қилиш',
  partner: 'Ҳамкорлик сўрови',
  service: 'Хизмат саҳифаси',
};

const clean = (v: unknown, max = 500) =>
  String(v ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

async function verifyTurnstile(token: string, ip: string | null) {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY yo‘q — tekshiruv o‘tkazib yuborildi (faqat dev uchun!)');
    return import.meta.env.DEV;
  }
  const body = new FormData();
  body.append('secret', TURNSTILE_SECRET_KEY);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export const POST: APIRoute = async ({ request, url }) => {
  // Faqat o'z domenimizdan
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== url.host) return json({ ok: false, error: 'origin' }, 403);

  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  // Honeypot: botlar yashirin maydonni to'ldiradi
  if (clean(input.website)) return json({ ok: true });

  const phoneDigits = clean(input.phone, 40).replace(/\D/g, '');
  if (!/^998\d{9}$/.test(phoneDigits)) return json({ ok: false, error: 'phone' }, 422);

  const ok = await verifyTurnstile(clean(input.token, 2048), request.headers.get('cf-connecting-ip'));
  if (!ok) return json({ ok: false, error: 'captcha' }, 403);

  const purpose = clean(input.purpose, 30);
  const date = clean(input.date, 20);
  const phone = `+${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3, 5)} ${phoneDigits.slice(5, 8)}-${phoneDigits.slice(8, 10)}-${phoneDigits.slice(10)}`;
  const lines = [
    '🔔 <b>Янги мурожаат!</b>',
    `📋 Форма: ${esc(FORMS[clean(input.form, 20)] ?? 'Сайт')}`,
    `🎯 Йўналиш: ${esc(PURPOSES[purpose] ?? (purpose || '—'))}`,
    date && `📅 Сана: ${esc(date.split('-').reverse().join('.'))}`,
    clean(input.name) && `👤 Исми: ${esc(clean(input.name, 100))}`,
    `📞 Тел: <a href="tel:+${phoneDigits}">${phone}</a>`,
    clean(input.company) && `🏷 Компания: ${esc(clean(input.company, 150))}`,
    clean(input.comment) && `💬 Изоҳ: ${esc(clean(input.comment, 1500))}`,
    `🌐 Тил: ${clean(input.lang, 5).toUpperCase() || '—'}`,
    `🔗 Саҳифа: ${esc(clean(input.page, 300))}`,
  ].filter(Boolean);

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('[lead] Telegram sozlanmagan. Xabar:\n' + lines.join('\n'));
    return import.meta.env.DEV ? json({ ok: true, dev: true }) : json({ ok: false, error: 'not_configured' }, 500);
  }

  // Bir nechta chat (egasi + ma'mur): vergul bilan ajratiladi
  const chats = TELEGRAM_CHAT_ID.split(',').map((c) => c.trim()).filter(Boolean);
  const results = await Promise.all(
    chats.map((chat_id) =>
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
      }).then((r) => r.ok),
    ),
  );

  if (!results.some(Boolean)) return json({ ok: false, error: 'telegram' }, 502);
  return json({ ok: true });
};

export const ALL: APIRoute = () => json({ ok: false, error: 'method' }, 405);
