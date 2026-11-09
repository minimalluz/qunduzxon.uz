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
      // «Банд қилиш» вақтинча ўчиқ, админ панел — қидирувга бермаймиз
      filter: (page) => !page.includes('/band-qilish/') && !page.includes('/admin/'),
      i18n: { defaultLocale: 'uz', locales: { uz: 'uz-Cyrl', ru: 'ru' } },
    }),
  ],
  image: { responsiveStyles: true },
  vite: { plugins: [tailwindcss()] },
});
