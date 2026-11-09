export const languages = { uz: 'Ўзбекча', ru: 'Русский' } as const;
export type Lang = keyof typeof languages;
export const langs = Object.keys(languages) as Lang[];
export const defaultLang: Lang = 'uz';

export const ui = {
  uz: {
    'site.name': 'Қундузхон Абдуллаева',
    'site.roles': 'Теле-радио бошловчи · Тантаналар бошловчиси · Фуд-блогер',
    'site.description':
      'Қундузхон Абдуллаева — теле ва радио бошловчи, тўй ва корпоратив тадбирлар бошловчиси, фуд-блогер. Санани банд қилинг ёки ҳамкорлик таклиф қилинг.',

    'nav.home': 'Бош саҳифа',
    'nav.about': 'Мен ҳақимда',
    'nav.services': 'Бошловчилик',
    'nav.toy': 'Тўй ва тантаналар',
    'nav.korporativ': 'Корпоратив тадбирлар',
    'nav.tv': 'ТВ, Радио, Овоз',
    'nav.food': 'Фуд-блог',
    'nav.partner': 'Ҳамкорлик',
    'nav.media': 'Медиа',
    'nav.onam': 'Менинг онам',
    'nav.contact': 'Алоқа',
    'nav.book': 'Банд қилиш',
    'nav.menu': 'Меню',
    'nav.close': 'Ёпиш',
    'nav.theme': 'Тунги / кундузги режим',
    'nav.lang': 'Тилни алмаштириш',
    'nav.skip': 'Асосий мазмунга ўтиш',

    'hero.eyebrow': 'Расмий сайт',
    'hero.cta.book': 'Тадбир учун банд қилиш',
    'hero.cta.food': 'Реклама / Фуд-блог',
    'hero.role.tv': 'Теле-радио бошловчи',
    'hero.role.mc': 'Тантаналар бошловчиси',
    'hero.role.food': 'Фуд-блогер',
    'hero.sound.on': 'Овозни ёқиш',
    'hero.sound.off': 'Овозни ўчириш',

    'dir.title': 'Йўналишлар',
    'dir.lead': 'Эфирдан тўйгача, саҳнадан ресторан столигача — ҳар бир ишда самимийлик ва профессионализм.',
    'dir.toy.title': 'Тўй ва тантаналар',
    'dir.toy.text': 'Миллий анъана ва замонавий услуб, икки тилда, ҳиссиётга бой кеча.',
    'dir.tv.title': 'ТВ, Радио ва Корпоративлар',
    'dir.tv.text': 'Эфир тажрибаси, расмий тадбирлар, тақдимотлар ва дикторлик.',
    'dir.food.title': 'Фуд-блог ва ресторанлар шарҳи',
    'dir.food.text': 'Холис видео-обзорлар ва рейтинглар.',
    'more': 'Батафсил',

    'stats.title': 'Рақамларда',
    'stats.years': 'йил эфирда',
    'stats.events': 'ўтказилган тадбир',
    'stats.restaurants': 'шарҳланган ресторан',
    'stats.followers': 'обуначи',

    'audio.title': 'Овозимни тингланг',
    'audio.lead': 'Турли услубдаги қисқа демолар — тўйдан реклама роликигача.',
    'audio.play': 'Ўйнатиш',
    'audio.pause': 'Тўхтатиш',
    'audio.soon': 'Демо тез орада',

    'cases.title': 'Танланган видео-кейслар',
    'cases.all': 'Барча ишлар',
    'video.play': 'Видеони ўйнатиш',

    'food.latest': 'Фуд-блогдан сўнгги шарҳлар',
    'food.all': 'Барча шарҳларни кўриш',
    'food.title': 'Фуд-блог',
    // Саҳифа сарлавҳаси остидаги матн: бўш бўлса, кўрсатилмайди
    'food.lead': '',
    'food.search': 'Ресторан номи бўйича қидириш',
    'food.cuisine': 'Ошхона',
    'food.city': 'Шаҳар / туман',
    'food.sort': 'Саралаш',
    'food.sort.new': 'Энг янги',
    'food.sort.rating': 'Энг юқори балл',
    'food.sort.cheap': 'Арзонроқ чек',
    'food.all.cuisine': 'Барчаси',
    'food.empty': 'Ҳеч нарса топилмади. Фильтрларни ўзгартириб кўринг.',
    'food.check': 'Ўртача чек',
    'food.rating': 'Рейтинг',
    'food.rating.taste': 'Таом мазаси',
    'food.rating.service': 'Хизмат кўрсатиш',
    'food.rating.interior': 'Интерьер / Муҳит',
    'food.rating.value': 'Нарх ва сифат',
    'food.rating.total': 'Умумий балл',
    'food.info': 'Фойдали маълумот',
    'food.address': 'Манзил',
    'food.hours': 'Иш вақти',
    'food.map': 'Харитада очиш',
    'food.similar': 'Ўхшаш ресторанлар',
    'food.share': 'Улашиш',
    'food.gallery': 'Фотогалерея',
    'food.sum': 'сўм',
    'food.review': 'Шарҳ',
    'cuisine.milliy': 'Миллий',
    'cuisine.evropa': 'Европа',
    'cuisine.turk': 'Турк',
    'cuisine.osiyo': 'Осиё',
    'cuisine.fastfood': 'Fast-food',
    'cuisine.kofe': 'Қаҳвахона',

    'partners.title': 'Менга ишонишади',

    'quick.title': 'Бўш санани текширинг',
    'quick.lead': 'Санани ва телефонингизни қолдиринг — 15 дақиқа ичида жавоб берамиз.',

    'form.purpose': 'Мурожаат мақсади',
    'form.purpose.toy': 'Тўй / Тантана',
    'form.purpose.korporativ': 'Корпоратив / Очилиш',
    'form.purpose.food': 'Фуд-обзор / Реклама',
    'form.purpose.tv': 'ТВ / Дикторлик',
    'form.date': 'Тадбир санаси',
    'form.name': 'Исмингиз',
    'form.phone': 'Телефон рақам',
    'form.company': 'Компания / Ресторан номи',
    'form.comment': 'Қўшимча изоҳ (ихтиёрий)',
    'form.submit': 'Юбориш',
    'form.check': 'Санани текшириш',
    'form.sending': 'Юборилмоқда…',
    'form.success': 'Раҳмат! Аризангиз қабул қилинди. Тез орада боғланамиз.',
    'form.error': 'Хатолик юз берди. Илтимос, қайта уриниб кўринг ёки Telegram орқали ёзинг.',
    'form.invalidPhone': 'Телефон рақамни тўлиқ киритинг',
    'form.consent': 'Юбориш тугмасини босиб, сиз',
    'form.consentLink': 'махфийлик сиёсатига',
    'form.consentEnd': 'розилик билдирасиз.',

    'footer.bio':
      'Теле ва радио бошловчи, тўй ва корпоратив тадбирлар бошловчиси, фуд-блогер. Тошкент, Ўзбекистон.',
    'footer.links': 'Бўлимлар',
    'footer.contact': 'Алоқа',
    'footer.rights': 'Барча ҳуқуқлар ҳимояланган.',
    'footer.privacy': 'Махфийлик сиёсати',

    'about.title': 'Мен ҳақимда',
    'about.lead': 'Эфир, саҳна ва таъмлар ҳақидаги ҳикоям.',
    'about.timeline': 'Фаолият тарихи',
    'about.values': 'Ишлаш қадриятларим',
    'about.awards': 'Ютуқлар ва ОАВдаги чиқишлар',

    'services.title': 'Бошловчилик хизматлари',
    'services.lead': 'Тўй, корпоратив тадбир ёки эфир — ҳар бир йўналиш учун алоҳида ёндашув.',
    'services.style': 'Услубим',
    'services.steps': 'Ишлаш босқичлари',
    'services.reviews': 'Мижозлар фикрлари',
    'services.faq': 'Кўп бериладиган саволлар',
    'services.gallery': 'Ишлардан лавҳалар',
    'services.book': 'Санани банд қилиш',

    'partner.title': 'Реклама ва ҳамкорлик',
    'partner.lead': 'Ресторан эгалари ва брендлар учун Media-Kit: аудитория, қамров ва ҳамкорлик пакетлари.',
    'partner.stats': 'Аудитория',
    'partner.packages': 'Ҳамкорлик пакетлари',
    'partner.cases': 'Натижалар',
    'partner.download': 'Media-Kit (PDF) юклаб олиш',
    'partner.request': 'Ҳамкорлик сўрови',

    'media.title': 'Медиа галерея',
    'media.lead': 'Тўйлар, эфирлар ва фуд-блогдан фото ва видео лавҳалар.',
    'media.all': 'Барчаси',
    'media.toy': 'Тўйлар',
    'media.tv': 'ТВ ва Радио',
    'media.korporativ': 'Корпоратив',
    'media.food': 'Фуд-блог',
    'media.lifestyle': 'Лайфстайл',

    'book.title': 'Санани банд қилиш ва алоқа',
    'book.lead': 'Аризани қолдиринг — маъмурим сиз билан тез орада боғланади.',
    'book.direct': 'Тўғридан-тўғри боғланиш',
    'book.admin': 'Маъмур',

    'privacy.title': 'Махфийлик сиёсати',

    'onam.about': 'Онам ҳақида',
    'onam.gallery': 'Хотиралар галереяси',
    'onam.galleryLead': 'Онам билан энг қимматли лаҳзаларим',
    'onam.videos': 'Видео хотиралар',
    'onam.videosLead': 'Онам билан бирга бўлган лаҳзалар',

    '404.title': 'Саҳифа топилмади',
    '404.text': 'Кечирасиз, бу саҳифа мавжуд эмас ёки кўчирилган.',
    '404.home': 'Бош саҳифага қайтиш',

    'crumbs.home': 'Бош саҳифа',
  },
  ru: {
    'site.name': 'Кундузхон Абдуллаева',
    'site.roles': 'Теле- и радиоведущая · Ведущая торжеств · Фуд-блогер',
    'site.description':
      'Кундузхон Абдуллаева — теле- и радиоведущая, ведущая свадеб и корпоративов, фуд-блогер. Забронируйте дату или предложите сотрудничество.',

    'nav.home': 'Главная',
    'nav.about': 'Обо мне',
    'nav.services': 'Ведущая',
    'nav.toy': 'Свадьбы и торжества',
    'nav.korporativ': 'Корпоративы',
    'nav.tv': 'ТВ, Радио, Голос',
    'nav.food': 'Фуд-блог',
    'nav.partner': 'Сотрудничество',
    'nav.media': 'Медиа',
    'nav.onam': 'Моя мама',
    'nav.contact': 'Контакты',
    'nav.book': 'Забронировать',
    'nav.menu': 'Меню',
    'nav.close': 'Закрыть',
    'nav.theme': 'Тёмная / светлая тема',
    'nav.lang': 'Сменить язык',
    'nav.skip': 'Перейти к содержимому',

    'hero.eyebrow': 'Официальный сайт',
    'hero.cta.book': 'Забронировать на мероприятие',
    'hero.cta.food': 'Реклама / Фуд-блог',
    'hero.role.tv': 'Теле- и радиоведущая',
    'hero.role.mc': 'Ведущая торжеств',
    'hero.role.food': 'Фуд-блогер',
    'hero.sound.on': 'Включить звук',
    'hero.sound.off': 'Выключить звук',

    'dir.title': 'Направления',
    'dir.lead': 'От эфира до свадьбы, от сцены до ресторанного стола — искренность и профессионализм во всём.',
    'dir.toy.title': 'Свадьбы и торжества',
    'dir.toy.text': 'Национальные традиции и современный стиль, на двух языках, вечер, полный эмоций.',
    'dir.tv.title': 'ТВ, Радио и Корпоративы',
    'dir.tv.text': 'Эфирный опыт, официальные мероприятия, презентации и дикторская работа.',
    'dir.food.title': 'Фуд-блог и обзоры ресторанов',
    'dir.food.text': 'Честные видеообзоры и рейтинги.',
    'more': 'Подробнее',

    'stats.title': 'В цифрах',
    'stats.years': 'лет в эфире',
    'stats.events': 'проведённых мероприятий',
    'stats.restaurants': 'ресторанов в обзорах',
    'stats.followers': 'подписчиков',

    'audio.title': 'Послушайте мой голос',
    'audio.lead': 'Короткие демо в разных стилях — от свадьбы до рекламного ролика.',
    'audio.play': 'Воспроизвести',
    'audio.pause': 'Пауза',
    'audio.soon': 'Демо скоро',

    'cases.title': 'Избранные видео-кейсы',
    'cases.all': 'Все работы',
    'video.play': 'Смотреть видео',

    'food.latest': 'Последние обзоры из фуд-блога',
    'food.all': 'Смотреть все обзоры',
    'food.title': 'Фуд-блог',
    'food.lead': '',
    'food.search': 'Поиск по названию ресторана',
    'food.cuisine': 'Кухня',
    'food.city': 'Город / район',
    'food.sort': 'Сортировка',
    'food.sort.new': 'Сначала новые',
    'food.sort.rating': 'Высший балл',
    'food.sort.cheap': 'Дешевле чек',
    'food.all.cuisine': 'Все',
    'food.empty': 'Ничего не найдено. Попробуйте изменить фильтры.',
    'food.check': 'Средний чек',
    'food.rating': 'Рейтинг',
    'food.rating.taste': 'Вкус блюд',
    'food.rating.service': 'Обслуживание',
    'food.rating.interior': 'Интерьер / Атмосфера',
    'food.rating.value': 'Цена и качество',
    'food.rating.total': 'Общий балл',
    'food.info': 'Полезная информация',
    'food.address': 'Адрес',
    'food.hours': 'Время работы',
    'food.map': 'Открыть на карте',
    'food.similar': 'Похожие рестораны',
    'food.share': 'Поделиться',
    'food.gallery': 'Фотогалерея',
    'food.sum': 'сум',
    'food.review': 'Обзор',
    'cuisine.milliy': 'Национальная',
    'cuisine.evropa': 'Европейская',
    'cuisine.turk': 'Турецкая',
    'cuisine.osiyo': 'Азиатская',
    'cuisine.fastfood': 'Fast-food',
    'cuisine.kofe': 'Кофейня',

    'partners.title': 'Мне доверяют',

    'quick.title': 'Проверьте свободную дату',
    'quick.lead': 'Оставьте дату и телефон — ответим в течение 15 минут.',

    'form.purpose': 'Цель обращения',
    'form.purpose.toy': 'Свадьба / Торжество',
    'form.purpose.korporativ': 'Корпоратив / Открытие',
    'form.purpose.food': 'Фуд-обзор / Реклама',
    'form.purpose.tv': 'ТВ / Озвучка',
    'form.date': 'Дата мероприятия',
    'form.name': 'Ваше имя',
    'form.phone': 'Номер телефона',
    'form.company': 'Компания / Ресторан',
    'form.comment': 'Комментарий (необязательно)',
    'form.submit': 'Отправить',
    'form.check': 'Проверить дату',
    'form.sending': 'Отправка…',
    'form.success': 'Спасибо! Заявка принята. Мы скоро свяжемся с вами.',
    'form.error': 'Произошла ошибка. Попробуйте ещё раз или напишите в Telegram.',
    'form.invalidPhone': 'Введите номер телефона полностью',
    'form.consent': 'Нажимая «Отправить», вы соглашаетесь с',
    'form.consentLink': 'политикой конфиденциальности',
    'form.consentEnd': '.',

    'footer.bio': 'Теле- и радиоведущая, ведущая свадеб и корпоративов, фуд-блогер. Ташкент, Узбекистан.',
    'footer.links': 'Разделы',
    'footer.contact': 'Контакты',
    'footer.rights': 'Все права защищены.',
    'footer.privacy': 'Политика конфиденциальности',

    'about.title': 'Обо мне',
    'about.lead': 'Моя история об эфире, сцене и вкусах.',
    'about.timeline': 'История карьеры',
    'about.values': 'Мои принципы работы',
    'about.awards': 'Достижения и публикации в СМИ',

    'services.title': 'Услуги ведущей',
    'services.lead': 'Свадьба, корпоратив или эфир — отдельный подход к каждому направлению.',
    'services.style': 'Мой стиль',
    'services.steps': 'Этапы работы',
    'services.reviews': 'Отзывы клиентов',
    'services.faq': 'Частые вопросы',
    'services.gallery': 'Кадры из работ',
    'services.book': 'Забронировать дату',

    'partner.title': 'Реклама и сотрудничество',
    'partner.lead': 'Media-Kit для ресторанов и брендов: аудитория, охваты и пакеты сотрудничества.',
    'partner.stats': 'Аудитория',
    'partner.packages': 'Пакеты сотрудничества',
    'partner.cases': 'Результаты',
    'partner.download': 'Скачать Media-Kit (PDF)',
    'partner.request': 'Запрос на сотрудничество',

    'media.title': 'Медиа галерея',
    'media.lead': 'Фото и видео со свадеб, эфиров и фуд-блога.',
    'media.all': 'Все',
    'media.toy': 'Свадьбы',
    'media.tv': 'ТВ и Радио',
    'media.korporativ': 'Корпоративы',
    'media.food': 'Фуд-блог',
    'media.lifestyle': 'Лайфстайл',

    'book.title': 'Бронирование и контакты',
    'book.lead': 'Оставьте заявку — мой администратор скоро свяжется с вами.',
    'book.direct': 'Связаться напрямую',
    'book.admin': 'Администратор',

    'privacy.title': 'Политика конфиденциальности',

    'onam.about': 'О моей маме',
    'onam.gallery': 'Галерея воспоминаний',
    'onam.galleryLead': 'Самые дорогие моменты с мамой',
    'onam.videos': 'Видео-воспоминания',
    'onam.videosLead': 'Моменты, проведённые вместе с мамой',

    '404.title': 'Страница не найдена',
    '404.text': 'Извините, такой страницы нет или она была перемещена.',
    '404.home': 'Вернуться на главную',

    'crumbs.home': 'Главная',
  },
} as const;

export type UIKey = keyof (typeof ui)['uz'];

export function useT(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

/** /uz/food-blog/ kabi to'liq yo'l. path '/' bilan boshlanadi. */
export function href(lang: Lang, path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  const withSlash = p.endsWith('/') || p.includes('#') || p.includes('?') ? p : `${p}/`;
  return `/${lang}${withSlash === '/' ? '/' : withSlash}`;
}

/** Joriy URL ni boshqa tilga almashtiradi. */
export function switchLang(pathname: string, to: Lang) {
  const parts = pathname.split('/');
  if (langs.includes(parts[1] as Lang)) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join('/') || `/${to}/`;
}

export const pick = (v: { uz?: string; ru?: string } | undefined, lang: Lang) =>
  (v?.[lang] || v?.[defaultLang] || '').trim();

export const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export function formatNumber(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU').format(n).replace(/,/g, ' ');
}

export const langStaticPaths = () => langs.map((lang) => ({ params: { lang } }));
