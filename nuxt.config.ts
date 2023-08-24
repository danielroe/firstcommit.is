// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    typedPages: true
  },
  fontMetrics: {
    fonts: [
      {
        family: 'Cal Sans',
        src: '../node_modules/cal-sans/fonts/webfonts/CalSans-SemiBold.woff2'
      }
    ],
  },
  routeRules: {
    '/**': { isr: true }
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
