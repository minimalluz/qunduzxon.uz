# Админ панел (Sanity Studio)

Сайт матнларини код ёзмасдан ўзгартириш учун. Манзили: **qunduzxon.uz/admin** (ёки тўғридан-тўғри https://qunduzxon.sanity.studio).

Интерфейс тугмалари русча (Sanity'да ўзбекча интерфейс йўқ), майдонлар номи ўзбекча.

## Админ панелда нима бор

| Бўлим | Нима учун |
| --- | --- |
| **Сайт созламалари** | Telegram username, телефон, email, Instagram/YouTube/Facebook ҳаволалари, рақамлар (эфирда неча йил, тадбирлар, обуначилар) |
| **Отзывлар** | Мижозлар фикри — хизмат саҳифасида (масалан «Тўй ва тантаналар») кўринади |
| **Ҳамкорлар** | Бош саҳифадаги ҳамкорлар: номи, логотипи, сайти |

## Эга учун: қандай ишлатиш

### Ўзгариш киритиш

1. Чапдан бўлимни танланг (масалан **Сайт созламалари**) ва майдонларни тўлдиринг.
2. Пастдаги **Publish / Опубликовать** тугмасини босинг. Сайт 1–3 дақиқада янгиланади.

Сақланган, лекин эълон қилинмаган (Publish босилмаган) ўзгаришлар сайтда кўринмайди — бемалол қоралама қилиб туриш мумкин.

Фуд-блог шарҳлари админ панелда йўқ — улар `site/src/content/reviews/` ва `reviews-ru/` даги файлларда.

### Бошқа ишлар

- **Отзыв ёки ҳамкорни ўчириш:** уни очинг → ⋯ → Delete (Удалить). Вақтинча яшириш учун: ⋯ → Unpublish.
- **Отзыв фақат бир тилда:** русча матни бўш бўлса, отзыв фақат ўзбекча сайтда кўринади.
- **Расмни алмаштириш:** расм устида ⋯ → Replace.
- **Хато қилиб қўйсангиз:** ўнг юқорида соат белгиси (History) — олдинги ҳолатга қайтариш мумкин.

## Созлаш (бир марта, техник иш)

Ҳозир сайт маълумотни файллардан олади. Sanity уланганда — админ панелдан. Улашгунча ҳеч нарса ўзгармайди.

1. **Sanity лойиҳаси.** https://www.sanity.io/manage → Google билан кириш → **Create project** → номи `qunduzxon`, dataset `production` (public). **Project ID** ни кўчириб олинг (масалан `ab12cd34`).
2. **Project ID:** `rjdch0ch` (ёзилган — `studio/env.ts`).
3. **Админ панел жойланган:** https://qunduzxon.sanity.studio (2026-11-07). Ўзгаришлардан кейин қайта жойлаш:
   ```bash
   cd studio
   npm install
   npx sanity login
   npm run deploy
   ```
4. **Cloudflare Pages → Settings → Environment variables:**
   | Ном | Қиймат |
   | --- | --- |
   | `SANITY_PROJECT_ID` | `rjdch0ch` |
   | `SANITY_DATASET` | `production` |

   Шундан кейин сайт созламалар, отзивлар ва ҳамкорларни Sanity'дан олади.
5. **Publish босилганда сайт ўзи янгиланиши учун:**
   - Cloudflare Pages → Settings → Builds → **Deploy hooks** → Add (номи `sanity`, шохча — production шохчаси) → URL ни кўчиринг.
   - sanity.io/manage → лойиҳа → **API → Webhooks → Create webhook**: URL — шу deploy hook, Dataset — `production`, Trigger on — Create, Update, Delete, Filter — `_type in ["settings", "partner", "testimonial"]`, HTTP method — POST.
6. **Эгани таклиф қилиш:** sanity.io/manage → лойиҳа → **Members → Invite** → эганинг email'и, роли Administrator ёки Editor.

## Ишлаб чиқиш

```bash
cd studio
npm install
npm run dev        # http://localhost:3333
```

Схемалар (майдонлар): `schemas/`. Сайт томони: `site/src/lib/cms.ts` (GROQ сўровлари), `site/src/config.ts`.
Майдон номини ўзгартирсангиз, `site/src/lib/cms.ts` даги сўровларни ҳам янгиланг.
