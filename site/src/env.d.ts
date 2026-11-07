/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_VIDEO_BASE?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Сервер (build) томонидаги ўзгарувчилар — src/lib/cms.ts
interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID?: string;
  readonly SANITY_DATASET?: string;
  readonly SANITY_API_URL?: string;
}
