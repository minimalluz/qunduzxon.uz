# qunduzxon.uz — Astro сайти

Astro 5 + Tailwind CSS 4, Cloudflare Pages учун. Икки тил: ўзбек тили, кирилл ёзувида (`/uz/`) ва рус тили (`/ru/`). Ҳар бир `/uz/...` саҳифасининг `/ru/...` жуфти бор (манзиллар бир хил, фақат тил префикси фарқ қилади).

## Ишга тушириш

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ папкасига
```

Ишлаб чиқишда видеолар `PUBLIC_VIDEO_BASE` манзилидан олинади (`.env.development`): лойиҳа илдизида `python -m http.server 8080` ишлаб турса, `video/` папкасидаги файллар ўйнайди.

## Cloudflare Pages созламалари

| Майдон | Қиймат |
| --- | --- |
| Root directory | `site` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | ҳозирча `redesign` (тайёр бўлгач — асосий) |

Environment variables:

| Ном | Тур | Нима |
| --- | --- | --- |
| `PUBLIC_VIDEO_BASE` | оддий | R2'даги видеолар манзили, масалан `https://media.qunduzxon.uz/video` |
| `PUBLIC_TURNSTILE_SITE_KEY` | оддий | Turnstile site key |
| `TELEGRAM_BOT_TOKEN` | **Secret** | @BotFather токени |
| `TELEGRAM_CHAT_ID` | **Secret** | Аризалар келадиган гуруҳ ID |
| `TURNSTILE_SECRET` | **Secret** | Turnstile secret key |
| `SANITY_PROJECT_ID` | оддий | Sanity лойиҳаси ID. Берилса, созламалар, отзивлар ва ҳамкорлар админ панелдан олинади |
| `SANITY_DATASET` | оддий | `production` (берилмаса ҳам шу) |

Аризалар `functions/api/lead.ts` (Pages Function) орқали Telegram'га боради.

## Тузилма

| Йўл | Саҳифа |
| --- | --- |
| `/uz/` | Бош саҳифа |
| `/uz/about/` | Мен ҳақимда |
| `/uz/onam/` | Менинг онам |
| `/uz/boshlovchi/` + 3 та ички саҳифа | Тўй ва тантаналар, Корпоратив, ТВ/радио/овоз |
| `/uz/food-blog/`, `/uz/food-blog/[slug]/` | Фуд-блог каталоги ва шарҳлар (`src/content/reviews/*.md`) |
| `/uz/hamkorlik/` | Media-Kit |
| `/uz/media/` | Галерея (филтр + lightbox) |
| `/uz/band-qilish/` | Ариза саҳифаси — **вақтинча ўчиқ** (менюда йўқ, noindex) |
| `/uz/privacy-policy/` | Махфийлик сиёсати |
| `/admin` | Админ панелга йўналтириш (`public/_redirects`) |
| `/ru/...` | Юқоридаги ҳамма саҳифаларнинг рус тилидаги нусхаси (масалан `/ru/about/`, `/ru/boshlovchi/toy-va-tantanalar/`) |

Созламалар битта жойда: `src/config.ts` (Telegram, телефон, ижтимоий тармоқлар, рақамлар, меню).

## Админ панел (Sanity)

Йўриқнома ва созлаш қадамлари: [`../studio/README.md`](../studio/README.md). Манзил: qunduzxon.uz/admin.

- `SANITY_PROJECT_ID` **йўқ** бўлса — сайт ҳозиргидек файллардан ишлайди (`src/config.ts`).
- **Бор** бўлса — build пайтида Sanity'дан олинади (`src/lib/cms.ts`): «Сайт созламалари» (бўш майдон учун `config.ts` даги қиймат), отзивлар (хизмат саҳифаларида), ҳамкорлар (бош саҳифада). Фақат эълон қилинган (Publish) ҳужжатлар.
- Фуд-блог шарҳлари админ панелда **йўқ** — доим `src/content/reviews*` файлларидан.
- Sanity'га уланиб бўлмаса, build хато билан тўхтайди — эски сайт ишлаб тураверади.
- Расмлар Sanity CDN'дан ўлчами ўзгартирилиб олинади (`src/components/Pic.astro`), фокус нуқтаси (hotspot) ҳисобга олинади.
- Маҳаллий текширув учун mock-сервер: `SANITY_PROJECT_ID=test SANITY_API_URL=http://localhost:5555 npm run build`.

## Икки тил қандай ишлайди

| Файл | Нима |
| --- | --- |
| `src/i18n.ts` | Умумий матнлар: рус тилидаги меню, футер, форма, рақамлар, роллар, тугмалар. Ўзбекча меню, рақамлар ва йўналишлар `src/config.ts` дан олинади |
| `src/views/*.astro` | Саҳифа шаблонлари. Ҳар бирида `T = { uz: {...}, ru: {...} }` — шу саҳифанинг икки тилдаги матни. Белгилаш ва стил битта, шунинг учун икки тил бир-биридан ажралиб кетмайди |
| `src/pages/uz/*`, `src/pages/ru/*` | Икки қаторлик ўровчилар: `<About lang="ru" />` |
| `src/pages/*/boshlovchi/*.astro` | Хизмат саҳифалари: матнлар props'да, ҳар тилга алоҳида файл (`ServicePage` компоненти умумий) |
| `src/content/reviews-ru/*.md` | Фуд-блог шарҳларининг рус тилидаги матни (сарлавҳа, хулоса, шаҳар, манзил, тана). Файл номи ўзбекча шарҳ билан бир хил; баллар, расм, видео, нарх ва иш вақти ўзбекча файлдан олинади. Таржимаси йўқ шарҳ `/ru/` да чиқмайди |
| `src/layouts/Base.astro` → `RU_PAGES` | Рус тилидаги саҳифалар рўйхати. Шу рўйхат бўйича `hreflang` (uz-Cyrl / ru / x-default) ва тил алмаштиргич ишлайди: жуфти бор бўлса — шу саҳифанинг таржимасига, бўлмаса — бош саҳифага |

Янги саҳифа қўшилганда: шаблонни `src/views/` га ёзинг (иккала тил матни билан), `src/pages/uz/` ва `src/pages/ru/` га ўровчи қўйинг ва `RU_PAGES` га манзилни қўшинг.

Форма йўналишларининг қиймати (`toy`, `korporativ`, `food`, `tv`) иккала тилда бир хил — Telegram'га ўзбекча ёзув билан боради; аризанинг тили «Саҳифа» қаторидаги манзилдан (`/ru/...`) кўринади.

`/ru/band-qilish/` ҳам `/uz/band-qilish/` каби вақтинча ўчиқ (noindex, robots.txt, sitemap).

## Эгадан кутилаётган маълумотлар

- [ ] Sanity лойиҳасини очиш ва улаш (`studio/README.md`, «Созлаш»)
- [ ] Telegram username ва телефон рақам → админ панел «Сайт созламалари» (ёки `src/config.ts`)
- [x] Instagram ва Facebook (`facebook.com/qunduzxon.abdullayeva`) → `src/config.ts`
- [ ] YouTube ҳаволаси (TikTok йўқ) → админ панел «Сайт созламалари»
- [ ] Ўз сўзлари билан биография, йиллар, мукофотлар → `src/views/About.astro` (иккала тилда)
- [ ] Ҳақиқий фуд-блог шарҳлари (матн, баллар, манзил) → `src/content/reviews/` ва `src/content/reviews-ru/` (`sample: true` ни олиб ташлаш)
- [ ] Ҳамкорлар логотиплари → бош саҳифа
- [ ] Ижтимоий тармоқлар статистикаси → `/uz/hamkorlik/`
- [ ] Аудио демолар (3–4 та) → бош саҳифа «Овозимни тингланг»
- [ ] Отзивлар → тўй саҳифаси
- [ ] Видеолар R2'га юклангач `PUBLIC_VIDEO_BASE`
- [ ] Махфийлик сиёсати матнини текшириш
- [ ] Рус тилидаги матнларни она тили рус бўлган муҳаррир ёки сайт эгаси кўриб чиқиши (таржима ўзбекча матн асосида, янги факт қўшилмаган)
- [ ] Ҳақиқий шарҳлар келганда рус тилидаги матнини ҳам `src/content/reviews-ru/` га қўшиш

## Очиқ манбалардан олинган фактлар (тасдиқлаш керак)

`/uz/about/` ва `/ru/about/` саҳифаларида ишлатилган:

| Факт | Манба |
| --- | --- |
| Теле ва радио бошловчи, нотиқ; бир қанча телеканал ва радиоларда ишлаган; «Севимли» телеканалида бошловчи (2025 йил август) | [afisha.uz, 2025-08-20](https://www.afisha.uz/uz/celebrities/2025/08/20/qarindoshlar) |
| Фарғонада туғилиб ўсган | [zamin.uz, 2022](https://zamin.uz/uz/madaniyat/99217-arindosh-jekanini-kpchilik-bilmajdigan-zbek-sanatkorlari-foto.html); «Севимли»да ишлаши — яна [zamin.uz, 2025-08-25](https://zamin.uz/en/culture/158432-artistic-talent-passed-down-from-generation-to-generation-famous-relatives-in-uzbek-media.html) |
| «Миллий» телеканали ва «Ёшлар» радиоси бошловчиси; ТДШУ журналистика талабаларига маҳорат дарси | [t.me/tsuos/6157](https://t.me/tsuos/6157), [t.me/tsuos/6159](https://t.me/tsuos/6159) |
| Milliy TV'нинг «Ширчой» тонгги кўрсатуви бошловчиларидан бири (Дилниёз билан); пост санаси номаълум. Сайтга 2026-11-08 да қўшилди | [Milliy.TV Telegram](https://t.me/s/milliytv?before=1495), [milliy.tv — Ширчой](http://milliy.tv/en/shirchoy.html) |
| Журналистика талабаларига телерадио бўйича сабоқ берувчилар қаторида | [uza.uz](https://uza.uz/en/posts/sozi-va-qalami-otkir-zhurnalistlarni-tayyorlash-bugungi-davr-talabi_601460) |
| Hit FM ва 90.8 FM эфирлари | Расм ва видео файл номларидан |

Шахсий ҳаёт ҳақидаги мақолалар (масалан, daryo.uz 2026-08-17 интервьюси) сайтга атайлаб киритилмади.

### Сайтда ҳали ишлатилмаган топилмалар (2026-11-08 қидирув)

Қидирув натижаларидан йиғилган, саҳифаларнинг ўзи очиб текширилмаган. Сайтга қўйишдан олдин эгаси тасдиқлаши керак.

| Топилма | Манба | Ишончлилик |
| --- | --- | --- |
| «Севимли»да «Bollivud battl» рукнида чиқиш | [Sevimli TV Telegram](https://t.me/s/tvsevimli?after=24038) | Ўртача |
| «Авторадио» радиобошловчиси деб кўрсатилган | Тадбир иштирокчилари рўйхати (api.society.uz, PDF; очилмади, санаси номаълум) | Паст |
| Севара Назархон билан қариндош: манбаларда «холаси» ҳам, «cousin» ҳам дейилган | [afisha.uz](https://www.afisha.uz/uz/celebrities/2025/08/20/qarindoshlar), [zamin.uz](https://zamin.uz/en/culture/158432-artistic-talent-passed-down-from-generation-to-generation-famous-relatives-in-uzbek-media.html) | Зид — эгасидан сўраш |

Сайтга **қўйилмасин**:
- «Миллий академик театрда 2003 йилдан адабий эмакдош» — тасдиқловчи манба топилмади, эҳтимол бошқа одам.
- 2026 йилги давлат мукофотлари рўйхатларида номи кўринмади (рўйхатлар тўлиқ очиб текширилмади).

Instagram: [@qunduzxon_abdullayeva](https://www.instagram.com/qunduzxon_abdullayeva/) — эгаси томондан берилган (2026-11-08), `src/config.ts` да. Milliy TV постидаги `@qunduzhon_abdullayeva_fm_mtv` бошқа (эски) аккаунт бўлиши мумкин.

Эгасидан сўраш: ҳозир қайси каналда ишлаши, Авторадио ва Hit FM'да ишлаганми, йиллари билан тўлиқ иш тарихи.
