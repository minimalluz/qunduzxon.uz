/**
 * Админ панел (qunduzxon.uz/admin) учун умумий функциялар: кириш (сессия), текширув, GitHub.
 *
 * Cloudflare Pages → Settings → Environment variables:
 *   ADMIN_PASSWORD  (Secret) — админ панел пароли, камида 12 белги
 *   GITHUB_TOKEN    (Secret) — GitHub fine-grained token: шу репозиторий, Contents: Read and write
 *   GITHUB_REPO     (ихтиёрий) — «minimalluz/qunduzxon.uz»
 *   GITHUB_BRANCH   (ихтиёрий) — сайт йиғиладиган шохча, «redesign»
 *   TURNSTILE_SECRET (ихтиёрий) — бўлса, киришда Turnstile текширилади
 *   GITHUB_API      (фақат текширув учун) — GitHub API манзили
 */

export interface Env {
  ADMIN_PASSWORD?: string;
  GITHUB_TOKEN?: string;
  GITHUB_REPO?: string;
  GITHUB_BRANCH?: string;
  GITHUB_API?: string;
  TURNSTILE_SECRET?: string;
}
export interface Ctx { request: Request; env: Env }

export const SETTINGS_PATH = 'site/src/data/settings.json';
const COOKIE = 'qa_session';
const SESSION_SECONDS = 12 * 60 * 60;

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });

const enc = new TextEncoder();

/** Паролдан сессия калити: парол алмашса, эски сессиялар ўзи бекор бўлади */
async function hmacKey(env: Env) {
  const raw = await crypto.subtle.digest('SHA-256', enc.encode(`qunduzxon-admin-session:${env.ADMIN_PASSWORD}`));
  return crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}
const b64url = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/** Вақтга боғлиқ бўлмаган солиштириш */
export async function samePassword(a: string, b: string) {
  const [x, y] = await Promise.all([crypto.subtle.digest('SHA-256', enc.encode(a)), crypto.subtle.digest('SHA-256', enc.encode(b))]);
  const ux = new Uint8Array(x), uy = new Uint8Array(y);
  let d = 0;
  for (let i = 0; i < ux.length; i++) d |= ux[i] ^ uy[i];
  return d === 0;
}

export const configured = (env: Env) => !!env.ADMIN_PASSWORD && env.ADMIN_PASSWORD.length >= 12 && !!env.GITHUB_TOKEN;

export async function sessionCookie(env: Env) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const sig = b64url(await crypto.subtle.sign('HMAC', await hmacKey(env), enc.encode(String(exp))));
  return `${COOKIE}=${exp}.${sig}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}
export const clearCookie = () => `${COOKIE}=; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export async function isAuthed(request: Request, env: Env) {
  if (!configured(env)) return false;
  const m = (request.headers.get('cookie') ?? '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=(\\d+)\\.([A-Za-z0-9_-]+)`));
  if (!m) return false;
  const exp = Number(m[1]);
  if (!exp || exp < Date.now() / 1000) return false;
  const expected = b64url(await crypto.subtle.sign('HMAC', await hmacKey(env), enc.encode(String(exp))));
  return samePassword(expected, m[2]);
}

/** Ўзгартирувчи сўровлар фақат шу сайтнинг ўзидан (CSRF ҳимояси) */
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !!origin && origin === new URL(request.url).origin;
}

// ---------- Созламалар: текширув ----------

export interface Settings {
  telegram: string; phone: string; email: string;
  instagram: string; youtube: string; facebook: string;
  years: number; events: number; followers: number;
  showDateCheck: boolean;
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const url = (v: unknown, hosts: RegExp) => {
  const s = str(v);
  if (!s) return '';
  try {
    const u = new URL(/^https?:\/\//.test(s) ? s : `https://${s}`);
    if (!hosts.test(u.hostname)) return null;
    u.protocol = 'https:';
    u.search = ''; // кузатув параметрлари (?igsh=..., ?mdxt=...) керак эмас
    u.hash = '';
    return u.href;
  } catch {
    return null;
  }
};
const int = (v: unknown, min: number, max: number) => {
  const n = typeof v === 'number' ? v : Number(str(v));
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
};

/** Формадан келган қийматларни текшириб, тозалайди. Хато бўлса — майдон номи → хабар */
export function validate(input: Record<string, unknown>): { ok: true; value: Settings } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  let telegram = str(input.telegram).replace(/^@/, '').replace(/^(https?:\/\/)?(t\.me|telegram\.me)\//i, '').replace(/\/$/, '');
  if (telegram && !/^[A-Za-z0-9_]{4,32}$/.test(telegram)) errors.telegram = 'Username фақат лотин ҳарфлари, рақам ва _ дан иборат бўлади (4–32 белги).';

  let phone = str(input.phone).replace(/[\s\-()]/g, '');
  if (phone && !phone.startsWith('+')) phone = phone.startsWith('998') ? `+${phone}` : `+998${phone}`;
  if (phone && !/^\+998\d{9}$/.test(phone)) errors.phone = 'Рақам +998 ва 9 та рақамдан иборат бўлсин, масалан +998 90 123 45 67.';

  const email = str(input.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Email нотўғри.';

  const instagram = url(input.instagram, /(^|\.)instagram\.com$/);
  if (instagram === null) errors.instagram = 'Instagram ҳаволаси instagram.com билан бўлсин.';
  const youtube = url(input.youtube, /(^|\.)(youtube\.com|youtu\.be)$/);
  if (youtube === null) errors.youtube = 'YouTube ҳаволаси youtube.com билан бўлсин.';
  const facebook = url(input.facebook, /(^|\.)(facebook\.com|fb\.com)$/);
  if (facebook === null) errors.facebook = 'Facebook ҳаволаси facebook.com билан бўлсин.';

  const years = int(input.years, 0, 100);
  if (years === null) errors.years = '0 дан 100 гача бутун сон.';
  const events = int(input.events, 0, 1_000_000);
  if (events === null) errors.events = 'Бутун сон.';
  const followers = int(input.followers, 0, 1_000_000);
  if (followers === null) errors.followers = 'Бутун сон (мингларда).';

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      telegram, phone, email,
      instagram: instagram!, youtube: youtube!, facebook: facebook!,
      years: years!, events: events!, followers: followers!,
      showDateCheck: input.showDateCheck === true,
    },
  };
}

// ---------- GitHub ----------

const b64encode = (text: string) => {
  const bytes = enc.encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};
const b64decode = (b64: string) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\n/g, '')), (c) => c.charCodeAt(0)));

function gh(env: Env, path: string, init: RequestInit = {}) {
  const api = (env.GITHUB_API || 'https://api.github.com').replace(/\/$/, '');
  return fetch(`${api}/repos/${env.GITHUB_REPO || 'minimalluz/qunduzxon.uz'}/contents/${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${env.GITHUB_TOKEN}`,
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
      'user-agent': 'qunduzxon-admin',
      ...(init.body ? { 'content-type': 'application/json' } : {}),
    },
  });
}
const branch = (env: Env) => env.GITHUB_BRANCH || 'redesign';

/** Файлни GitHub'дан ўқиш: мазмуни ва версияси (sha) */
export async function readFile(env: Env, path: string) {
  const r = await gh(env, `${path}?ref=${encodeURIComponent(branch(env))}`);
  if (!r.ok) throw new Error(`github_read_${r.status}`);
  const j = (await r.json()) as { content: string; sha: string };
  return { text: b64decode(j.content), sha: j.sha };
}

/** Файлни GitHub'га ёзиш (коммит). sha эскирган бўлса — 'conflict' */
export async function writeFile(env: Env, path: string, text: string, sha: string, message: string) {
  const r = await gh(env, path, {
    method: 'PUT',
    body: JSON.stringify({ message, content: b64encode(text), sha, branch: branch(env) }),
  });
  if (r.status === 409 || r.status === 422) return { ok: false as const, error: 'conflict' };
  if (!r.ok) throw new Error(`github_write_${r.status}`);
  const j = (await r.json()) as { content: { sha: string } };
  return { ok: true as const, sha: j.content.sha };
}
