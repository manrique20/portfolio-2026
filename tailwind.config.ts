import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/assets/scss/**/*.scss',
    './app/app.vue'
  ],
  prefix: 'tw-',
  theme: {
    extend: {}
  }
}
