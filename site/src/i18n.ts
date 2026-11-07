// Икки тил учун умумий матнлар: меню, футер, формалар ва бошқа такрорланадиган қисмлар.
// Саҳифаларнинг ўз матнлари шу саҳифа файлида (`src/views/*`) ёки ServicePage props'ида.
import { SITE, NAV, STATS, DIRECTIONS } from './config';

export type Lang = 'uz' | 'ru';
export const LANGS: Lang[] = ['uz', 'ru'];

/** <html lang> ва hreflang қийматлари */
export const HTML_LANG: Record<Lang, string> = { uz: 'uz-Cyrl', ru: 'ru' };
export const OG_LOCALE: Record<Lang, string> = { uz: 'uz_UZ', ru: 'ru_RU' };

/** Тилга мос сайт номи, роллар ва тавсиф (uz — config.ts даги SITE) */
export const SITE_L: Record<Lang, { name: string; roles: string[]; description: string }> = {
  uz: { name: SITE.name, roles: SITE.roles, description: SITE.description },
  ru: {
    name: 'Кундузхон Абдуллаева',
    roles: ['Теле- и радиоведущая', 'Ведущая торжеств', 'Фуд-блогер'],
    description:
      'Кундузхон Абдуллаева — теле- и радиоведущая, ведущая свадеб и торжеств, фуд-блогер. Бронирование даты и сотрудничество.',
  },
};

/** Манзилни бошқа тилдаги жуфтига ўгириш: /uz/about/ → /ru/about/ */
export const swapLang = (path: string, to: Lang) => path.replace(/^\/(uz|ru)\//, `/${to}/`);
export const langOf = (path: string): Lang => (path.startsWith('/ru/') ? 'ru' : 'uz');
/** /uz/... ҳаволасини керакли тилга ўгириш (саҳифа ичидаги ҳаволалар учун) */
export const href = (lang: Lang, uzPath: string) => swapLang(uzPath, lang);

export const NAV_L: Record<Lang, { href: string; label: string }[]> = {
  uz: NAV,
  ru: [
    { href: '/ru/about/', label: 'Обо мне' },
    { href: '/ru/boshlovchi/', label: 'Ведущая' },
    { href: '/ru/food-blog/', label: 'Фуд-блог' },
    { href: '/ru/media/', label: 'Медиа' },
    { href: '/ru/hamkorlik/', label: 'Сотрудничество' },
    { href: '/ru/onam/', label: 'Моя мама' },
  ],
};

export const STATS_L: Record<Lang, { n: number; suffix: string; label: string }[]> = {
  uz: STATS,
  // Рақамлар ўзбекча рўйхатдан (config.ts / админ панел) олинади, фақат ёзуви русча
  ru: STATS.map((s, i) => ({ n: s.n, suffix: [s.suffix, '', ' тыс.+'][i], label: ['лет в эфире', 'мероприятий (примерно)', 'подписчиков'][i] })),
};

/** Форма йўналишлари: value бир хил (functions/api/lead.ts шуни кутади), фақат ёзуви таржима */
export const DIRECTIONS_L: Record<Lang, { value: string; label: string }[]> = {
  uz: DIRECTIONS,
  ru: [
    { value: 'toy', label: 'Свадьба / торжество' },
    { value: 'korporativ', label: 'Корпоратив / открытие' },
    { value: 'food', label: 'Фуд-обзор / реклама' },
    { value: 'tv', label: 'ТВ / дикторская работа' },
  ],
};

/** Умумий UI матнлари */
export const UI = {
  uz: {
    home: 'Бош саҳифа',
    skip: 'Асосий матнга ўтиш',
    mainMenu: 'Асосий меню',
    mobileMenu: 'Мобил меню',
    menu: 'Меню',
    langGroup: 'Тил',
    book: 'Банд қилиш',
    call: 'Қўнғироқ',
    sections: 'Бўлимлар',
    contact: 'Алоқа',
    privacy: 'Махфийлик сиёсати',
    crumbs: 'Нон ушоқлари',
    watchVideo: 'Видеони кўриш',
    sample: 'намуна',
    and: 'ва',
    // Форма
    fName: 'Исмингиз',
    fDate: 'Тадбир санаси',
    fDirection: 'Йўналиш',
    fPhone: 'Телефон',
    fComment: 'Изоҳ (ихтиёрий)',
    fSend: 'Юбориш',
    fErrPhone: 'Телефон рақамини тўлиқ киритинг.',
    fOk: 'Раҳмат! Аризангиз қабул қилинди, тез орада боғланамиз.',
    fErr: 'Юборишда хато бўлди. Илтимос, Telegram орқали ёзинг.',
  },
  ru: {
    home: 'Главная',
    skip: 'Перейти к основному содержимому',
    mainMenu: 'Главное меню',
    mobileMenu: 'Мобильное меню',
    menu: 'Меню',
    langGroup: 'Язык',
    book: 'Забронировать',
    call: 'Позвонить',
    sections: 'Разделы',
    contact: 'Контакты',
    privacy: 'Политика конфиденциальности',
    crumbs: 'Хлебные крошки',
    watchVideo: 'Смотреть видео',
    sample: 'образец',
    and: 'и',
    fName: 'Ваше имя',
    fDate: 'Дата мероприятия',
    fDirection: 'Направление',
    fPhone: 'Телефон',
    fComment: 'Комментарий (необязательно)',
    fSend: 'Отправить',
    fErrPhone: 'Введите номер телефона полностью.',
    fOk: 'Спасибо! Заявка принята, мы скоро свяжемся с вами.',
    fErr: 'Не удалось отправить. Пожалуйста, напишите в Telegram.',
  },
} satisfies Record<Lang, Record<string, string>>;
