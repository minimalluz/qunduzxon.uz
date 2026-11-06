# qunduzxon.uz — Astro сайти

Astro 5 + Tailwind CSS 4, Cloudflare Pages учун. Матнлар ўзбек тилида, кирилл ёзувида (`/uz/`); рус версияси ҳозирча фақат `/ru/` бош саҳифа.

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
| `/ru/` | Рус тилидаги бош саҳифа (вақтинча) |

Созламалар битта жойда: `src/config.ts` (Telegram, телефон, ижтимоий тармоқлар, рақамлар, меню).

## Эгадан кутилаётган маълумотлар

- [ ] Telegram username ва телефон рақам → `src/config.ts` (`TG_USER`, `PHONE`)
- [ ] Ижтимоий тармоқ ҳаволалари → `src/config.ts` (`SOCIAL`)
- [ ] Ўз сўзлари билан биография, йиллар, мукофотлар → `src/pages/uz/about.astro`
- [ ] Ҳақиқий фуд-блог шарҳлари (матн, баллар, манзил) → `src/content/reviews/` (`sample: true` ни олиб ташлаш)
- [ ] Ҳамкорлар логотиплари → бош саҳифа
- [ ] Ижтимоий тармоқлар статистикаси → `/uz/hamkorlik/`
- [ ] Аудио демолар (3–4 та) → бош саҳифа «Овозимни тингланг»
- [ ] Отзивлар → тўй саҳифаси
- [ ] Видеолар R2'га юклангач `PUBLIC_VIDEO_BASE`
- [ ] Махфийлик сиёсати матнини текшириш
- [ ] Рус тилига таржима

## Очиқ манбалардан олинган фактлар (тасдиқлаш керак)

`/uz/about/` саҳифасида ишлатилган:

| Факт | Манба |
| --- | --- |
| Теле ва радио бошловчи, нотиқ; бир қанча телеканал ва радиоларда ишлаган; «Севимли» телеканалида бошловчи (2025 йил август) | [afisha.uz, 2025-08-20](https://www.afisha.uz/uz/celebrities/2025/08/20/qarindoshlar) |
| Фарғонада туғилиб ўсган | [zamin.uz, 2022](https://zamin.uz/uz/madaniyat/99217-arindosh-jekanini-kpchilik-bilmajdigan-zbek-sanatkorlari-foto.html) |
| «Миллий» телеканали ва «Ёшлар» радиоси бошловчиси; ТДШУ журналистика талабаларига маҳорат дарси | [t.me/tsuos/6157](https://t.me/tsuos/6157), [t.me/tsuos/6159](https://t.me/tsuos/6159) |
| Журналистика талабаларига телерадио бўйича сабоқ берувчилар қаторида | [uza.uz](https://uza.uz/en/posts/sozi-va-qalami-otkir-zhurnalistlarni-tayyorlash-bugungi-davr-talabi_601460) |
| Hit FM ва 90.8 FM эфирлари | Расм ва видео файл номларидан |

Шахсий ҳаёт ҳақидаги мақолалар (масалан, daryo.uz 2026-08-17 интервьюси) сайтга атайлаб киритилмади.
