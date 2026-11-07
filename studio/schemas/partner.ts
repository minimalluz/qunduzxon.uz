import { defineField, defineType } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Ҳамкор',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Номи', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logo', title: 'Логотип', type: 'image', description: 'PNG ёки SVG, шаффоф фонда. Бўлмаса, номи ёзилади' }),
    defineField({ name: 'url', title: 'Сайти', type: 'url' }),
    defineField({ name: 'order', title: 'Тартиб рақами', type: 'number', description: 'Кичик рақам олдинда', initialValue: 10 }),
  ],
  orderings: [{ title: 'Тартиб', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', media: 'logo' } },
})
