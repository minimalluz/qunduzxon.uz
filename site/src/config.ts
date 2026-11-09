// Сайтнинг умумий созламалари.
// Алоқа, тармоқлар, рақамлар ва бўлимлар — src/data/settings.json да.
// Бу файлни админ панел (qunduzxon.uz/admin) ёзади; қўлда ўзгартирса ҳам бўлади.
import S from './data/settings.json';

export const SITE = {
  name: 'Қундузхон Абдуллаева',
  url: 'https://qunduzxon.uz',
  roles: ['Телерадио бошловчи', 'Тантаналар бошловчиси', 'Фуд-блогер'],
  description:
    'Қундузхон Абдуллаева — телерадио бошловчи, тўй ва тантаналар бошловчиси, фуд-блогер. Тадбир учун банд қилиш ва ҳамкорлик.',
};

/** Telegram username (@ belgisiz), масалан 'qunduzxon'. Бўш бўлса, тугмалар t.me га олиб боради. */
export const TG_USER: string = S.telegram || '';
export const TG_URL = TG_USER ? `https://t.me/${TG_USER}` : 'https://t.me/';

/** Телефон рақами, масалан '+998901234567'. Бўш бўлса, «Қўнғироқ» тугмаси кўринмайди. */
export const PHONE: string = S.phone || '';
/** +998901234567 → +998 (90) 123-45-67 */
export const PHONE_LABEL = PHONE
  ? PHONE.replace(/^\+998(\d{2})(\d{3})(\d{2})(\d{2})$/, '+998 ($1) $2-$3-$4')
  : '+998 (__) ___-__-__';

/**
 * «Бўш санани текшириш» формалари (бош саҳифа ва хизмат саҳифалари).
 * Админ панелда ёқилади/ўчирилади.
 */
export const SHOW_DATE_CHECK: boolean = S.showDateCheck === true;

export const EMAIL = S.email || 'info@qunduzxon.uz';

export const SOCIAL = {
  instagram: S.instagram || '',
  telegram: TG_URL,
  youtube: S.youtube || '',
  facebook: S.facebook || '',
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
  { n: S.years || 16, suffix: '', label: 'йил эфирда' },
  { n: S.events || 1000, suffix: '', label: 'га яқин тадбир' },
  { n: S.followers || 500, suffix: ' минг+', label: 'обуначи' },
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
