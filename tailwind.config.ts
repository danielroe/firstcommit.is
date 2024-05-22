import type { Config } from 'tailwindcss'
export default {
  theme: {
    extend: {
      fontFamily: {
        cal: ['Cal Sans', 'Cal Sans fallback']
      }
    }
  }
} satisfies Partial<Config>
