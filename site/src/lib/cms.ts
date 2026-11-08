/**
 * Sanity (админ панел) билан алоқа. Фақат сайт йиғилаётганда (build) ишлайди.
 *
 * SANITY_PROJECT_ID берилмаган бўлса, CMS ўчиқ: сайт маълумотни файллардан олади
 * (src/config.ts, src/content/reviews*). Берилган бўлса — Sanity'да эълон қилинган
 * (Publish) маълумотлар ишлатилади. Қоралама (draft) лар сайтга чиқмайди.
 */
import type { ImageMetadata } from 'astro';

const env = (k: string): string | undefined => (typeof process !== 'undefined' ? process.env[k] : undefined) ?? (import.meta.env as Record<string, string | undefined>)[k];

const PROJECT = env('SANITY_PROJECT_ID');
const DATASET = env('SANITY_DATASET') || 'production';
/** Тест учун: бошқа API манзили (масалан маҳаллий mock-сервер) */
const API = env('SANITY_API_URL') || (PROJECT ? `https://${PROJECT}.apicdn.sanity.io` : '');

export const cmsEnabled = Boolean(PROJECT);

const cache = new Map<string, Promise<unknown>>();

/** GROQ сўрови. Бир хил сўров бир марта юборилади. */
export function groq<T>(query: string): Promise<T> {
  const url = `${API.replace(/\/$/, '')}/v2025-02-19/data/query/${DATASET}?query=${encodeURIComponent(query)}&perspective=published`;
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url).then(async (r) => {
        if (!r.ok) throw new Error(`Sanity: ${r.status} ${await r.text()}`);
        return ((await r.json()) as { result: T }).result;
      }),
    );
  }
  return cache.get(url) as Promise<T>;
}

/** Sanity'даги расм: CDN манзили, ўлчами ва фокус нуқтаси (hotspot) */
export interface RemotePic { url: string; width: number; height: number; x?: number; y?: number }
/** Сайтдаги расм: маҳаллий (astro:assets) ёки Sanity'дан */
export type Pic = ImageMetadata | RemotePic;
export const isRemote = (p: Pic): p is RemotePic => 'url' in p;

/** GROQ: расм майдонини RemotePic кўринишида олиш */
export const PIC = `{ "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "x": hotspot.x, "y": hotspot.y }`;

/** Sanity CDN орқали ўлчамини ўзгартириш */
export const picUrl = (p: RemotePic, w: number, extra = '') => `${p.url}?w=${Math.min(w, p.width)}&auto=format&q=78${extra}`;

export interface CmsSettings {
  telegram?: string; phone?: string; email?: string;
  instagram?: string; youtube?: string; facebook?: string;
  years?: number; events?: number; followers?: number;
}
export const cmsSettings = async () =>
  cmsEnabled ? await groq<CmsSettings | null>(`*[_id == "settings"][0]{ telegram, phone, email, instagram, youtube, facebook, years, events, followers }`) : null;

export interface CmsPartner { name: string; url?: string; logo?: RemotePic }
export const cmsPartners = async () =>
  cmsEnabled ? await groq<CmsPartner[]>(`*[_type == "partner"] | order(order asc, name asc){ name, url, "logo": select(defined(logo.asset) => logo${PIC}) }`) : null;

export interface CmsTestimonial { name: string; service: string; event?: string; textUz: string; textRu?: string; photo?: RemotePic }
export const cmsTestimonials = async () =>
  cmsEnabled ? await groq<CmsTestimonial[]>(`*[_type == "testimonial"] | order(_createdAt desc){ name, service, event, textUz, textRu, "photo": select(defined(photo.asset) => photo${PIC}) }`) : [];
