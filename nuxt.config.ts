// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['moment'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt'],
  css: [
    '~/assets/css/app.css',
    // '~/assets/css/elements.css',
    // '~/assets/css/components.css',
    // '~/assets/css/text.css',
  ],
  pinia: {
    autoImports: ['defineStore'],
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  runtimeConfig: {
    public: {
      rootDir: process.env.ASSET_DIR,
      dbPrefix: process.env.DB_PREFIX,
    },
  },
});
