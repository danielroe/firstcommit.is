import { Config } from 'tailwindcss'
export default {
  content: ["./lib/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        cal: ['Cal Sans', 'Cal Sans fallback']
      }
    }
  }
} satisfies Partial<Config>
