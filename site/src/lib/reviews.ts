import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

type Entry = CollectionEntry<'reviews'>;
/** Тилга мос шарҳ: баллар, расм ва бошқа умумий майдонлар — `data` да, матнлар — `t` да, тана — `entry` да. */
export interface Review {
  id: string;
  data: Entry['data'];
  t: { title: string; summary: string; city: string; address: string };
  entry: Entry | CollectionEntry<'reviewsRu'>;
}

export const total = (r: Review) => {
  const { taste, service, interior, value } = r.data.ratings;
  return Math.round(((taste + service + interior + value) / 4) * 10) / 10;
};

export const som = (n: number, lang: Lang = 'uz') => `~${n.toLocaleString('ru-RU').replace(/ /g, ' ')} ${lang === 'ru' ? 'сум' : 'сўм'}`;

/**
 * Шарҳлар рўйхати (янгилари олдинда). Рус тилида фақат `src/content/reviews-ru/` да
 * таржимаси бор шарҳлар қайтади (файл номи ўзбекча шарҳ билан бир хил).
 */
export async function allReviews(lang: Lang = 'uz'): Promise<Review[]> {
  const uz = (await getCollection('reviews')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  if (lang === 'uz') {
    return uz.map((r) => ({ id: r.id, data: r.data, t: { title: r.data.title, summary: r.data.summary, city: r.data.city, address: r.data.address }, entry: r }));
  }
  const ru = new Map((await getCollection('reviewsRu')).map((r) => [r.id, r]));
  return uz.flatMap((r) => {
    const tr = ru.get(r.id);
    return tr ? [{ id: r.id, data: r.data, t: { title: tr.data.title, summary: tr.data.summary, city: tr.data.city, address: tr.data.address }, entry: tr }] : [];
  });
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
