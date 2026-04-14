import type { LocaleCode } from './projects'

type LocalizedText = Record<LocaleCode, string>

export interface ExperienceItem {
  company: string
  role: LocalizedText
  period: string
  highlights: Record<LocaleCode, string[]>
}

export const experience: ExperienceItem[] = [
  {
    company: 'Kubo S.A.S.',
    role: {
      en: 'Frontend Developer',
      es: 'Desarrollador Frontend'
    },
    period: '2024 - Present',
    highlights: {
      en: [
        'Built Nuxt 3 and Vue 3 products with TypeScript and modular architecture.',
        'Implemented SSR and performance improvements for SEO-heavy platforms.',
        'Collaborated across product, design, and backend teams in agile cycles.'
      ],
      es: [
        'Desarrollo de productos Nuxt 3 y Vue 3 con TypeScript y arquitectura modular.',
        'Implementacion de SSR y mejoras de rendimiento para plataformas orientadas a SEO.',
        'Colaboracion con equipos de producto, diseno y backend en ciclos agiles.'
      ]
    }
  },
  {
    company: 'Workana',
    role: {
      en: 'Freelance Frontend Developer',
      es: 'Desarrollador Frontend Freelance'
    },
    period: '2022 - 2024',
    highlights: {
      en: [
        'Delivered end-to-end web solutions for international clients.',
        'Built scalable frontends with Vue, React, Next.js, and TypeScript.',
        'Integrated APIs, auth flows, and backend services with FastAPI.'
      ],
      es: [
        'Entrega de soluciones web end-to-end para clientes internacionales.',
        'Construccion de frontends escalables con Vue, React, Next.js y TypeScript.',
        'Integracion de APIs, autenticacion y servicios backend con FastAPI.'
      ]
    }
  }
]

export const skillGroups: Array<{ title: LocalizedText; items: string[] }> = [
  {
    title: { en: 'Frontend', es: 'Frontend' },
    items: ['Nuxt', 'Vue', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PrimeVue']
  },
  {
    title: { en: 'Backend and APIs', es: 'Backend y APIs' },
    items: ['Node.js', 'FastAPI', 'TypeORM', 'REST APIs', 'JWT', 'Webhooks']
  },
  {
    title: { en: 'Cloud and Tooling', es: 'Cloud y Herramientas' },
    items: ['AWS (S3, Lambda, Cognito)', 'Azure', 'Docker', 'Agile/Scrum']
  }
]
