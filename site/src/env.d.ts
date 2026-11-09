/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_VIDEO_BASE?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

