import { config, fields, collection, singleton } from '@keystatic/core';

/**
 * Admin panel: https://qunduzxon.uz/keystatic/
 * Lokalda fayllarga yozadi, productionda esa GitHub repoga commit qiladi
 * (Cloudflare avtomatik qayta deploy qiladi).
 */

const uzru = (label: string, opts: { multiline?: boolean; required?: boolean } = {}) =>
  fields.object(
    {
      uz: fields.text({
        label: `${label} (UZ)`,
        multiline: opts.multiline,
        validation: opts.required ? { isRequired: true } : undefined,
      }),
      ru: fields.text({
        label: `${label} (RU)`,
        multiline: opts.multiline,
        validation: opts.required ? { isRequired: true } : undefined,
      }),
    },
    { label, layout: [6, 6] },
  );

const img = (label: string, dir: string, required = false) =>
  fields.image({
    label,
    directory: `src/assets/${dir}`,
    publicPath: `../../assets/${dir}/`,
    validation: { isRequired: required },
  });

const seo = fields.object(
  {
    title: uzru('SEO Title'),
    description: uzru('Meta Description', { multiline: true }),
  },
  { label: 'SEO (ixtiyoriy)' },
);

const categories = [
  { label: 'Тўй ва тантаналар', value: 'toy' },
  { label: 'Корпоратив / Очилиш', value: 'korporativ' },
  { label: 'ТВ, Радио, Дикторлик', value: 'tv' },
  { label: 'Фуд-блог', value: 'food' },
  { label: 'Лайфстайл', value: 'lifestyle' },
] as const;

const video = fields.object(
  {
    url: fields.url({
      label: 'Video havola',
      description: 'YouTube, Instagram Reels havolasi yoki CDN (R2) dagi .mp4 / .m3u8 fayl',
    }),
    vertical: fields.checkbox({ label: 'Vertikal (9:16, Reels/Shorts)', defaultValue: false }),
  },
  { label: 'Video' },
);

export default config({
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: { owner: 'minimalluz', name: 'qunduzxon.uz' } }
    : { kind: 'local' },
  ui: {
    brand: { name: 'Қундузхон — Админ' },
    navigation: {
      'Фуд-блог': ['reviews'],
      'Портфолио': ['cases', 'testimonials', 'audio'],
      'Сайт': ['partners', 'faq', 'settings', 'about', 'onam'],
    },
  },

  collections: {
    reviews: collection({
      label: 'Ресторан шарҳлари',
      slugField: 'name',
      path: 'src/content/reviews/*',
      format: 'yaml',
      columns: ['name', 'publishedAt'],
      entryLayout: 'form',
      schema: {
        name: fields.slug({
          name: { label: 'Ресторан номи', validation: { isRequired: true } },
          slug: { label: 'URL (slug)', description: 'Masalan: rayhon-milliy-taomlar' },
        }),
        publishedAt: fields.date({ label: 'Сана', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        draft: fields.checkbox({ label: 'Қоралама (сайтда кўрсатилмайди)', defaultValue: false }),
        cuisine: fields.select({
          label: 'Ошхона тури',
          options: [
            { label: 'Миллий', value: 'milliy' },
            { label: 'Европа', value: 'evropa' },
            { label: 'Турк', value: 'turk' },
            { label: 'Осиё', value: 'osiyo' },
            { label: 'Fast-food', value: 'fastfood' },
            { label: 'Қаҳвахона', value: 'kofe' },
          ],
          defaultValue: 'milliy',
        }),
        city: fields.text({ label: 'Шаҳар', defaultValue: 'Тошкент' }),
        district: uzru('Туман'),
        cover: img('Асосий расм', 'reviews', true),
        coverAlt: uzru('Расм тавсифи (alt)'),
        summary: uzru('Қисқа хулоса', { multiline: true, required: true }),
        body: uzru('Шарҳ матни (абзацлар орасида бўш қатор)', { multiline: true }),
        gallery: fields.array(img('Расм', 'reviews'), { label: 'Фотогалерея' }),
        video,
        videoPoster: img('Видео муқоваси', 'reviews'),
        rating: fields.object(
          {
            taste: fields.number({ label: 'Таом мазаси', validation: { min: 1, max: 10, isRequired: true }, defaultValue: 8 }),
            service: fields.number({ label: 'Хизмат', validation: { min: 1, max: 10, isRequired: true }, defaultValue: 8 }),
            interior: fields.number({ label: 'Интерьер / Муҳит', validation: { min: 1, max: 10, isRequired: true }, defaultValue: 8 }),
            value: fields.number({ label: 'Нарх / Сифат', validation: { min: 1, max: 10, isRequired: true }, defaultValue: 8 }),
          },
          { label: 'Рейтинг (10 баллик)', layout: [3, 3, 3, 3] },
        ),
        avgCheck: fields.integer({ label: 'Ўртача чек (сўм, 1 киши)', defaultValue: 150000 }),
        address: uzru('Манзил'),
        mapUrl: fields.url({ label: 'Google/Yandex харита ҳаволаси' }),
        hours: fields.text({ label: 'Иш вақти', defaultValue: '10:00 – 23:00' }),
        phone: fields.text({ label: 'Ресторан телефони' }),
        seo,
      },
    }),

    cases: collection({
      label: 'Медиа ва видео-кейслар',
      slugField: 'title',
      path: 'src/content/cases/*',
      format: 'yaml',
      schema: {
        title: fields.slug({ name: { label: 'Сарлавҳа (UZ)', validation: { isRequired: true } } }),
        titleRu: fields.text({ label: 'Сарлавҳа (RU)' }),
        category: fields.select({ label: 'Йўналиш', options: categories, defaultValue: 'toy' }),
        image: img('Расм / превью', 'media', true),
        video,
        featured: fields.checkbox({ label: 'Бош саҳифада кўрсатиш', defaultValue: false }),
        date: fields.date({ label: 'Сана', defaultValue: { kind: 'today' } }),
        order: fields.integer({ label: 'Тартиб', defaultValue: 0 }),
      },
    }),

    testimonials: collection({
      label: 'Мижозлар фикрлари',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: 'yaml',
      schema: {
        name: fields.slug({ name: { label: 'Исм' } }),
        event: uzru('Тадбир'),
        text: uzru('Фикр', { multiline: true, required: true }),
        category: fields.select({ label: 'Йўналиш', options: categories, defaultValue: 'toy' }),
      },
    }),

    audio: collection({
      label: 'Аудио-демолар',
      slugField: 'title',
      path: 'src/content/audio/*',
      format: 'yaml',
      schema: {
        title: fields.slug({ name: { label: 'Номи (UZ)' } }),
        titleRu: fields.text({ label: 'Номи (RU)' }),
        style: uzru('Услуб тавсифи'),
        file: fields.file({
          label: 'Аудио файл (MP3/AAC/Opus, 15–30 сония)',
          directory: 'public/audio',
          publicPath: '/audio/',
        }),
        order: fields.integer({ label: 'Тартиб', defaultValue: 0 }),
      },
    }),

    partners: collection({
      label: 'Ҳамкорлар',
      slugField: 'name',
      path: 'src/content/partners/*',
      format: 'yaml',
      schema: {
        name: fields.slug({ name: { label: 'Номи' } }),
        logo: img('Логотип (SVG/PNG)', 'partners'),
        url: fields.url({ label: 'Сайт' }),
        order: fields.integer({ label: 'Тартиб', defaultValue: 0 }),
      },
    }),

    faq: collection({
      label: 'Савол-жавоблар (FAQ)',
      slugField: 'question',
      path: 'src/content/faq/*',
      format: 'yaml',
      schema: {
        question: fields.slug({ name: { label: 'Савол (UZ)' } }),
        questionRu: fields.text({ label: 'Савол (RU)' }),
        answer: uzru('Жавоб', { multiline: true }),
        service: fields.select({ label: 'Саҳифа', options: categories, defaultValue: 'toy' }),
        order: fields.integer({ label: 'Тартиб', defaultValue: 0 }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: 'Умумий созламалар',
      path: 'src/content/settings/index',
      format: 'yaml',
      schema: {
        phone: fields.text({ label: 'Телефон (асосий)' }),
        adminPhone: fields.text({ label: 'Маъмур телефони' }),
        email: fields.text({ label: 'Email' }),
        telegram: fields.url({ label: 'Telegram' }),
        instagram: fields.url({ label: 'Instagram' }),
        youtube: fields.url({ label: 'YouTube' }),
        tiktok: fields.url({ label: 'TikTok' }),
        facebook: fields.url({ label: 'Facebook' }),
        showDateCheck: fields.checkbox({
          label: '«Бўш санани текшириш» формасини кўрсатиш',
          description: 'Бош саҳифадаги ва хизмат саҳифаларидаги сана текшириш формалари. Белгиланса — сайтда кўринади.',
          defaultValue: false,
        }),
        mediaKitPdf: fields.file({ label: 'Media-Kit (PDF)', directory: 'public/files', publicPath: '/files/' }),
        showreel: fields.object(
          {
            webm: fields.url({ label: 'Showreel WebM (CDN/R2)' }),
            mp4: fields.url({ label: 'Showreel MP4 H.264 (CDN/R2)' }),
            poster: img('Муқова (poster)', 'site'),
          },
          { label: 'Hero Showreel' },
        ),
        stats: fields.object(
          {
            years: fields.integer({ label: 'Эфирдаги тажриба (йил)' }),
            events: fields.integer({ label: 'Ўтказилган тадбирлар' }),
            restaurants: fields.integer({ label: 'Шарҳланган ресторанлар' }),
            followers: fields.integer({ label: 'Умумий обуначилар' }),
          },
          { label: 'Рақамлар', layout: [3, 3, 3, 3] },
        ),
        social: fields.object(
          {
            instagramFollowers: fields.text({ label: 'Instagram обуначилар' }),
            telegramFollowers: fields.text({ label: 'Telegram обуначилар' }),
            avgReach: fields.text({ label: 'Ўртача қамров (Reels)' }),
            audienceWomen: fields.integer({ label: 'Аёллар улуши (%)' }),
            audienceAge: fields.text({ label: 'Асосий ёш гуруҳи' }),
            audienceCity: fields.text({ label: 'Асосий шаҳар' }),
          },
          { label: 'Media-Kit статистикаси' },
        ),
      },
    }),

    onam: singleton({
      label: 'Менинг онам',
      path: 'src/content/onam/index',
      format: 'yaml',
      schema: {
        cover: img('Асосий расм (ихтиёрий)', 'onam'),
        intro: uzru('Кириш матни', { multiline: true }),
        values: fields.array(uzru('Сўз'), { label: 'Калит сўзлар (Меҳр, Дуо…)', itemLabel: (p) => p.fields.uz.value }),
        quote: uzru('Иқтибос', { multiline: true }),
        story: uzru('Онам ҳақида (абзацлар орасида бўш қатор)', { multiline: true }),
        gallery: fields.array(
          fields.object({ image: img('Расм', 'onam', true), caption: uzru('Изоҳ') }),
          { label: 'Хотиралар галереяси', itemLabel: (p) => p.fields.caption.fields.uz.value || 'Расм' },
        ),
        videos: fields.array(
          fields.object({
            title: uzru('Сарлавҳа'),
            poster: img('Муқова', 'onam', true),
            url: fields.url({ label: 'Видео (YouTube/Instagram ёки /videos/….mp4)' }),
            vertical: fields.checkbox({ label: 'Вертикал (9:16)', defaultValue: true }),
          }),
          { label: 'Видео хотиралар', itemLabel: (p) => p.fields.title.fields.uz.value || 'Видео' },
        ),
        closing: fields.object({ title: uzru('Якуний сарлавҳа'), text: uzru('Якуний матн', { multiline: true }) }, { label: 'Якуний блок' }),
      },
    }),

    about: singleton({
      label: 'Мен ҳақимда',
      path: 'src/content/about/index',
      format: 'yaml',
      schema: {
        portrait: img('Портрет', 'site'),
        bio: uzru('Биография (абзацлар орасида бўш қатор)', { multiline: true }),
        timeline: fields.array(
          fields.object({
            year: fields.text({ label: 'Йил' }),
            title: uzru('Сарлавҳа'),
            text: uzru('Матн', { multiline: true }),
          }),
          { label: 'Фаолият тарихи', itemLabel: (p) => [p.fields.year.value, p.fields.title.fields.uz.value].filter(Boolean).join(' — ') },
        ),
        values: fields.array(
          fields.object({ title: uzru('Қадрият'), text: uzru('Тавсиф', { multiline: true }) }),
          { label: 'Қадриятлар', itemLabel: (p) => p.fields.title.fields.uz.value },
        ),
        awards: fields.array(
          fields.object({ image: img('Расм', 'awards'), caption: uzru('Изоҳ') }),
          { label: 'Ютуқлар ва ОАВ', itemLabel: (p) => p.fields.caption.fields.uz.value },
        ),
      },
    }),
  },
});
