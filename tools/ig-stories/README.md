# Instagram историялар архиви (VPS)

`@qunduzxon_abdullayeva` аккаунтига жойланган ҳар бир историяни **расмий Instagram API** орқали серверга сақлайди.
Ҳар соатда ишга тушади, ҳозир эфирда турган (24 соатлик) историялардан янгиларини юклаб олади.
Кейин улардан кераклиларини танлаб, сайтдаги «Instagram историялар» карточкасига қўшамиз.

- Сайтдан **алоҳида**: ўз фойдаланувчиси (`igstories`), ўз папкалари, ишлаб турган сайтга ва веб-серверга тегмайди.
- Python 3 стандарт кутубхонаси (Ubuntu 24.04 да бор), қўшимча пакет ўрнатилмайди.
- Норасмий «скрейпинг» ишлатилмайди — аккаунт блокланиш хавфи йўқ.

| Нима | Қаерда |
| --- | --- |
| Историялар | `/srv/ig-stories/ЙИЛ-ОЙ-КУН/СОАТДАҚСОН_ID.mp4` (видеонинг муқоваси `…_thumb.jpg`) |
| Рўйхат | `/srv/ig-stories/index.jsonl` (ҳар қатор — битта история: вақти, тури, файл, Instagram ҳаволаси) |
| Созламалар | `/etc/ig-stories.env` |
| Токен (махфий) | `/var/lib/ig-stories/token` |
| Дастур | `/opt/ig-stories/ig_stories.py` |
| Журнал | `journalctl -u ig-stories` |

> **Эслатма.** API орқали фақат дастур ишга тушгандан **кейинги** историялар олинади (Instagram эскиларини API'да бермайди).
> Олдинги историялар учун: Instagram → Созламалар → «Ваша активность» → «Скачать информацию» → фақат «Истории» →
> файл тайёр бўлгач юклаб олинг — уни ҳам архивга қўшиб берамиз.

## 1. Instagram аккаунтини «профессионал» қилиш

Instagram илова → профиль → ☰ → **Настройки** → **Тип аккаунта и инструменты** → **Переключиться на профессиональный аккаунт** →
**Автор** (Creator) ёки **Бизнес**. Текин; обуначилар, постлар ва историяларга таъсир қилмайди.
Агар у ерда «Переключиться на личный аккаунт» деб ёзилган бўлса — аккаунт аллақачон профессионал.

## 2. Meta иловаси ва токен (бир марта)

1. https://developers.facebook.com → **My Apps** → **Create App**.
2. Фойдаланиш тури: **Instagram** (Instagram API with Instagram Login / «Manage messaging & content on Instagram»).
3. Илова ичида **Instagram → API setup with Instagram login** бўлими:
   - **Generate access tokens** → **Add account** → `qunduzxon_abdullayeva` билан киринг ва рухсат беринг
     (сўраса, аввал **App roles → Roles → Instagram testers** га аккаунтни қўшиб, Instagram илова → Настройки → «Приложения и сайты» да таклифни қабул қилинг).
   - Чиққан **токенни** кўчиринг (60 кун амал қилади; дастур уни ҳафтада бир ўзи янгилайди).
4. Илова «Development» режимида қолса бўлади — фақат ўз аккаунтимиз учун.

## 3. VPS'га ўрнатиш

```bash
git clone -b redesign https://github.com/minimalluz/qunduzxon.uz.git /tmp/qx
```
```bash
sudo bash /tmp/qx/tools/ig-stories/install.sh
```

## 4. Токенни ёзиш

```bash
sudo nano /var/lib/ig-stories/token
```
Токенни қўйинг, сақланг (Ctrl+O, Enter, Ctrl+X). Токенни чатга ёки бошқа файлга ёзманг.

## 5. Текшириш ва ёқиш

```bash
sudo -u igstories python3 /opt/ig-stories/ig_stories.py check
```
«Аккаунт: … qunduzxon_abdullayeva …» ва «Ҳаммаси жойида» чиқса:
```bash
sudo systemctl enable --now ig-stories.timer ig-stories-refresh.timer
```
Шу заҳоти бир марта юклаб кўриш:
```bash
sudo systemctl start ig-stories.service && journalctl -u ig-stories -n 20 --no-pager
```

## Кундалик иш

- Нима сақланган: `ls /srv/ig-stories/` ёки `tail /srv/ig-stories/index.jsonl`
- Компьютерга кўчириш: `scp -r ФОЙДАЛАНУВЧИ@VPS_IP:/srv/ig-stories/2026-11-19 .`
- Таймерлар: `systemctl list-timers 'ig-stories*'`
- Тўхтатиш: `sudo systemctl disable --now ig-stories.timer ig-stories-refresh.timer`

## Муаммолар

- **`Invalid OAuth access token` / `Session has expired`** — токен эскирган ёки нотўғри: 2-қадамдаги каби янгисини олиб, 4-қадамни қайтаринг.
- **`media_url ЙЎҚ`** — Instagram бу уланиш усулида файл ҳаволасини бермаяпти. Унда Facebook Login усули: аккаунтни Facebook саҳифага улаб,
  `/etc/ig-stories.env` да `IG_API=facebook`, `IG_USER_ID=<Instagram бизнес ID>`, `FB_APP_ID`, `FB_APP_SECRET` ни тўлдириш керак — ёрдам берамиз.
- **`(#10) …` / `permission`** — токенда керакли рухсат йўқ: токенни қайта олишда барча рухсатларга розилик беринг.
- Бу API тафсилотлари (эндпоинт `/{user}/stories`, `media_url`, `refresh_access_token`) Meta ҳужжатлари бўйича ёзилган, лекин ҳақиқий аккаунтда
  ҳали синалмаган — `check` буйруғи биринчи ишга туширишда шуни текширади.
