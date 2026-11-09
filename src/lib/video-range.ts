import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

/**
 * Videolarni HTTP Range (206) bilan uzatadi. Workers static assets Range'ni
 * qo'llamaydi, Safari/iOS esa videoni faqat 206 javob bilan o'ynatadi.
 * Marshrutlar: src/pages/videos/[name].mp4.ts va [name].webm.ts.
 * Fayllar public/vsrc/ da turadi (adapter static faylni Worker marshrutidan oldin
 * beradi, shuning uchun /videos/* manzili static fayl bilan ustma-ust tushmasligi kerak).
 */
const assets = (env as unknown as { ASSETS: { fetch: (req: Request | string) => Promise<Response> } }).ASSETS;

export const videoRoute = (ext: 'mp4' | 'webm'): APIRoute => async ({ request, params }) => {
  const file = `${params.name ?? ''}.${ext}`;
  if (!/^[\w-]+\.(mp4|webm)$/.test(file)) return new Response(null, { status: 404 });
  const res = await assets.fetch(new URL(`/vsrc/${file}`, request.url).toString());
  if (!res.ok || !res.body) return res;

  const headers = new Headers(res.headers);
  headers.set('accept-ranges', 'bytes');
  headers.set('cache-control', 'public, max-age=2592000');

  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range') ?? '');
  if (!range) return new Response(res.body, { status: 200, headers });

  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  let start = range[1] ? Number(range[1]) : size - Number(range[2]);
  let end = range[1] && range[2] ? Number(range[2]) : size - 1;
  start = Math.max(0, start);
  end = Math.min(end, size - 1);
  if (start > end || start >= size) {
    return new Response(null, { status: 416, headers: { 'content-range': `bytes */${size}` } });
  }
  headers.set('content-range', `bytes ${start}-${end}/${size}`);
  headers.set('content-length', String(end - start + 1));
  return new Response(buf.slice(start, end + 1), { status: 206, headers });
};

export const headOf = (get: APIRoute): APIRoute => async (ctx) => {
  const res = await get(ctx);
  return new Response(null, { status: res.status, headers: res.headers });
};
