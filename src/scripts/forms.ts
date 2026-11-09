import { PUBLIC_TURNSTILE_SITE_KEY } from 'astro:env/client';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
      getResponse: (id: string) => string | undefined;
    };
    __tsReady?: () => void;
  }
}

/* ---------- +998 (__) ___-__-__ telefon maskasi ---------- */
const PREFIX = '998';
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith(PREFIX)) d = d.slice(3);
  d = d.slice(0, 9);
  const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)];
  let out = '+998';
  if (d.length) out += ` (${p[0]}`;
  if (d.length >= 2) out += ')';
  if (p[1]) out += ` ${p[1]}`;
  if (p[2]) out += `-${p[2]}`;
  if (p[3]) out += `-${p[3]}`;
  return { text: out, digits: d };
}

function bindMask(input: HTMLInputElement) {
  input.addEventListener('focus', () => {
    if (!input.value) input.value = '+998 (';
  });
  input.addEventListener('blur', () => {
    if (formatPhone(input.value).digits.length === 0) input.value = '';
  });
  input.addEventListener('input', () => {
    const { text, digits } = formatPhone(input.value);
    input.value = digits.length ? text : '+998 (';
    input.setCustomValidity('');
  });
}

/* ---------- Cloudflare Turnstile: faqat foydalanuvchi formaga tegganda yuklanadi ---------- */
let tsLoading: Promise<void> | null = null;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  tsLoading ??= new Promise<void>((resolve, reject) => {
    window.__tsReady = () => resolve();
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__tsReady';
    s.async = true;
    s.onerror = () => reject(new Error('turnstile'));
    document.head.appendChild(s);
  });
  return tsLoading;
}

export function init() {
  document.querySelectorAll<HTMLFormElement>('form[data-lead]').forEach((form) => {
    const phone = form.querySelector<HTMLInputElement>('input[name="phone"]');
    if (phone) bindMask(phone);

    const slot = form.querySelector<HTMLElement>('[data-turnstile]');
    let widgetId: string | null = null;
    let tokenWaiters: ((t: string) => void)[] = [];
    let token = '';

    const ensureWidget = async () => {
      if (widgetId || !slot) return;
      await loadTurnstile();
      widgetId = window.turnstile!.render(slot, {
        sitekey: PUBLIC_TURNSTILE_SITE_KEY,
        appearance: 'interaction-only',
        size: 'flexible',
        language: document.documentElement.lang,
        callback: (t: string) => {
          token = t;
          tokenWaiters.forEach((w) => w(t));
          tokenWaiters = [];
        },
        'expired-callback': () => (token = ''),
      });
    };
    form.addEventListener('focusin', () => void ensureWidget().catch(() => {}), { once: true });

    const getToken = () =>
      token
        ? Promise.resolve(token)
        : new Promise<string>((resolve, reject) => {
            tokenWaiters.push(resolve);
            setTimeout(() => reject(new Error('timeout')), 15000);
          });

    const status = form.querySelector<HTMLElement>('[data-status]');
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const msg = (k: 'success' | 'error' | 'sending' | 'invalidPhone') => form.dataset[`msg${k[0].toUpperCase()}${k.slice(1)}`] || '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (phone && formatPhone(phone.value).digits.length !== 9) {
        phone.setCustomValidity(msg('invalidPhone'));
        phone.reportValidity();
        return;
      }
      if (!form.reportValidity()) return;

      const label = submit?.innerHTML;
      if (submit) {
        submit.disabled = true;
        submit.textContent = msg('sending');
      }
      status?.setAttribute('hidden', '');

      try {
        await ensureWidget();
        const t = await getToken();
        const data = Object.fromEntries(new FormData(form).entries());
        delete data['cf-turnstile-response'];
        const res = await fetch('/api/lead/', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            ...data,
            form: form.dataset.lead,
            lang: document.documentElement.lang,
            page: location.href,
            token: t,
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        if (status) {
          status.textContent = msg('success');
          status.dataset.kind = 'success';
        }
      } catch {
        if (status) {
          status.textContent = msg('error');
          status.dataset.kind = 'error';
        }
      } finally {
        token = '';
        if (widgetId) window.turnstile?.reset(widgetId);
        status?.removeAttribute('hidden');
        if (submit) {
          submit.disabled = false;
          submit.innerHTML = label ?? '';
        }
      }
    });
  });
}
