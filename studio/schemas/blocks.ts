import { defineArrayMember, defineField } from 'sanity'

/** Оддий матн муҳаррири: сарлавҳа, рўйхат, қалин/қия, ҳавола */
export const richText = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          { title: 'Оддий матн', value: 'normal' },
          { title: 'Сарлавҳа', value: 'h2' },
          { title: 'Кичик сарлавҳа', value: 'h3' },
        ],
        lists: [{ title: 'Рўйхат', value: 'bullet' }],
        marks: {
          decorators: [
            { title: 'Қалин', value: 'strong' },
            { title: 'Қия', value: 'em' },
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Ҳавола',
              fields: [{ name: 'href', type: 'url', title: 'Манзил', validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }) }],
            },
          ],
        },
      }),
    ],
  })
