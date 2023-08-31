import { createResolver } from 'nuxt/kit'

const resolver = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/fontaine', 'nuxt-time', 'nuxt-og-image'],
  devtools: { enabled: true },
  experimental: { typedPages: true, componentIslands: true },
  fontMetrics: {
    fonts: [
      {
        family: 'Cal Sans',
        src: '../node_modules/cal-sans/fonts/webfonts/CalSans-SemiBold.woff2'
      }
    ],
  },
  runtimeConfig: {
    url: 'http://localhost:3000',
    github: {
      token: '',
      // OAuth client
      clientId: '',
      clientSecret: '',
    }
  },
  ogImage: {
    fonts: [
      'Inter:400',
      {
        name: 'Cal Sans',
        weight: 800,
        path: '/fonts/CalSans-SemiBold.woff2'
      }
    ]
  },
  nitro: {
    publicAssets: [
      {
        baseURL: '/fonts',
        dir: resolver.resolve('./node_modules/cal-sans/fonts/webfonts'),
        maxAge: 60 * 60 * 24 * 365
      }
    ]
  },
  $production: {
    routeRules: {
      '/**': { isr: true },
      '/oauth/**': { isr: false },
      '/connect/**': { isr: false }
    }
  },
})
