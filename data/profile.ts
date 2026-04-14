import type { LocaleCode } from './projects'

type LocalizedText = Record<LocaleCode, string>

export const profile = {
  name: 'Juan Sebastian Manrique Garcia',
  title: {
    en: 'Frontend-focused Full-Stack Engineer',
    es: 'Ingeniero Full-Stack con enfoque Frontend'
  } satisfies LocalizedText,
  summary: {
    en: 'I design and ship high-performance web products with Nuxt, Vue, and TypeScript, combining polished UX with scalable architecture.',
    es: 'Diseno y desarrollo productos web de alto rendimiento con Nuxt, Vue y TypeScript, combinando UX cuidada con arquitectura escalable.'
  } satisfies LocalizedText,
  location: {
    en: 'Bogota, Colombia',
    es: 'Bogota, Colombia'
  } satisfies LocalizedText,
  contact: {
    email: 'jsebastianm45@gmail.com',
    phone: '+57 310 809 7564'
  },
  social: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  }
}
