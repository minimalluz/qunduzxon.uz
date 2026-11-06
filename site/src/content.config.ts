import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Фуд-блог шарҳлари. Кейинчалик Sanity'га кўчирилади — майдонлар шунга мос.
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      cuisine: z.array(z.enum(['Миллий', 'Европа', 'Турк', 'Осиё', 'Fast-food', 'Қаҳвахона'])),
      city: z.string(),
      district: z.string().optional(),
      averageCheck: z.number().describe("сўм"),
      ratings: z.object({
        taste: z.number().min(0).max(10),
        service: z.number().min(0).max(10),
        interior: z.number().min(0).max(10),
        value: z.number().min(0).max(10),
      }),
      cover: image(),
      gallery: z.array(image()).default([]),
      video: z.string().optional().describe('Видео файл номи (R2 ичида)'),
      videoVertical: z.boolean().default(true),
      address: z.string(),
      mapUrl: z.string().url().optional(),
      hours: z.string(),
      /** true — ҳақиқий шарҳ эмас, намуна */
      sample: z.boolean().default(false),
    }),
});

export const collections = { reviews };
