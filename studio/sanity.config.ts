import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ruKZLocale } from '@sanity/locale-ru-kz'
import { schemaTypes } from './schemas'
import { structure, SINGLETONS } from './structure'
import { projectId, dataset } from './env'

export default defineConfig({
  name: 'qunduzxon',
  title: 'qunduzxon.uz — админ панел',
  projectId,
  dataset,
  // Ўзбекча интерфейс пакети йўқ — тугмалар русча, майдонлар ўзбекча
  plugins: [structureTool({ structure }), ruKZLocale()],
  schema: {
    types: schemaTypes,
    // «Сайт созламалари» битта: янгисини яратиб бўлмайди
    templates: (templates) => templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? actions.filter((a) => ['publish', 'discardChanges', 'restore'].includes(a.action ?? '')) : actions,
  },
})
