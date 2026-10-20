/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_DIWALI_CAMPAIGN_ENABLED?: string;
  readonly VITE_DIWALI_CAMPAIGN_START?: string;
  readonly VITE_DIWALI_CAMPAIGN_END?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
