import { createResolver } from 'nuxt/kit'

const resolver = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/fontaine', 'nuxt-time', 'nuxt-og-image', '@nuxtjs/plausible'],
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
      'Inter:700',
      {
        name: 'Cal Sans',
        weight: 600,
        path: 'https://cdn.jsdelivr.net/npm/cal-sans@1.0.1/fonts/webfonts/CalSans-SemiBold.woff'
      }
    ]
  },
  plausible: {
    domain: 'firstcommit.is',
    apiHost: '/v',
  },
  nitro: {
    prerender: {
      routes: ['/']
    },
    publicAssets: [
      {
        baseURL: '/fonts',
        dir: resolver.resolve('./node_modules/cal-sans/fonts/webfonts'),
        maxAge: 60 * 60 * 24 * 365
      }
    ]
  },
  routeRules: {
    '/v/**': { proxy: 'https://v.roe.dev/**' }
  },
  $production: {
    routeRules: {
      '/**': { isr: true },
      '/v/**': { isr: false },
      '/oauth/**': { isr: false },
      '/connect/**': { isr: false }
    }
  },
})
