// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: 3000,
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: [
    'vuetify/styles/main.sass',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/styles/main.scss',
  ],
  build: {
    transpile: ['vuetify', 'vue3-carousel'],
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'createStore', 'acceptHMRUpdate'],
      },
    ],
    ['@nuxtjs/eslint-module', { lintOnStart: false }],
    '@nuxt/test-utils/module',
    '@vueuse/nuxt',
  ],
  imports: {
    dirs: ['stores'],
  },
  vite: {
    resolve: {
      dedupe: ['vue-router'],
    },
  },
})
