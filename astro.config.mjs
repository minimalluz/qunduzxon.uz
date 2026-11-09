// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://qunduzxon.uz';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  output: 'static',

  adapter: cloudflare({
    // Rasmlar build vaqtida AVIF/WebP ga siqiladi (Worker'da runtime xarajat yo'q).
    imageService: 'compile',
    prerenderEnvironment: 'node',
  }),

  i18n: {
    locales: ['uz', 'ru'],
    defaultLocale: 'uz',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },

  redirects: {
    '/': '/uz/',
  },

  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-body',
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['cyrillic-ext', 'cyrillic', 'latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-head',
      weights: ['600'],
      styles: ['normal'],
      subsets: ['cyrillic-ext', 'cyrillic', 'latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],

  env: {
    schema: {
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        default: '1x00000000000000000000AA', // Cloudflare test kaliti (dev)
      }),
    },
  },

  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      filter: (page) => !page.includes('/keystatic') && !page.includes('/api/'),
      i18n: {
        defaultLocale: 'uz',
        locales: { uz: 'uz-UZ', ru: 'ru-RU' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
