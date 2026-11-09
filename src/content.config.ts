import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const uzru = z.object({ uz: z.string().default(''), ru: z.string().default('') });
const category = z.enum(['toy', 'korporativ', 'tv', 'food', 'lifestyle']);
const video = z
  .object({ url: z.string().nullable().optional(), vertical: z.boolean().default(false) })
  .default({ url: null, vertical: false });

const yaml = (dir: string) => glob({ pattern: '*.yaml', base: `./src/content/${dir}` });

const reviews = defineCollection({
  loader: yaml('reviews'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      publishedAt: z.coerce.date(),
      draft: z.boolean().default(false),
      cuisine: z.enum(['milliy', 'evropa', 'turk', 'osiyo', 'fastfood', 'kofe']),
      city: z.string().default('Тошкент'),
      district: uzru,
      cover: image(),
      coverAlt: uzru,
      summary: uzru,
      body: uzru,
      gallery: z.array(image()).default([]),
      video,
      videoPoster: image().nullable().optional(),
      rating: z.object({
        taste: z.number().min(1).max(10),
        service: z.number().min(1).max(10),
        interior: z.number().min(1).max(10),
        value: z.number().min(1).max(10),
      }),
      avgCheck: z.number().nullable().optional(),
      address: uzru,
      mapUrl: z.string().nullable().optional(),
      hours: z.string().default(''),
      phone: z.string().default(''),
      seo: z.object({ title: uzru, description: uzru }).optional(),
    }),
});

const cases = defineCollection({
  loader: yaml('cases'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      titleRu: z.string().default(''),
      category,
      image: image(),
      video,
      featured: z.boolean().default(false),
      date: z.coerce.date().nullable().optional(),
      order: z.number().default(0),
    }),
});

const testimonials = defineCollection({
  loader: yaml('testimonials'),
  schema: z.object({ name: z.string(), event: uzru, text: uzru, category }),
});

const audio = defineCollection({
  loader: yaml('audio'),
  schema: z.object({
    title: z.string(),
    titleRu: z.string().default(''),
    style: uzru,
    file: z.string().nullable().optional(),
    order: z.number().default(0),
  }),
});

const partners = defineCollection({
  loader: yaml('partners'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image().nullable().optional(),
      url: z.string().nullable().optional(),
      order: z.number().default(0),
    }),
});

const faq = defineCollection({
  loader: yaml('faq'),
  schema: z.object({
    question: z.string(),
    questionRu: z.string().default(''),
    answer: uzru,
    service: category,
    order: z.number().default(0),
  }),
});

const settings = defineCollection({
  loader: yaml('settings'),
  schema: ({ image }) =>
    z.object({
      phone: z.string().default(''),
      adminPhone: z.string().default(''),
      email: z.string().default(''),
      telegram: z.string().nullable().optional(),
      instagram: z.string().nullable().optional(),
      youtube: z.string().nullable().optional(),
      tiktok: z.string().nullable().optional(),
      facebook: z.string().nullable().optional(),
      showDateCheck: z.boolean().default(false),
      radio: z
        .object({ name: z.string().default(''), stream: z.string().nullable().optional(), site: z.string().nullable().optional() })
        .default({ name: '', stream: null, site: null }),
      mediaKitPdf: z.string().nullable().optional(),
      showreel: z.object({
        webm: z.string().nullable().optional(),
        mp4: z.string().nullable().optional(),
        poster: image(),
      }),
      stats: z.object({
        years: z.number(),
        events: z.number(),
        restaurants: z.number(),
        followers: z.number(),
      }),
      social: z.object({
        instagramFollowers: z.string().default(''),
        telegramFollowers: z.string().default(''),
        avgReach: z.string().default(''),
        audienceWomen: z.number().nullable().optional(),
        audienceAge: z.string().default(''),
        audienceCity: z.string().default(''),
      }),
    }),
});

const about = defineCollection({
  loader: yaml('about'),
  schema: ({ image }) =>
    z.object({
      portrait: image(),
      bio: uzru,
      timeline: z.array(z.object({ year: z.string().default(''), title: uzru, text: uzru })).default([]),
      values: z.array(z.object({ title: uzru, text: uzru })).default([]),
      awards: z.array(z.object({ image: image(), caption: uzru })).default([]),
    }),
});

const onam = defineCollection({
  loader: yaml('onam'),
  schema: ({ image }) =>
    z.object({
      cover: image().nullable().optional(),
      intro: uzru,
      values: z.array(uzru).default([]),
      quote: uzru,
      story: uzru,
      gallery: z.array(z.object({ image: image(), caption: uzru })).default([]),
      videos: z
        .array(z.object({ title: uzru, poster: image(), url: z.string().nullable().optional(), vertical: z.boolean().default(true) }))
        .default([]),
      closing: z.object({ title: uzru, text: uzru }),
    }),
});

export const collections = { reviews, cases, testimonials, audio, partners, faq, settings, about, onam };
