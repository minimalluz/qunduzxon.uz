import { getImage } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import { useT, pick, href, type Lang } from '../i18n/ui';
import { getSettings, getAbout, totalScore } from './content';

const abs = (path: string, site: URL) => new URL(path, site).href;

export async function personSchema(lang: Lang, site: URL) {
  const t = useT(lang);
  const s = await getSettings();
  const about = await getAbout();
  const img = await getImage({ src: about.portrait, width: 800, format: 'jpeg' });
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': abs('/#person', site),
    name: t('site.name'),
    alternateName: ['Qunduzxon Abdullayeva', 'Кундузхон Абдуллаева', 'Қундузхон Абдуллаева'],
    jobTitle: [t('hero.role.tv'), t('hero.role.mc'), t('hero.role.food')],
    description: t('site.description'),
    url: abs(`/${lang}/`, site),
    image: abs(img.src, site),
    email: s.email ? `mailto:${s.email}` : undefined,
    telephone: s.phone || undefined,
    address: { '@type': 'PostalAddress', addressLocality: 'Tashkent', addressCountry: 'UZ' },
    knowsLanguage: ['uz', 'ru'],
    sameAs: [s.instagram, s.telegram, s.youtube, s.tiktok, s.facebook].filter(Boolean),
  };
}

export function serviceSchema(lang: Lang, site: URL, name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    url: abs(href(lang, path), site),
    areaServed: { '@type': 'Country', name: 'Uzbekistan' },
    availableLanguage: ['uz', 'ru'],
    provider: { '@id': abs('/#person', site) },
  };
}

export function faqSchema(lang: Lang, items: CollectionEntry<'faq'>[]) {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ data }) => ({
      '@type': 'Question',
      name: lang === 'ru' && data.questionRu ? data.questionRu : data.question,
      acceptedAnswer: { '@type': 'Answer', text: pick(data.answer, lang) },
    })),
  };
}

/** Faqat video havolasi bor elementlar uchun VideoObject */
export async function videoSchemas(
  site: URL,
  items: { name: string; url?: string | null; image: ImageMetadata; date?: Date | null }[],
) {
  const out = [];
  for (const it of items) {
    if (!it.url) continue;
    const thumb = await getImage({ src: it.image, width: 720, format: 'jpeg' });
    out.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: it.name,
      description: it.name,
      thumbnailUrl: abs(thumb.src, site),
      uploadDate: (it.date ?? new Date()).toISOString(),
      contentUrl: /\.(mp4|webm|m3u8)$/i.test(it.url) ? it.url : undefined,
      embedUrl: /\.(mp4|webm|m3u8)$/i.test(it.url) ? undefined : it.url,
    });
  }
  return out;
}

export async function reviewSchema(lang: Lang, site: URL, review: CollectionEntry<'reviews'>) {
  const t = useT(lang);
  const d = review.data;
  const img = await getImage({ src: d.cover, width: 1200, format: 'jpeg' });
  const url = abs(href(lang, `/food-blog/${review.id}/`), site);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      name: `${d.name} — ${t('food.review')}`,
      url,
      inLanguage: lang,
      datePublished: d.publishedAt.toISOString().slice(0, 10),
      author: { '@type': 'Person', name: t('site.name'), url: abs(`/${lang}/about/`, site) },
      reviewBody: pick(d.summary, lang),
      image: abs(img.src, site),
      reviewRating: { '@type': 'Rating', ratingValue: totalScore(d.rating), bestRating: 10, worstRating: 1 },
      itemReviewed: {
        '@type': 'Restaurant',
        name: d.name,
        servesCuisine: t(`cuisine.${d.cuisine}`),
        image: abs(img.src, site),
        address: { '@type': 'PostalAddress', streetAddress: pick(d.address, lang), addressLocality: d.city, addressCountry: 'UZ' },
        telephone: d.phone || undefined,
        priceRange: d.avgCheck ? `${d.avgCheck} UZS` : undefined,
        openingHours: d.hours || undefined,
        hasMap: d.mapUrl || undefined,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${d.name} — ${t('food.review')}`,
      description: pick(d.summary, lang),
      image: abs(img.src, site),
      datePublished: d.publishedAt.toISOString(),
      author: { '@type': 'Person', name: t('site.name') },
      mainEntityOfPage: url,
      inLanguage: lang,
    },
  ];
}
