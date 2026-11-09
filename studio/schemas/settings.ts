import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Сайт созламалари',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Алоқа', default: true },
    { name: 'social', title: 'Ижтимоий тармоқлар' },
    { name: 'stats', title: 'Рақамлар' },
    { name: 'sections', title: 'Бўлимлар' },
  ],
  fields: [
    defineField({ name: 'telegram', title: 'Telegram username', type: 'string', group: 'contact', description: '@ белгисиз, масалан: qunduzxon. «Банд қилиш» тугмалари шу чатга олиб боради', validation: (r) => r.regex(/^[A-Za-z0-9_]{4,32}$/, { name: 'username' }) }),
    defineField({ name: 'phone', title: 'Телефон', type: 'string', group: 'contact', placeholder: '+998901234567', description: 'Бўш бўлса, «Қўнғироқ» тугмаси кўринмайди', validation: (r) => r.regex(/^\+998\d{9}$/, { name: '+998XXXXXXXXX' }) }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'instagram', title: 'Instagram ҳаволаси', type: 'url', group: 'social' }),
    defineField({ name: 'youtube', title: 'YouTube ҳаволаси', type: 'url', group: 'social' }),
    defineField({ name: 'facebook', title: 'Facebook ҳаволаси', type: 'url', group: 'social' }),
    defineField({ name: 'years', title: 'Эфирда неча йил', type: 'number', group: 'stats', initialValue: 16 }),
    defineField({ name: 'events', title: 'Тадбирлар сони (тахминан)', type: 'number', group: 'stats', initialValue: 1000 }),
    defineField({ name: 'followers', title: 'Обуначилар (минг)', type: 'number', group: 'stats', initialValue: 500, description: 'Мингларда: 500 → «500 минг+»' }),
    defineField({
      name: 'showDateCheck',
      title: '«Бўш санани текшириш» формасини кўрсатиш',
      type: 'boolean',
      group: 'sections',
      initialValue: false,
      description: 'Бош саҳифадаги «Тадбирингиз қачон?» ва хизмат саҳифаларидаги «Санани текширинг» формалари. Ёқилса — сайтда чиқади, ўчирилса — йўқолади.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Сайт созламалари' }) },
})
