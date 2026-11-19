#!/usr/bin/env bash
# Instagram историялар архивини VPS'га ўрнатиш (Ubuntu 24.04). Ишлатиш: sudo bash install.sh
# Ишлаб турган сайтга тегмайди: алоҳида фойдаланувчи (igstories), алоҳида папкалар.
set -euo pipefail
cd "$(dirname "$0")"

[ "$(id -u)" -eq 0 ] || { echo "sudo bash install.sh деб ишга туширинг"; exit 1; }
command -v python3 >/dev/null || apt-get install -y python3

id igstories >/dev/null 2>&1 || useradd --system --home /var/lib/ig-stories --shell /usr/sbin/nologin igstories
install -d -o igstories -g igstories -m 0750 /var/lib/ig-stories
install -d -o igstories -g igstories -m 0755 /srv/ig-stories
install -d -m 0755 /opt/ig-stories
install -m 0755 ig_stories.py /opt/ig-stories/ig_stories.py

if [ ! -f /etc/ig-stories.env ]; then
  install -m 0640 -g igstories ig-stories.env.example /etc/ig-stories.env
  echo "Созламалар: /etc/ig-stories.env (керак бўлса таҳрирланг)"
fi
if [ ! -f /var/lib/ig-stories/token ]; then
  install -o igstories -g igstories -m 0600 /dev/null /var/lib/ig-stories/token
fi

install -m 0644 ig-stories.service ig-stories.timer ig-stories-refresh.service ig-stories-refresh.timer /etc/systemd/system/
systemctl daemon-reload
echo
echo "Ўрнатилди. Кейинги қадамлар (README.md, 4–5):"
echo "  1) Токенни ёзинг:   sudo nano /var/lib/ig-stories/token"
echo "  2) Текширинг:       sudo -u igstories python3 /opt/ig-stories/ig_stories.py check"
echo "  3) Ёқинг:           sudo systemctl enable --now ig-stories.timer ig-stories-refresh.timer"
