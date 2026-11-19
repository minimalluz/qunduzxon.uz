# qunduzxon.uz — Қундузхон Абдуллаева расмий сайти

**Astro 7 + Tailwind CSS 4 + Keystatic CMS + Cloudflare Workers** асосидаги кўп тилли (UZ/RU), mobile-first шахсий бренд сайти.

## Тузилма

| URL | Файл |
| --- | --- |
| `/` → `/uz/` | `astro.config.mjs` (redirect) |
| `/uz/`, `/ru/` — Бош саҳифа | `src/pages/[lang]/index.astro` |
| `/about/` | `src/pages/[lang]/about.astro` |
| `/boshlovchi/` + 3 та хизмат саҳифаси | `src/pages/[lang]/boshlovchi/*` (`src/components/ServicePage.astro`) |
| `/food-blog/`, `/food-blog/[slug]/` | `src/pages/[lang]/food-blog/*` |
| `/hamkorlik/` (Media-Kit) | `src/pages/[lang]/hamkorlik.astro` |
| `/media/` | `src/pages/[lang]/media.astro` |
| `/onam/` — Менинг онам | `src/pages/[lang]/onam.astro` |
| `/band-qilish/` | `src/pages/[lang]/band-qilish.astro` |
| `/privacy-policy/` | `src/pages/[lang]/privacy-policy.astro` |
| `/api/lead/` — форма → Telegram | `src/pages/api/lead.ts` (Cloudflare Worker) |
| `/keystatic/` — админ панел | `keystatic.config.ts` |

- Интерфейс матнлари: `src/i18n/ui.ts`, хизмат саҳифалари матни: `src/i18n/services.ts`
- Контент (админкадан таҳрирланади): `src/content/**.yaml`
- Расмлар: `src/assets/**` — билд вақтида автоматик **AVIF/WebP** + `srcset` га айлантирилади
- Видеолар: `public/vsrc/*.mp4` (H.264, 720p, faststart) + `showreel.webm/mp4`. Сайтда улар `/videos/<файл>` манзили орқали очилади (`src/pages/videos/[file].ts` — iPhone/Safari учун Range/206 қўллаб-қувватлаш). Янги видео қўшилса: файлни `public/vsrc/` га солинг, админкада `/videos/<файл>.mp4` деб ёзинг.

## Локал ишга тушириш

```bash
npm install
cp .dev.vars.example .dev.vars   # Telegram/Turnstile калитлари (git'га тушмайди)
npm run dev                      # http://localhost:4321/uz/  ·  админ: /keystatic/
npm run build && npx astro preview   # Cloudflare (workerd) муҳитида production синови
npm run check                    # TypeScript текшируви
```

## Деплой (Cloudflare Workers)

1. Cloudflare аккаунтида (эгасининг шахсий аккаунти) `npx wrangler login`.
2. Махфий калитлар (кодда ёки фронтендда кўринмайди):
   ```bash
   npx wrangler secret put TELEGRAM_BOT_TOKEN     # @BotFather'дан
   npx wrangler secret put TELEGRAM_CHAT_ID       # ёпиқ гуруҳ ID (-100…); бир нечта бўлса вергул билан
   npx wrangler secret put TURNSTILE_SECRET_KEY   # Cloudflare → Turnstile
   ```
3. Билд вақтидаги очиқ ўзгарувчилар (`.env` ёки Workers Builds → **Build variables**):
   `PUBLIC_TURNSTILE_SITE_KEY=<site key>` (берилмаса Cloudflare тест калити ишлатилади — productionда албатта алмаштиринг).
4. `npm run deploy` — ёки GitHub репони Cloudflare **Workers Builds** га улаб, `main` га ҳар push'да авто-деплой (build: `npm run build`, deploy: `npx wrangler deploy`).
5. Домен: Workers → Settings → Domains → `qunduzxon.uz` ва `www.qunduzxon.uz`.

> Адаптер сессиялар учун `SESSION` KV binding'ини қўшади; Wrangler биринчи деплойда уни ўзи яратади.

### Cloudflare хавфсизлик созламалари (Dashboard)
- SSL/TLS → **Full (strict)**, Edge Certificates → **Always Use HTTPS**, **HSTS** ёқилган (`public/_headers` да ҳам бор).
- Security → **WAF** managed rules, **Bot Fight Mode**, DDoS (автоматик).
- Speed → Brotli (автоматик), **Early Hints**.

### Telegram бот
1. @BotFather → `/newbot` → токен.
2. Ботни ёпиқ гуруҳга қўшинг ва гуруҳда бирор хабар ёзинг.
3. `https://api.telegram.org/bot<TOKEN>/getUpdates` дан `chat.id` ни олинг.

Хабар формати: `🔔 Янги мурожаат! | Форма | Йўналиш | Сана | Исми | Тел | Изоҳ | Тил | Саҳифа URL`.

### Админ панел (Keystatic) — productionда
Productionда контент GitHub репога commit бўлади → Cloudflare авто-деплой қилади (1–2 дақиқа).
1. Сайт деплой бўлгач, `https://qunduzxon.uz/keystatic/` га кириб, **GitHub App** яратиш йўриқномасига амал қилинг.
2. Ҳосил бўлган қийматларни secret сифатида қўшинг: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, ҳамда билд ўзгарувчиси `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
3. Репо номи: `keystatic.config.ts` → `minimalluz/qunduzxon.uz`.

### Катта видеолар (ихтиёрий)
Ҳозирги видеолар 1.5–8 MB, Workers static assets (25 MB/файл) орқали CDN'дан узатилади. Видеолар кўпайса — **Cloudflare R2** (ёки Stream) га юклаб, админкада тўлиқ URL (`https://media.qunduzxon.uz/…mp4` / `.m3u8`) кўрсатинг.

### Аналитика / SEO
- **Cloudflare Web Analytics** (cookie'сиз) — Dashboard'дан ёқилади, кодга тегмайди.
- **Google Search Console** — домен DNS TXT орқали тасдиқланади, `https://qunduzxon.uz/sitemap-index.xml` юборилади.
- Schema.org: `Person`, `WebSite`, `Service`, `FAQPage`, `VideoObject`, `Review`+`Restaurant`, `Article`, `BreadcrumbList`, `ContactPage`.

## Ишга туширишдан олдин алмаштириш керак (намуна контент)
- `src/content/settings/index.yaml` — телефон, email, Telegram/YouTube/TikTok/Facebook ҳаволалари, статистика рақамлари.
- `src/content/reviews/*` — 3 та **намуна** ресторан шарҳи (номлар ва манзиллар ўйлаб топилган).
- `src/content/testimonials/*` — **намуна** отзивлар.
- `src/content/partners/*` — ҳамкорлар (логотиплар йўқ).
- `src/content/audio/*` — аудио-демо файллари йўқ (плеерда «Демо тез орада» кўринади).
- `src/content/about/index.yaml` — биография ва timeline (умумий матн).
- `src/content/onam/index.yaml` — суратлар ва видеолар қўшилмаган.
- `/hamkorlik/` даги «Натижалар» рақамлари — намуна.
- Media-Kit PDF — админкада «Умумий созламалар» дан юкланади.

`legacy/` — эски статик сайт (архив сифатида; деплойга кирмайди).

## Репозиторийдаги бошқа папкалар

| Папка | Нима |
| --- | --- |
| `foto/` | Асл расмлар (46 та, сиқилмаган) |
| `ona/` | «Менинг онам» учун асл расмлар |
| `eski-sayt/` | Эски Next.js сайтидан олинган расмлар |
| `legacy/` | Энг эски статик сайт (архив) |
| `docs/manbalar.md` | Сайтдаги фактлар ва манбалари (эга берган биография, очиқ манбалар, атайлаб киритилмаган шахсий маълумотлар) |

Шохчалар: `redesign` — шу сайт (ишлаб чиқиш), `live-site` — 2026-11-09 даги qunduzxon.uz нинг асл нусхаси, `main` — эски Next.js сайти (архив).
