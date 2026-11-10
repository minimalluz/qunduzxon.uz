# qunduzxon.uz — Claude учун эслатма

Фойдаланувчи билан **ўзбек тилида (кирилл)** ёзинг.

Лойиҳа тузилмаси, деплой ва созламалар — `README.md` да. Бу файлда фақат ҳолат ва қолган ишлар.

## Ҳозирги ҳолат (2026-11-05)
- Сайт **https://qunduzxon.uz** да ишлаяпти (Cloudflare Workers, Worker номи `qunduzxon-uz`).
  Cloudflare аккаунти: `qunduzxon` (account id `f2db1074cbe5cf627920f642d73c5c09`), zone id `44abf71425efa49fd03c57f2e8d38551`.
  Синов манзили: https://qunduzxon-uz.qunduzxon-uz.workers.dev
- Домен рўйхатдан ўтган жой — ahost.uz; NS → Cloudflare (`eve` / `giancarlo.ns.cloudflare.com`).
  Эски Netlify A/CNAME ёзувлари ўчирилган; `qunduzxon.uz` ва `www` — Worker custom domain (`wrangler.jsonc` → `routes`).
- Деплой: `npm run build && npx wrangler deploy` (интернет Cloudflare билан узилиб туради — `fetch failed` бўлса қайта уриниш).
- GitHub: `minimalluz/qunduzxon.uz`. Ишлаб чиқиш шохчаси — `redesign`; `live-site` — 2026-11-09 даги жонли сайт нусхаси; `main` — эски Next.js (архив).

## 2026-11-09 янгиланиши
- «Мен ҳақимда» биография ва фаолият тарихи эга берган маълумот асосида алмаштирилди (`docs/manbalar.md`); ўйлаб топилган йиллар (2017–2024) олиб ташланди, timeline'да `year` ихтиёрий.
- «Менинг онам» — онанинг ҳикояси қўшилди (эга розилиги билан). Турмуш/ажрим, отасининг касаллиги, Севара Назархон — атайлаб киритилмаган.
- Рақамлар: 16 йил, 1000 тадбир, 500 минг обуначи. TikTok йўқ (ўчирилган). Facebook: facebook.com/qunduzxon.abdullayeva.
- «Бўш санани текшириш» формалари `settings.showDateCheck` га боғланган (Keystatic → Умумий созламалар), ҳозир ўчиқ.
- Медиага Zamin FM расми қўшилди.
- Бош саҳифа ва менюга «Менинг онам» қўшилди; десктоп меню 1280px дан (ундан торда бургер).
- Шрифтлар @fontsource'дан (local провайдер) — Google Fonts'га боғлиқ эмас.
- Бош саҳифа «Овозимни тингланг»: чапда ёзиб олинган запислар, ўнгда онлайн радио (`src/components/LiveRadio.astro`). Оқим: `https://live.hitfm.uz/hitfmuz` (AAC 96 kbps, CORS очиқ; hitfm.uz сайтидан олинган). Keystatic → Умумий созламалар → «Онлайн радио»; `stream` бўш бўлса радио кўринмайди.
- Бош саҳифа видеоси навбат билан: showreel + `settings.heroVideos` (Keystatic → «Бош саҳифа видеолари»). Ҳар ташрифда кейингиси (`localStorage` `qx-reel`), биринчи ташрифда showreel. Эга танлаган: showreel → «Hit FM: бизга аталган шеър» (bizga-atalgan-sher) → «Шоколадли ширинликлар» (shokoladli-shirinliklar).
- **2026-11-09 да `redesign` qunduzxon.uz га жойланди** (эганинг компьютеридан `npm run deploy`, Version ID `367fa9bd-8471-4c0d-b809-65c619986704`). Ортга қайтариш: `npx wrangler rollback`.

## Муҳим техник қарорлар
- Видеолар `public/vsrc/` да; сайтда `/videos/<ном>.mp4|webm` орқали `src/pages/videos/[name].{mp4,webm}.ts`
  (`src/lib/video-range.ts`) беради — Workers static assets HTTP Range (206) бермайди, iPhone/Safari учун керак.
  Сабаби: Astro адаптери static файлни маршрутдан олдин беради ва `trailingSlash: 'always'` кенгайтмасиз маршрутни рад этади.
- Бош саҳифа showreel = «Радио студиясида» видеоси (31 с, овоз билан, фақат MP4). Браузерлар овозли autoplay'ни блоклагани учун
  видео овозсиз бошланади; биринчи босишда ёки «Овозни ёқиш» тугмасида бошидан овоз билан ўйнайди (`src/pages/[lang]/index.astro`).
- Instagram: `@qunduzxon_abdullayeva` (фойдаланувчи тасдиқлаган).
- `yangi-media/` — фойдаланувчи ташлайдиган хом файллар (gitignore). Қайта ишланганлари `public/vsrc/`, `src/assets/` га кўчирилган.
  Травматология институти видеоси ва «травматолог топиб беринг» фотоси шахсий бўлгани учун атайлаб қўшилмаган.

## Қолган ишлар
1. Telegram бот токени + chat ID, Turnstile калитлари (`wrangler secret put …`, `PUBLIC_TURNSTILE_SITE_KEY` билд вақтида) — формалар ҳозир ишламайди.
2. Намуна контентни алмаштириш (рўйхат `README.md` охирида): ўйлаб топилган 3 та ресторан шарҳи, отзивлар, ҳамкорлар,
   телефон `+998 90 123 45 67`, email, статистика, Instagram обуначилар сони «120K+».
3. Cloudflare dashboard: SSL/TLS → **Full (strict)**, **Always Use HTTPS** ёқиш (ҳозир http ҳам очилади); www → apex redirect (ихтиёрий).
4. Фойдаланувчи DNS учун яратган API токенни Cloudflare'да ўчириши керак (локал нусхаси ўчирилган).
5. `mail` / `ftp` CNAME'лари apex'га қарайди (олдин ҳам нотўғри эди) — почта ишлатилса, ahost.uz почта серверига тўғрилаш.
6. Аудио-демо файллар йўқ; Keystatic GitHub App созланмаган.
7. Деплой: 2026-11-10 да Cloudflare Workers Builds GitHub'га уланди (`minimalluz/qunduzxon.uz`, production branch `redesign`, build `npm run build`, deploy `npx wrangler deploy`) — `redesign` га ҳар push'да сайт ўзи янгиланади. Сессиядан `wrangler deploy` ишламайди: прокси Authorization сарлавҳасини алмаштиргани учун asset upload 401 беради.
