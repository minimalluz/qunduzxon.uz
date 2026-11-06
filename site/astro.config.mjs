// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://qunduzxon.uz',
  trailingSlash: 'always',
  redirects: { '/': '/uz/' },
  integrations: [
    sitemap({
      // «Банд қилиш» саҳифаси вақтинча ўчиқ — қидирувга бермаймиз
      filter: (page) => !page.includes('/band-qilish/'),
      i18n: { defaultLocale: 'uz', locales: { uz: 'uz-Cyrl', ru: 'ru' } },
    }),
  ],
  image: { responsiveStyles: true },
  vite: { plugins: [tailwindcss()] },
});
