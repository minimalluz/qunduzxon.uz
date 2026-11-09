/// <reference types="astro/client" />

// Cloudflare Worker muhiti (faqat server tomonda: src/pages/api/*)
declare module 'cloudflare:workers' {
  export const env: Record<string, string | undefined>;
}
