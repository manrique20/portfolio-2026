import type { LocaleCode } from './projects'

type LocalizedText = Record<LocaleCode, string>

export interface BlogPost {
  slug: string
  title: LocalizedText
  excerpt: LocalizedText
  date: string
  readTime: string
  content: LocalizedText
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'designing-subscription-flows',
    title: {
      en: 'Designing Stable Subscription Flows in Nuxt',
      es: 'Diseno de flujos estables de suscripcion en Nuxt'
    },
    excerpt: {
      en: 'How to model recurring-payment states without breaking checkout UX.',
      es: 'Como modelar estados de pago recurrente sin romper la experiencia de checkout.'
    },
    date: '2026-04-10',
    readTime: '4 min',
    content: {
      en: 'When subscription products grow, the hard part is state transitions: trial, active, retry, paused, cancelled. I use explicit frontend state maps and webhook-driven synchronization so users always see truthful status and next actions.',
      es: 'Cuando un producto de suscripciones crece, lo dificil son las transiciones de estado: trial, active, retry, paused, cancelled. Uso mapas explicitos de estado frontend y sincronizacion por webhooks para que el usuario siempre vea estado real y siguiente accion.'
    }
  },
  {
    slug: 'ai-face-analysis-ux',
    title: {
      en: 'Shipping AI Face Analysis Without Confusing Users',
      es: 'Entregar analisis facial con IA sin confundir usuarios'
    },
    excerpt: {
      en: 'Practical UX decisions for explaining AI-derived health indicators.',
      es: 'Decisiones practicas de UX para explicar indicadores de salud derivados por IA.'
    },
    date: '2026-04-08',
    readTime: '3 min',
    content: {
      en: 'AI outputs are probabilistic, so labels and confidence framing matter. I separate observed signal, interpretation, and recommendation to keep trust high and avoid over-promising precision.',
      es: 'Las salidas de IA son probabilisticas, por eso importan etiquetas y contexto de confianza. Separo senal observada, interpretacion y recomendacion para mantener confianza y evitar prometer precision falsa.'
    }
  },
  {
    slug: 'agentic-ui-dual-pane',
    title: {
      en: 'Building Dual-Pane Agentic Interfaces',
      es: 'Construyendo interfaces agenticas de doble panel'
    },
    excerpt: {
      en: 'Why chat + task execution views should stay synchronized but decoupled.',
      es: 'Por que chat y ejecucion de tareas deben estar sincronizados pero desacoplados.'
    },
    date: '2026-04-05',
    readTime: '5 min',
    content: {
      en: 'In agentic products, users need both conversation context and execution visibility. I keep event timelines shared while each pane owns its own interaction details, reducing cognitive load and debugging friction.',
      es: 'En productos agenticos, usuarios necesitan contexto conversacional y visibilidad de ejecucion. Mantengo timeline de eventos compartido mientras cada panel conserva detalles de interaccion propios, reduciendo carga cognitiva y friccion de debugging.'
    }
  }
]
