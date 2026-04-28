// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  plugins: ['~/plugins/anime.server.ts', '~/plugins/anime.client.ts'],
  runtimeConfig: {
    public: {
      plausibleDomain: '',
      siteUrl: 'https://juansebastianmanrique.dev'
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      titleTemplate: '%s | Juan Sebastian Manrique',
      meta: [
        {
          name: 'description',
          content:
            'Frontend-focused full-stack engineer portfolio featuring scalable Nuxt and AI-integrated products.'
        }
      ]
    }
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: false,
    lazy: true,
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Espanol', file: 'es.json' }
    ]
  }
})
