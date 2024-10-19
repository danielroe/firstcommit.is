import { createResolver } from 'nuxt/kit'

const resolver = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-08-19',
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/fontaine', 'nuxt-time', 'nuxt-og-image', '@nuxtjs/plausible', '@nuxt/eslint'],
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
  site: {
    url: 'https://firstcommit.is',
  },
  app: {
    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#000000'
        },
      ],
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '#000000' },
      ],
    }
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
        path: '../node_modules/cal-sans/fonts/webfonts/CalSans-SemiBold.woff',
      }
    ]
  },
  plausible: {
    domain: 'firstcommit.is',
    apiHost: '/_v',
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
    '/_v/**': { proxy: 'https://v.roe.dev/**' }
  },
  $production: {
    routeRules: {
      '/**': { isr: true },
      '/_v/**': { isr: false },
      '/oauth/**': { isr: false },
      '/connect/**': { isr: false }
    }
  },
})
