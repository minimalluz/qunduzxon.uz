/**
 * Sayt bo'ylab yagona yengil skript (framework'siz).
 * Har bir modul faqat sahifada tegishli element bo'lsa ishga tushadi.
 */

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);

/* ---------- Sticky header ---------- */
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.toggleAttribute('data-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Mobil menyu ---------- */
const menu = document.getElementById('mobile-menu');
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
if (menu && openBtn) {
  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    openBtn.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector<HTMLElement>('[data-menu-close]')?.focus();
    else openBtn.focus();
  };
  openBtn.addEventListener('click', () => setOpen(true));
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => setOpen(false));
  menu.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

/* ---------- Tema ---------- */
$$('[data-theme-toggle]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const d = document.documentElement;
    const next = d.dataset.theme === 'dark' ? 'light' : 'dark';
    d.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
  }),
);

/* ---------- Skroll animatsiyasi + hisoblagichlar ---------- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? '';
  const fmt = (n: number) =>
    n >= 1000 && el.dataset.compact !== undefined
      ? `${Math.round(n / 1000)}K`
      : new Intl.NumberFormat('ru-RU').format(Math.round(n));
  if (reduce) return void (el.textContent = fmt(target) + suffix);
  const start = performance.now();
  const dur = 1600;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = fmt(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('is-in');
      if (el.dataset.count) countUp(el);
      io.unobserve(el);
    }
  },
  { rootMargin: '0px 0px -10% 0px' },
);
$$('[data-reveal], [data-count]').forEach((el) => io.observe(el));

/* ---------- Audio pleer: bittasi yoqilsa boshqasi to'xtaydi ---------- */
const players = $$('[data-audio]');
players.forEach((wrap) => {
  const audio = wrap.querySelector('audio');
  const btn = wrap.querySelector<HTMLButtonElement>('[data-audio-btn]');
  const bar = wrap.querySelector<HTMLElement>('[data-audio-bar]');
  const time = wrap.querySelector<HTMLElement>('[data-audio-time]');
  const seek = wrap.querySelector<HTMLElement>('[data-audio-seek]');
  if (!audio || !btn) return;

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const sync = () => {
    const playing = !audio.paused;
    wrap.toggleAttribute('data-playing', playing);
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? btn.dataset.labelPause! : btn.dataset.labelPlay!);
  };

  btn.addEventListener('click', () => {
    if (audio.paused) {
      players.forEach((other) => other !== wrap && other.querySelector('audio')?.pause());
      audio.preload = 'auto';
      void audio.play();
    } else audio.pause();
  });
  audio.addEventListener('play', sync);
  audio.addEventListener('pause', sync);
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    sync();
  });
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    if (bar) bar.style.transform = `scaleX(${audio.currentTime / audio.duration})`;
    if (time) time.textContent = fmt(audio.duration - audio.currentTime);
  });
  audio.addEventListener('loadedmetadata', () => time && (time.textContent = fmt(audio.duration)));
  seek?.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const r = seek.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  });
});

/* ---------- Smart Facade: video faqat bosilganda yuklanadi ---------- */
function embedFor(url: string): { kind: 'iframe' | 'video' | 'hls'; src: string } | null {
  try {
    const u = new URL(url, location.href);
    const host = u.hostname.replace(/^www\.|^m\./, '');
    if (host === 'youtu.be' || host.endsWith('youtube.com')) {
      const id =
        host === 'youtu.be'
          ? u.pathname.slice(1)
          : u.searchParams.get('v') || u.pathname.split('/').filter(Boolean).pop() || '';
      return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0` };
    }
    if (host.endsWith('instagram.com')) {
      const m = u.pathname.match(/\/(reel|reels|p|tv)\/([^/]+)/);
      if (m) return { kind: 'iframe', src: `https://www.instagram.com/${m[1] === 'reels' ? 'reel' : m[1]}/${m[2]}/embed/` };
    }
    if (/\.m3u8$/i.test(u.pathname)) return { kind: 'hls', src: url };
    return { kind: 'video', src: url };
  } catch {
    return null;
  }
}

$$<HTMLButtonElement>('[data-video-facade]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const e = embedFor(btn.dataset.src || '');
    if (!e) return;
    const box = btn.parentElement!;
    let el: HTMLElement;
    if (e.kind === 'iframe') {
      const f = document.createElement('iframe');
      f.src = e.src;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.title = btn.getAttribute('aria-label') || 'Video';
      f.loading = 'eager';
      el = f;
    } else {
      const v = document.createElement('video');
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.src = e.src; // Safari HLS'ni nativ o'ynatadi; boshqa brauzerlar uchun MP4 tavsiya etiladi
      el = v;
    }
    el.className = 'absolute inset-0 h-full w-full bg-black';
    box.appendChild(el);
    btn.remove();
  }),
);

/* ---------- Lightbox (galereya) ---------- */
const lb = document.getElementById('lightbox') as HTMLDialogElement | null;
if (lb) {
  const img = lb.querySelector('img')!;
  const cap = lb.querySelector('[data-lb-caption]')!;
  let list: HTMLAnchorElement[] = [];
  let idx = 0;
  const show = (i: number) => {
    idx = (i + list.length) % list.length;
    const a = list[idx];
    img.src = a.href;
    img.alt = a.dataset.caption || '';
    cap.textContent = a.dataset.caption || '';
  };
  document.addEventListener('click', (ev) => {
    const a = (ev.target as Element).closest<HTMLAnchorElement>('a[data-lightbox]');
    if (!a) return;
    ev.preventDefault();
    list = $$<HTMLAnchorElement>(`a[data-lightbox="${a.dataset.lightbox}"]`).filter((x) => x.offsetParent !== null);
    show(list.indexOf(a));
    lb.showModal();
  });
  lb.querySelector('[data-lb-prev]')?.addEventListener('click', () => show(idx - 1));
  lb.querySelector('[data-lb-next]')?.addEventListener('click', () => show(idx + 1));
  lb.querySelector('[data-lb-close]')?.addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => e.target === lb && lb.close());
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  let x0 = 0;
  lb.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  });
}

/* ---------- Media filtri ---------- */
$$('[data-filter-group]').forEach((group) => {
  const target = document.getElementById(group.dataset.filterGroup!);
  if (!target) return;
  $$<HTMLButtonElement>('button[data-filter]', group).forEach((btn) =>
    btn.addEventListener('click', () => {
      $$('button[data-filter]', group).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const f = btn.dataset.filter;
      $$('[data-cat]', target).forEach((it) => (it.hidden = f !== 'all' && it.dataset.cat !== f));
    }),
  );
});

/* ---------- Ulashish ---------- */
$$<HTMLButtonElement>('[data-share]').forEach((btn) => {
  if (!('share' in navigator)) return;
  btn.hidden = false;
  btn.addEventListener('click', () => navigator.share({ title: document.title, url: location.href }).catch(() => {}));
});

/* ---------- Formalar ---------- */
if (document.querySelector('form[data-lead]')) import('./forms').then((m) => m.init());
