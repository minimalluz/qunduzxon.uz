import { getCollection, type CollectionEntry } from 'astro:content';

export type Review = CollectionEntry<'reviews'>;

export const total = (r: Review) => {
  const { taste, service, interior, value } = r.data.ratings;
  return Math.round(((taste + service + interior + value) / 4) * 10) / 10;
};

export const som = (n: number) => `~${n.toLocaleString('ru-RU').replace(/ /g, ' ')} сўм`;

export async function allReviews() {
  return (await getCollection('reviews')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const RATING_LABELS: Record<keyof Review['data']['ratings'], string> = {
  taste: 'Таом мазаси',
  service: 'Хизмат кўрсатиш',
  interior: 'Интерьер / муҳит',
  value: 'Нарх ва сифат',
};
