// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    typedPages: true
  },
  fontMetrics: {
    fonts: ['Cal Sans']
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/fontaine', 'nuxt-time'],
  runtimeConfig: {
    url: 'http://localhost:3000',
    github: {
      token: '',
      // OAuth client
      clientId: '',
      clientSecret: '',
    }
  },
})
