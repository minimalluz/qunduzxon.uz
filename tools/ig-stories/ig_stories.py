#!/usr/bin/env python3
"""
Instagram историяларини серверга архивлаш (расмий Instagram API орқали).

Ҳар соатда (systemd timer) ишга тушади: ҳозир эфирдаги (24 соатлик) историяларни сўрайди,
янгиларини ARCHIVE_DIR/ЙИЛ-ОЙ-КУН/ га юклаб олади ва index.jsonl га ёзади.
Фақат Python стандарт кутубхонаси — қўшимча пакет керак эмас.

Буйруқлар:
  ig_stories.py check     — созламалар ва токенни текшириш (ҳеч нарса юкламайди)
  ig_stories.py fetch     — янги историяларни юклаб олиш (одатий)
  ig_stories.py refresh   — узоқ муддатли токенни янгилаш (ҳафтада бир)

Созламалар: /etc/ig-stories.env (ёки IG_STORIES_ENV муҳит ўзгарувчисида кўрсатилган файл).
Токен алоҳида файлда (TOKEN_FILE), чунки refresh уни янгилайди.
"""
from __future__ import annotations

import json
import os
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

UA = "qunduzxon-ig-stories/1.0"
FIELDS = "id,media_type,media_url,thumbnail_url,timestamp,permalink"


def log(*a: object) -> None:
    print(time.strftime("%Y-%m-%d %H:%M:%S"), *a, flush=True)


def load_env(path: str) -> dict[str, str]:
    cfg: dict[str, str] = {}
    p = Path(path)
    if p.exists():
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            cfg[k.strip()] = v.strip().strip('"').strip("'")
    # Муҳит ўзгарувчилари файлдагидан устун
    for k in list(cfg) + ["IG_API", "IG_API_BASE", "IG_API_VERSION", "IG_USER_ID", "TOKEN_FILE", "ARCHIVE_DIR", "FB_APP_ID", "FB_APP_SECRET"]:
        if os.environ.get(k):
            cfg[k] = os.environ[k]
    return cfg


class Cfg:
    def __init__(self, env: dict[str, str]):
        self.api = env.get("IG_API", "instagram")  # instagram | facebook
        default_base = "https://graph.instagram.com" if self.api == "instagram" else "https://graph.facebook.com"
        self.base = env.get("IG_API_BASE", default_base).rstrip("/")
        ver = env.get("IG_API_VERSION", "").strip("/")
        self.root = f"{self.base}/{ver}" if ver else self.base
        self.user_id = env.get("IG_USER_ID", "me")
        self.token_file = Path(env.get("TOKEN_FILE", "/var/lib/ig-stories/token"))
        self.archive = Path(env.get("ARCHIVE_DIR", "/srv/ig-stories"))
        self.app_id = env.get("FB_APP_ID", "")
        self.app_secret = env.get("FB_APP_SECRET", "")

    @property
    def token(self) -> str:
        if not self.token_file.exists():
            sys.exit(f"Токен файли йўқ: {self.token_file}. README'даги 4-қадамни бажаринг.")
        t = self.token_file.read_text(encoding="utf-8").strip()
        if not t:
            sys.exit(f"Токен файли бўш: {self.token_file}")
        return t


def http_json(url: str, params: dict[str, str] | None = None) -> dict:
    if params:
        url += ("&" if "?" in url else "?") + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        try:
            msg = json.loads(body).get("error", {}).get("message", body)
        except ValueError:
            msg = body
        raise RuntimeError(f"HTTP {e.code}: {msg[:300]}") from None


def download(url: str, dest: Path) -> int:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    tmp = tempfile.NamedTemporaryFile(dir=dest.parent, delete=False)
    try:
        with urllib.request.urlopen(req, timeout=120) as r, tmp:
            n = 0
            while chunk := r.read(1 << 16):
                tmp.write(chunk)
                n += len(chunk)
    except BaseException:
        Path(tmp.name).unlink(missing_ok=True)
        raise
    os.chmod(tmp.name, 0o644)
    os.replace(tmp.name, dest)  # ярим юкланган файл ҳеч қачон қолмайди
    return n


def known_ids(index: Path) -> set[str]:
    ids: set[str] = set()
    if index.exists():
        for line in index.read_text(encoding="utf-8").splitlines():
            try:
                ids.add(json.loads(line)["id"])
            except (ValueError, KeyError):
                pass
    return ids


def list_stories(cfg: Cfg) -> list[dict]:
    out: list[dict] = []
    url = f"{cfg.root}/{cfg.user_id}/stories"
    params: dict[str, str] | None = {"fields": FIELDS, "access_token": cfg.token, "limit": "50"}
    while url:
        data = http_json(url, params)
        out += data.get("data", [])
        url = data.get("paging", {}).get("next", "")
        params = None  # next ҳаволада параметрлар бор
    return out


def ext_for(media_type: str, url: str) -> str:
    path = urllib.parse.urlparse(url).path.lower()
    for e in (".mp4", ".mov", ".jpg", ".jpeg", ".png", ".webp", ".heic"):
        if path.endswith(e):
            return e
    return ".mp4" if media_type == "VIDEO" else ".jpg"


def cmd_check(cfg: Cfg) -> int:
    log(f"API: {cfg.api} ({cfg.root}), user: {cfg.user_id}, архив: {cfg.archive}")
    fields = "id,username,account_type" if cfg.api == "instagram" else "id,username"
    me = http_json(f"{cfg.root}/{cfg.user_id}", {"fields": fields, "access_token": cfg.token})
    log("Аккаунт:", json.dumps(me, ensure_ascii=False))
    stories = list_stories(cfg)
    log(f"Ҳозир эфирдаги историялар: {len(stories)}")
    for s in stories[:5]:
        log(" -", s.get("timestamp"), s.get("media_type"), "media_url бор" if s.get("media_url") else "media_url ЙЎҚ")
    if stories and not any(s.get("media_url") for s in stories):
        log("ДИҚҚАТ: API media_url бермаяпти — файлларни юклаб бўлмайди. README → «Муаммолар».")
        return 2
    cfg.archive.mkdir(parents=True, exist_ok=True)
    probe = cfg.archive / ".write-test"
    probe.write_text("ok")
    probe.unlink()
    log("Ҳаммаси жойида.")
    return 0


def cmd_fetch(cfg: Cfg) -> int:
    cfg.archive.mkdir(parents=True, exist_ok=True)
    index = cfg.archive / "index.jsonl"
    seen = known_ids(index)
    stories = list_stories(cfg)
    new = 0
    for s in sorted(stories, key=lambda x: x.get("timestamp", "")):
        sid = s.get("id")
        if not sid or sid in seen:
            continue
        url = s.get("media_url")
        if not url:
            log(f"{sid}: media_url йўқ, ўтказиб юборилди")
            continue
        ts = s.get("timestamp", "")
        try:
            dt = datetime.strptime(ts, "%Y-%m-%dT%H:%M:%S%z")
        except ValueError:
            dt = datetime.now(timezone.utc)
        day = cfg.archive / dt.strftime("%Y-%m-%d")
        stem = f"{dt.strftime('%H%M%S')}_{sid}"
        mtype = s.get("media_type", "")
        try:
            main = day / (stem + ext_for(mtype, url))
            size = download(url, main)
            thumb = None
            if mtype == "VIDEO" and s.get("thumbnail_url"):
                thumb = day / (stem + "_thumb" + ext_for("IMAGE", s["thumbnail_url"]))
                download(s["thumbnail_url"], thumb)
        except Exception as e:  # битта ҳикоя хатоси бошқаларини тўхтатмасин; кейинги сафар қайта уринилади
            log(f"{sid}: юклаб бўлмади: {e}")
            continue
        rec = {
            "id": sid,
            "timestamp": ts,
            "media_type": mtype,
            "permalink": s.get("permalink"),
            "file": str(main.relative_to(cfg.archive)),
            "thumbnail": str(thumb.relative_to(cfg.archive)) if thumb else None,
            "bytes": size,
            "saved_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        }
        with index.open("a", encoding="utf-8") as f:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")
        seen.add(sid)
        new += 1
        log(f"Сақланди: {rec['file']} ({size // 1024} KB)")
    log(f"Тайёр: эфирда {len(stories)} та, янги сақлангани {new} та.")
    return 0


def cmd_refresh(cfg: Cfg) -> int:
    if cfg.api == "instagram":
        data = http_json(f"{cfg.base}/refresh_access_token", {"grant_type": "ig_refresh_token", "access_token": cfg.token})
    else:
        if not (cfg.app_id and cfg.app_secret):
            log("Facebook Login: FB_APP_ID ва FB_APP_SECRET берилмаган — токен янгиланмади.")
            return 1
        data = http_json(
            f"{cfg.root}/oauth/access_token",
            {"grant_type": "fb_exchange_token", "client_id": cfg.app_id, "client_secret": cfg.app_secret, "fb_exchange_token": cfg.token},
        )
    new = data.get("access_token")
    if not new:
        log("Янги токен келмади:", json.dumps(data)[:200])
        return 1
    cfg.token_file.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", dir=cfg.token_file.parent, delete=False) as tmp:
        tmp.write(new)
    os.chmod(tmp.name, 0o600)
    os.replace(tmp.name, cfg.token_file)
    days = int(data.get("expires_in", 0)) // 86400
    log(f"Токен янгиланди{f', {days} кун амал қилади' if days else ''}.")
    return 0


def main() -> int:
    cmd = sys.argv[1] if len(sys.argv) > 1 else "fetch"
    cfg = Cfg(load_env(os.environ.get("IG_STORIES_ENV", "/etc/ig-stories.env")))
    fn = {"check": cmd_check, "fetch": cmd_fetch, "refresh": cmd_refresh}.get(cmd)
    if not fn:
        print(__doc__)
        return 64
    try:
        return fn(cfg)
    except RuntimeError as e:
        log("Хато:", e)
        return 1


if __name__ == "__main__":
    sys.exit(main())
