import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';
import { videoUrl } from '../config';
import type { Pic } from './cms';

type Ratings = CollectionEntry<'reviews'>['data']['ratings'];

/**
 * Тилга мос шарҳ. Манбаи — `src/content/reviews*` даги файллар (админ панелда шарҳлар йўқ).
 * Баллар, расм ва бошқа умумий майдонлар — `data` да, тилга боғлиқ матнлар — `t` да, тана — `body` да.
 */
export interface Review {
  id: string;
  data: {
    /** Ўзбекча ном ва шаҳар (харитада қидириш учун) */
    title: string;
    city: string;
    date: Date;
    cuisine: string[];
    averageCheck: number;
    ratings: Ratings;
    cover: Pic;
    gallery: Pic[];
    /** Видеонинг тўлиқ манзили */
    video?: string;
    videoVertical: boolean;
    mapUrl?: string;
    hours: string;
    sample: boolean;
  };
  t: { title: string; summary: string; city: string; address: string };
  body: { kind: 'md'; entry: CollectionEntry<'reviews'> | CollectionEntry<'reviewsRu'> };
}

export const total = (r: Review) => {
  const { taste, service, interior, value } = r.data.ratings;
  return Math.round(((taste + service + interior + value) / 4) * 10) / 10;
};

export const som = (n: number, lang: Lang = 'uz') => `~${n.toLocaleString('ru-RU').replace(/\u00a0/g, ' ')} ${lang === 'ru' ? 'сум' : 'сўм'}`;

/** Файлдаги шарҳлар */
async function fileReviews(lang: Lang): Promise<Review[]> {
  const uz = (await getCollection('reviews')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const ru = lang === 'ru' ? new Map((await getCollection('reviewsRu')).map((r) => [r.id, r])) : null;
  return uz.flatMap((r) => {
    const d = r.data;
    const data: Review['data'] = {
      title: d.title, city: d.city, date: d.date, cuisine: d.cuisine, averageCheck: d.averageCheck, ratings: d.ratings,
      cover: d.cover, gallery: d.gallery, video: d.video ? videoUrl(d.video) : undefined, videoVertical: d.videoVertical,
      mapUrl: d.mapUrl, hours: d.hours, sample: d.sample,
    };
    if (!ru) return [{ id: r.id, data, t: { title: d.title, summary: d.summary, city: d.city, address: d.address }, body: { kind: 'md', entry: r } }];
    const tr = ru.get(r.id);
    return tr ? [{ id: r.id, data, t: { title: tr.data.title, summary: tr.data.summary, city: tr.data.city, address: tr.data.address }, body: { kind: 'md', entry: tr } }] : [];
  });
}

/** Шарҳлар рўйхати (янгилари олдинда) */
export async function allReviews(lang: Lang = 'uz'): Promise<Review[]> {
  return fileReviews(lang);
}

/** Ошхона турлари (схемадаги қиймат ўзбекча; русчаси фақат кўрсатиш учун) */
export const CUISINES = ['Миллий', 'Европа', 'Турк', 'Осиё', 'Fast-food', 'Қаҳвахона'] as const;
const CUISINE_RU: Record<string, string> = {
  'Миллий': 'Национальная', 'Европа': 'Европейская', 'Турк': 'Турецкая', 'Осиё': 'Азиатская', 'Fast-food': 'Fast-food', 'Қаҳвахона': 'Кофейня',
};
export const cuisineLabel = (c: string, lang: Lang) => (lang === 'ru' ? CUISINE_RU[c] ?? c : c);

export const RATING_LABELS: Record<Lang, Record<keyof Review['data']['ratings'], string>> = {
  uz: {
    taste: 'Таом мазаси',
    service: 'Хизмат кўрсатиш',
    interior: 'Интерьер / муҳит',
    value: 'Нарх ва сифат',
  },
  ru: {
    taste: 'Вкус блюд',
    service: 'Обслуживание',
    interior: 'Интерьер / атмосфера',
    value: 'Цена и качество',
  },
};
