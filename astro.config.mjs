// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://qunduzxon.uz';

/**
 * @fontsource CSS файлидан Astro local провайдери учун variants ясайди
 * (кирилл, кирилл-ext, лотин, лотин-ext — ўзбек кирилл ҳарфлари ў қ ғ ҳ ҳам шу ерда).
 * @param {string} cssPath  пакет ичидаги CSS, масалан '@fontsource/cormorant-garamond/600.css'
 * @param {string} weight   '600' ёки '300 700'
 */
function fontsource(cssPath, weight) {
  const file = fileURLToPath(import.meta.resolve(cssPath));
  const css = readFileSync(file, 'utf8');
  const subsets = ['cyrillic-ext', 'cyrillic', 'latin-ext', 'latin'];
  const variants = [];
  for (const block of css.split('@font-face').slice(1)) {
    const src = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!src || !range) continue;
    if (!subsets.some((sub) => src.includes(`-${sub}-`))) continue;
    variants.push({
      src: [path.join(path.dirname(file), 'files', src)],
      weight,
      style: 'normal',
      unicodeRange: range.split(',').map((r) => r.trim()),
    });
  }
  if (!variants.length) throw new Error(`Шрифт топилмади: ${cssPath}`);
  return variants;
}

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

  // Шрифтлар лойиҳа ичидан (npm: @fontsource) олинади — билд ва dev интернетсиз ҳам ишлайди.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Montserrat',
      cssVariable: '--font-body',
      fallbacks: ['system-ui', 'sans-serif'],
      options: { variants: fontsource('@fontsource-variable/montserrat/wght.css', '300 700') },
    },
    {
      provider: fontProviders.local(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-head',
      fallbacks: ['Georgia', 'serif'],
      options: { variants: fontsource('@fontsource/cormorant-garamond/600.css', '600') },
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
