import type { StructureResolver } from 'sanity/structure'

export const SINGLETONS = ['settings']

// Чап меню: созламалар (битта ҳужжат), кейин рўйхатлар
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Сайт')
    .items([
      S.listItem().title('Сайт созламалари').id('settings').child(S.document().schemaType('settings').documentId('settings').title('Сайт созламалари')),
      S.divider(),
      S.documentTypeListItem('review').title('Фуд-блог шарҳлари'),
      S.documentTypeListItem('testimonial').title('Отзывлар'),
      S.documentTypeListItem('partner').title('Ҳамкорлар'),
    ])
