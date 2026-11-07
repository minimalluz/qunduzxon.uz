import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Исми', type: 'string', description: 'Масалан: Дилноза ва Жасур', validation: (r) => r.required() }),
    defineField({
      name: 'service',
      title: 'Қайси хизмат',
      type: 'string',
      options: { list: [{ title: 'Тўй ва тантаналар', value: 'toy-va-tantanalar' }, { title: 'Корпоратив тадбирлар', value: 'korporativ-tadbirlar' }, { title: 'ТВ, радио ва дикторлик', value: 'tv-radio-ovoz' }], layout: 'radio' },
      initialValue: 'toy-va-tantanalar',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'event', title: 'Тадбир ва сана', type: 'string', description: 'Масалан: Тўй, 2026 йил сентябр' }),
    defineField({ name: 'textUz', title: 'Фикр (ўзбекча)', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'textRu', title: 'Фикр (русча)', type: 'text', rows: 4, description: 'Бўш бўлса, рус версияда кўринмайди' }),
    defineField({ name: 'photo', title: 'Расм', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'name', subtitle: 'event', media: 'photo' } },
})
