import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Review = CollectionEntry<'reviews'>;

export async function getSettings() {
  const entry = await getEntry('settings', 'index');
  if (!entry) throw new Error('src/content/settings/index.yaml topilmadi');
  return entry.data;
}

export async function getAbout() {
  const entry = await getEntry('about', 'index');
  if (!entry) throw new Error('src/content/about/index.yaml topilmadi');
  return entry.data;
}

export async function getReviews() {
  const all = await getCollection('reviews', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function totalScore(r: Review['data']['rating']) {
  return Math.round(((r.taste + r.service + r.interior + r.value) / 4) * 10) / 10;
}

export async function getCases() {
  const all = await getCollection('cases');
  return all.sort(
    (a, b) => a.data.order - b.data.order || (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
  );
}

export async function getFaq(service: 'toy' | 'korporativ' | 'tv' | 'food') {
  const all = await getCollection('faq', ({ data }) => data.service === service);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getTestimonials(category?: 'toy' | 'korporativ' | 'tv' | 'food') {
  return getCollection('testimonials', ({ data }) => !category || data.category === category);
}

export async function getAudio() {
  const all = await getCollection('audio');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getPartners() {
  const all = await getCollection('partners');
  return all.sort((a, b) => a.data.order - b.data.order);
}
