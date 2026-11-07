import { defineField, defineType } from 'sanity'
import { richText } from './blocks'
import { slugify } from './translit'

// Сайтдаги филтр шу қийматлар билан ишлайди — ўзгартирманг (рус таржимаси сайт кодида).
export const CUISINES = ['Миллий', 'Европа', 'Турк', 'Осиё', 'Fast-food', 'Қаҳвахона']

const score = (name: string, title: string) =>
  defineField({ name, title, type: 'number', initialValue: 8, validation: (r) => r.required().min(0).max(10).precision(1) })

export const review = defineType({
  name: 'review',
  title: 'Фуд-блог шарҳи',
  type: 'document',
  groups: [
    { name: 'main', title: 'Асосий', default: true },
    { name: 'uz', title: 'Ўзбекча матн' },
    { name: 'ru', title: 'Русча матн' },
    { name: 'media', title: 'Расм ва видео' },
    { name: 'place', title: 'Жой ва баҳо' },
  ],
  fields: [
    defineField({ name: 'titleUz', title: 'Номи (ўзбекча)', type: 'string', group: ['main', 'uz'], description: 'Масалан: Marina ресторани', validation: (r) => r.required() }),
    defineField({ name: 'titleRu', title: 'Номи (русча)', type: 'string', group: ['main', 'ru'], description: 'Бўш қолса, шарҳ сайтнинг рус версиясида кўринмайди' }),
    defineField({
      name: 'slug',
      title: 'Манзил (URL)',
      type: 'slug',
      group: 'main',
      description: '«Generate» тугмасини босинг — номдан ўзи ясалади. Эълон қилингандан кейин ўзгартирманг.',
      options: { source: 'titleUz', slugify },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', title: 'Сана', type: 'date', group: 'main', initialValue: () => new Date().toISOString().slice(0, 10), validation: (r) => r.required() }),
    defineField({ name: 'cuisine', title: 'Ошхона тури', type: 'array', group: 'main', of: [{ type: 'string' }], options: { list: CUISINES, layout: 'grid' }, validation: (r) => r.required().min(1) }),
    defineField({ name: 'sample', title: 'Намуна (ҳақиқий шарҳ эмас)', type: 'boolean', group: 'main', initialValue: false, description: 'Ёқилган бўлса, сайтда «намуна» белгиси чиқади ва қидирувга берилмайди' }),

    defineField({ name: 'summaryUz', title: 'Қисқа хулоса (ўзбекча)', type: 'text', rows: 3, group: 'uz', description: 'Карточкада ва қидирувда кўринади, 1–2 гап', validation: (r) => r.required().max(300) }),
    richText('bodyUz', 'Шарҳ матни (ўзбекча)'),
    defineField({ name: 'cityUz', title: 'Шаҳар (ўзбекча)', type: 'string', group: ['uz', 'place'], initialValue: 'Тошкент', validation: (r) => r.required() }),
    defineField({ name: 'addressUz', title: 'Манзил (ўзбекча)', type: 'string', group: ['uz', 'place'], validation: (r) => r.required() }),

    defineField({ name: 'summaryRu', title: 'Қисқа хулоса (русча)', type: 'text', rows: 3, group: 'ru', validation: (r) => r.max(300) }),
    richText('bodyRu', 'Шарҳ матни (русча)'),
    defineField({ name: 'cityRu', title: 'Шаҳар (русча)', type: 'string', group: ['ru', 'place'], initialValue: 'Ташкент' }),
    defineField({ name: 'addressRu', title: 'Манзил (русча)', type: 'string', group: ['ru', 'place'] }),

    defineField({ name: 'cover', title: 'Асосий расм', type: 'image', group: 'media', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'gallery', title: 'Фотогалерея', type: 'array', group: 'media', of: [{ type: 'image', options: { hotspot: true } }], options: { layout: 'grid' } }),
    defineField({ name: 'video', title: 'Видео-обзор', type: 'file', group: 'media', options: { accept: 'video/mp4,video/*' }, description: 'MP4 файл. Катта бўлса, аввал сиқинг (50 MB гача тавсия этилади)' }),
    defineField({ name: 'videoVertical', title: 'Видео тик (телефонда олинган)', type: 'boolean', group: 'media', initialValue: true }),
    defineField({ name: 'videoName', title: 'Видео файл номи (R2)', type: 'string', group: 'media', description: 'Фақат видео Cloudflare R2 да бўлса. Одатда бўш қолдиринг', hidden: ({ document }) => !!document?.video && !document?.videoName }),

    defineField({ name: 'averageCheck', title: 'Ўртача чек (сўм)', type: 'number', group: 'place', validation: (r) => r.required().min(0) }),
    defineField({ name: 'hours', title: 'Иш вақти', type: 'string', group: 'place', placeholder: '10:00 – 23:00', validation: (r) => r.required() }),
    defineField({ name: 'mapUrl', title: 'Харита ҳаволаси', type: 'url', group: 'place', description: 'Яндекс ёки Google харитадан. Бўш бўлса, ном бўйича қидирув очилади' }),
    defineField({
      name: 'ratings',
      title: 'Баҳолар (0–10)',
      type: 'object',
      group: 'place',
      options: { columns: 2 },
      validation: (r) => r.required(),
      fields: [score('taste', 'Таом мазаси'), score('service', 'Хизмат кўрсатиш'), score('interior', 'Интерьер / муҳит'), score('value', 'Нарх ва сифат')],
    }),
  ],
  orderings: [{ title: 'Сана (янгилари олдин)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'titleUz', city: 'cityUz', media: 'cover', r: 'ratings', sample: 'sample', ru: 'titleRu' },
    prepare({ title, city, media, r, sample, ru }) {
      const avg = r ? Math.round(((r.taste + r.service + r.interior + r.value) / 4) * 10) / 10 : null
      return {
        title,
        media,
        subtitle: [avg != null && `★ ${avg.toFixed(1)}`, city, sample && 'намуна', !ru && 'русчаси йўқ'].filter(Boolean).join(' · '),
      }
    },
  },
})
