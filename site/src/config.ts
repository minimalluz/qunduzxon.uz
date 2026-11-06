// Сайтнинг умумий созламалари. Эга маълумот берганда шу ерни тўлдиринг.

export const SITE = {
  name: 'Қундузхон Абдуллаева',
  url: 'https://qunduzxon.uz',
  roles: ['Телерадио бошловчи', 'Тантаналар бошловчиси', 'Фуд-блогер'],
  description:
    'Қундузхон Абдуллаева — телерадио бошловчи, тўй ва тантаналар бошловчиси, фуд-блогер. Тадбир учун банд қилиш ва ҳамкорлик.',
};

/** Telegram username (@ belgisiz), масалан 'qunduzxon'. Бўш бўлса, тугмалар t.me га олиб боради. */
export const TG_USER = '';
export const TG_URL = TG_USER ? `https://t.me/${TG_USER}` : 'https://t.me/';

/** Телефон рақами, масалан '+998901234567'. Бўш бўлса, «Қўнғироқ» тугмаси кўринмайди. */
export const PHONE = '';
export const PHONE_LABEL = PHONE || '+998 (__) ___-__-__';

export const EMAIL = 'info@qunduzxon.uz';

export const SOCIAL = {
  instagram: '',
  telegram: TG_URL,
  youtube: '',
  tiktok: '',
  facebook: '',
};

/**
 * Видеолар Git'да йўқ — Cloudflare R2'да туради.
 * Ишлаб чиқишда .env.development ичидаги PUBLIC_VIDEO_BASE ишлатилади.
 */
export const VIDEO_BASE: string = import.meta.env.PUBLIC_VIDEO_BASE ?? '/video';
export const videoUrl = (file: string) => `${VIDEO_BASE.replace(/\/$/, '')}/${file}`;

/** Cloudflare Turnstile site key (очиқ калит). Бўш бўлса, виджет қўйилмайди. */
export const TURNSTILE_SITE_KEY: string = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '';

export const STATS = [
  { n: 16, suffix: '', label: 'йил эфирда' },
  { n: 1000, suffix: '', label: 'га яқин тадбир' },
  { n: 500, suffix: ' минг+', label: 'обуначи' },
];

export const NAV = [
  { href: '/uz/about/', label: 'Мен ҳақимда' },
  { href: '/uz/boshlovchi/', label: 'Бошловчи' },
  { href: '/uz/food-blog/', label: 'Фуд-блог' },
  { href: '/uz/media/', label: 'Медиа' },
  { href: '/uz/hamkorlik/', label: 'Ҳамкорлик' },
  { href: '/uz/onam/', label: 'Менинг онам' },
];

export const DIRECTIONS = [
  { value: 'toy', label: 'Тўй / тантана' },
  { value: 'korporativ', label: 'Корпоратив / очилиш' },
  { value: 'food', label: 'Фуд-обзор / реклама' },
  { value: 'tv', label: 'ТВ / дикторлик' },
];
