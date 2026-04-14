export type LocaleCode = "en" | "es";

type LocalizedText = Record<LocaleCode, string>;

type LocalizedList = Record<LocaleCode, string[]>;

export interface PortfolioProject {
  slug: string;
  name: string;
  thumbnail: string;
  thumbnailPosition?: string;
  tagline: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  challenge: LocalizedText;
  approach: LocalizedText;
  outcome: LocalizedText;
  impact: LocalizedText;
  stack: string[];
  features: LocalizedList;
  links: {
    live?: string;
  };
}

export const projects: PortfolioProject[] = [
  {
    slug: "true-blue",
    name: "True Blue",
    thumbnail: "/images/projects/true-blue.png",
    thumbnailPosition: "center top",
    tagline: {
      en: "Subscription pet-food platform focused on recurring commerce.",
      es: "Plataforma de alimento para mascotas basada en suscripciones recurrentes.",
    },
    role: {
      en: "Frontend Developer",
      es: "Desarrollador Frontend",
    },
    summary: {
      en: "Built key subscription journeys and checkout experiences with SSR-ready architecture.",
      es: "Construccion de flujos clave de suscripcion y checkout con arquitectura preparada para SSR.",
    },
    challenge: {
      en: "Recurring subscriptions needed stable UX while handling payment retries and lifecycle states.",
      es: "Suscripciones recurrentes requerian UX estable mientras se manejaban reintentos y estados de ciclo de vida.",
    },
    approach: {
      en: "Implemented modular subscription flows, webhook-driven state sync, an admin backoffice, and performance-focused SSR pages.",
      es: "Implemente flujos modulares de suscripcion, sincronizacion por webhooks, un backoffice administrativo y paginas SSR optimizadas.",
    },
    outcome: {
      en: "Higher checkout reliability and smoother recurring-order management for 10,000+ active users.",
      es: "Mayor confiabilidad en checkout y mejor gestion de ordenes recurrentes para 10,000+ usuarios activos.",
    },
    impact: {
      en: "Platform serves 10,000+ active users with recurring order workflows and webhooks.",
      es: "La plataforma atiende a mas de 10,000 usuarios activos con flujos recurrentes y webhooks.",
    },
    stack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "dLocal",
      "Webhooks",
    ],
    features: {
      en: [
        "Recurring subscription lifecycle",
        "Payment event handling via webhooks",
        "Backoffice for managing content and operational settings",
        "Responsive and accessible storefront UI",
      ],
      es: [
        "Ciclo de vida de suscripciones recurrentes",
        "Manejo de eventos de pago con webhooks",
        "Backoffice para gestionar contenido y configuraciones operativas",
        "Interfaz responsive y accesible para e-commerce",
      ],
    },
    links: {
      live: "https://trueblue.pet",
    },
  },
  {
    slug: "auno",
    name: "AUNO",
    thumbnail: "/images/projects/auno.png",
    thumbnailPosition: "center top",
    tagline: {
      en: "Platform for events and bid-based experiences.",
      es: "Plataforma para eventos y experiencias con logica de pujas.",
    },
    role: {
      en: "Full-Stack Developer",
      es: "Desarrollador Full-Stack",
    },
    summary: {
      en: "Shipped product-facing interfaces, backend services with Node.js, and clear UX flows with maintainable architecture.",
      es: "Desarrollo de interfaces, servicios backend con Node.js y flujos UX claros con arquitectura mantenible.",
    },
    challenge: {
      en: "Rapidly changing event and bidding requirements demanded reusable UI and predictable delivery.",
      es: "Requisitos cambiantes de eventos y pujas exigian UI reutilizable y entregas predecibles.",
    },
    approach: {
      en: "Created composable frontend modules, implemented Node.js backend services, and connected relational data flows with Stripe payment integration.",
      es: "Cree modulos frontend componibles, implemente servicios backend en Node.js y conecte flujos de datos relacionales con integracion de pagos en Stripe.",
    },
    outcome: {
      en: "Faster feature releases with less UI rework and better product consistency.",
      es: "Lanzamientos mas rapidos con menos retrabajo visual y mayor consistencia del producto.",
    },
    impact: {
      en: "Improved delivery velocity through reusable modules and enabled payment-ready backend workflows with relational databases.",
      es: "Mejore velocidad de entrega con modulos reutilizables y habilite flujos backend listos para pagos con bases de datos relacionales.",
    },
    stack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "Node.js",
      "Relational Databases",
      "Stripe",
      "Tailwind CSS",
      "PrimeVue",
    ],
    features: {
      en: [
        "Event and offer management interfaces",
        "Backend implementation with Node.js and relational databases",
        "Stripe integration for payment workflows",
        "Backoffice to manage platform content end-to-end",
        "Reusable UI modules for rapid feature delivery",
        "Responsive layouts across user flows",
      ],
      es: [
        "Interfaces para eventos y ofertas",
        "Implementacion backend con Node.js y bases de datos relacionales",
        "Integracion con Stripe para flujos de pago",
        "Backoffice para gestionar contenido de la plataforma de punta a punta",
        "Modulos UI reutilizables para entrega rapida",
        "Layouts responsive en flujos principales",
      ],
    },
    links: {
      live: "https://aunweb.inkubo.co/",
    },
  },
  {
    slug: "santoto-backoffice",
    name: "Santoto University Backoffice",
    thumbnail: "/images/projects/santoto.png",
    thumbnailPosition: "center",
    tagline: {
      en: "Administrative panel for managing university app content and operations.",
      es: "Panel administrativo para gestionar contenido y operaciones de la app universitaria.",
    },
    role: {
      en: "Full-Stack Developer",
      es: "Desarrollador Full-Stack",
    },
    summary: {
      en: "Built a backoffice for Universidad Santo Tomas administrators to manage app content and operational modules.",
      es: "Desarrolle un backoffice para administradores de la Universidad Santo Tomas para gestionar contenido y modulos operativos de la app.",
    },
    challenge: {
      en: "The university required one secure panel to centralize content, user operations, notifications, and job offers.",
      es: "La universidad necesitaba un panel seguro que centralizara contenido, operaciones de usuarios, notificaciones y ofertas laborales.",
    },
    approach: {
      en: "Implemented role-aware admin flows, CRUD modules, and backend endpoints over relational data structures.",
      es: "Implemente flujos administrativos por rol, modulos CRUD y endpoints backend sobre estructuras de datos relacionales.",
    },
    outcome: {
      en: "Administrators can publish updates faster and operate user-facing modules from one centralized system.",
      es: "Los administradores pueden publicar cambios mas rapido y operar modulos de cara al usuario desde un sistema centralizado.",
    },
    impact: {
      en: "Unified admin operations for content, users, notifications, and job opportunities.",
      es: "Unifico operaciones administrativas de contenido, usuarios, notificaciones y oportunidades laborales.",
    },
    stack: [
      "Nuxt",
      "Vue",
      "TypeScript",
      "Node.js",
      "Relational Databases",
      "Admin UX",
    ],
    features: {
      en: [
        "Content publishing and editing workflows",
        "User administration and permissions",
        "Notification management",
        "Job offer creation and updates",
      ],
      es: [
        "Flujos de publicacion y edicion de contenido",
        "Administracion de usuarios y permisos",
        "Gestion de notificaciones",
        "Creacion y actualizacion de ofertas laborales",
      ],
    },
    links: {},
  },
  {
    slug: "pidelo-backoffice",
    name: "Pidelo Backoffice",
    thumbnail: "/images/projects/pidelo.png",
    thumbnailPosition: "center",
    tagline: {
      en: "Backoffice for enterprise ride-dispatch operations with real-time tracking.",
      es: "Backoffice para operaciones de despacho empresarial con seguimiento en tiempo real.",
    },
    role: {
      en: "Full-Stack Developer",
      es: "Desarrollador Full-Stack",
    },
    summary: {
      en: "Built administrative tools to manage an Uber-like platform for companies with live driver visibility.",
      es: "Desarrolle herramientas administrativas para gestionar una plataforma tipo Uber para empresas con visibilidad de conductores en vivo.",
    },
    challenge: {
      en: "Operations teams needed real-time awareness and control over trips, drivers, and business dispatch rules.",
      es: "Los equipos operativos necesitaban visibilidad en tiempo real y control de viajes, conductores y reglas de despacho empresarial.",
    },
    approach: {
      en: "Designed dashboard workflows with realtime updates, operational filters, and backend logic for dispatch administration.",
      es: "Disene flujos de dashboard con actualizacion en tiempo real, filtros operativos y logica backend para administracion de despachos.",
    },
    outcome: {
      en: "Operations can monitor driver locations and manage service behavior from one control panel.",
      es: "Operaciones puede monitorear ubicaciones de conductores y gestionar comportamiento del servicio desde un panel de control.",
    },
    impact: {
      en: "Improved operational response time through centralized realtime admin tooling.",
      es: "Mejoro el tiempo de respuesta operativa gracias a herramientas administrativas centralizadas en tiempo real.",
    },
    stack: [
      "Nuxt",
      "Vue",
      "TypeScript",
      "Node.js",
      "Relational Databases",
      "Realtime Tracking",
    ],
    features: {
      en: [
        "Realtime driver location monitoring",
        "Administrative dispatch controls",
        "Enterprise ride operation management",
      ],
      es: [
        "Monitoreo en tiempo real de ubicacion de conductores",
        "Controles administrativos de despacho",
        "Gestion operativa de viajes empresariales",
      ],
    },
    links: {},
  },
  {
    slug: "ok724",
    name: "OK724",
    thumbnail: "/images/projects/ok724.svg",
    thumbnailPosition: "center top",
    tagline: {
      en: "Mobility web platform connecting people who are moving with nearby available drivers.",
      es: "Plataforma web de movilidad que conecta personas que se van a mudar con conductores cercanos disponibles.",
    },
    role: {
      en: "Full-Stack Developer",
      es: "Desarrollador Full-Stack",
    },
    summary: {
      en: "Developed the public platform and its dedicated backoffice to manage content and platform operations.",
      es: "Desarrolle la plataforma publica y su backoffice dedicado para gestionar contenido y operaciones de la plataforma.",
    },
    challenge: {
      en: "Matching users and drivers in perimeter-based areas required location-aware UX and reliable operational controls.",
      es: "Conectar usuarios y conductores por areas perimetradas exigia UX sensible a ubicacion y controles operativos confiables.",
    },
    approach: {
      en: "Implemented geolocation-based user flows and an admin panel for content, business rules, and operational updates.",
      es: "Implemente flujos basados en geolocalizacion y un panel administrativo para contenido, reglas de negocio y actualizaciones operativas.",
    },
    outcome: {
      en: "Users can request moving-related transportation and admins can manage platform behavior without code changes.",
      es: "Usuarios pueden solicitar transporte relacionado con mudanzas y administradores pueden gestionar la plataforma sin cambios de codigo.",
    },
    impact: {
      en: "Delivered both customer-facing acquisition flow and internal admin control system.",
      es: "Entregue tanto el flujo de captacion de usuarios como el sistema interno de control administrativo.",
    },
    stack: [
      "Nuxt",
      "Vue",
      "TypeScript",
      "Node.js",
      "Relational Databases",
      "Geolocation",
      "Backoffice",
    ],
    features: {
      en: [
        "Perimeter-based driver discovery",
        "Moving-service request workflow",
        "Backoffice for content and operations management",
      ],
      es: [
        "Busqueda de conductores por perimetro",
        "Flujo de solicitud de servicio de mudanza",
        "Backoffice para gestion de contenido y operaciones",
      ],
    },
    links: {
      live: "https://web.ok724.com/",
    },
  },
  {
    slug: "vitapp-health",
    name: "VitApp Health",
    thumbnail: "/images/projects/vitapp.png",
    thumbnailPosition: "center top",
    tagline: {
      en: "Health web app for registration, tracking, and AI-assisted facial analysis.",
      es: "Webapp de salud para registro, seguimiento y analisis facial asistido por IA.",
    },
    role: {
      en: "Frontend Developer",
      es: "Desarrollador Frontend",
    },
    summary: {
      en: "Built user flows for health onboarding and progress tracking in a product-focused web application.",
      es: "Desarrolle flujos de onboarding y seguimiento de progreso en una aplicacion de salud enfocada en producto.",
    },
    challenge: {
      en: "Health registration and monitoring required trust, clarity, and clear interpretation of AI outputs.",
      es: "Registro y monitoreo de salud requerian confianza, claridad e interpretacion simple de salidas de IA.",
    },
    approach: {
      en: "Designed onboarding and tracking UX, then integrated facial-analysis responses into actionable UI states.",
      es: "Disene UX de onboarding y tracking, luego integre respuestas de analisis facial en estados accionables.",
    },
    outcome: {
      en: "Users can register, track progress, and receive relevant health indicators from AI analysis.",
      es: "Usuarios pueden registrarse, seguir su progreso y recibir indicadores relevantes via analisis de IA.",
    },
    impact: {
      en: "Integrated AI facial analysis that returns relevant health indicators to support user monitoring.",
      es: "Integre analisis facial con IA que entrega indicadores relevantes de salud para apoyar monitoreo.",
    },
    stack: [
      "Nuxt",
      "Vue",
      "TypeScript",
      "AI Vision Integration",
      "Health Tracking",
    ],
    features: {
      en: [
        "User registration and profile onboarding",
        "Health metrics tracking dashboard",
        "AI facial analysis with actionable health insights",
      ],
      es: [
        "Registro de usuarios y onboarding de perfil",
        "Dashboard de seguimiento de metricas de salud",
        "Analisis facial con IA y datos accionables de salud",
      ],
    },
    links: {
      live: "https://webapp.vitapp.co/login",
    },
  },
  {
    slug: "ai-agent-dashboard",
    name: "AI Agent Dashboard",
    thumbnail: "/images/projects/ai-agent.png",
    thumbnailPosition: "center top",
    tagline: {
      en: "Agentic chat app with browser-like virtual machine workflows.",
      es: "Aplicacion de chat agentico con flujos tipo maquina virtual para busquedas.",
    },
    role: {
      en: "Creator and Full-Stack Developer",
      es: "Creador y Desarrollador Full-Stack",
    },
    summary: {
      en: "Built a ChatGPT-style interface with web-search and computer-use capabilities using Claude.",
      es: "Construccion de interfaz estilo ChatGPT con busqueda web y capacidades de computer-use usando Claude.",
    },
    challenge: {
      en: "Needed one UX that supports both chat responses and task execution in a virtual machine context.",
      es: "Se necesitaba una UX que soportara respuestas de chat y ejecucion de tareas en contexto de VM.",
    },
    approach: {
      en: "Implemented dual-pane architecture: conversational thread plus computer-use workspace with clear feedback.",
      es: "Implemente arquitectura de doble panel: conversacion y workspace de computer-use con feedback claro.",
    },
    outcome: {
      en: "Reliable AI interaction for both natural Q&A and guided web automation tasks.",
      es: "Interaccion de IA confiable tanto para preguntas naturales como para automatizacion guiada en web.",
    },
    impact: {
      en: "Demonstrates AI operations across conversational and task-execution contexts.",
      es: "Demuestra operaciones de IA tanto conversacionales como orientadas a ejecucion de tareas.",
    },
    stack: ["Nuxt", "Claude API", "AI SDK", "Vercel"],
    features: {
      en: [
        "Natural chat interface for general requests",
        "Secondary virtual machine view for guided web tasks",
        "Google search-backed responses",
      ],
      es: [
        "Interfaz de chat natural para consultas generales",
        "Vista secundaria tipo maquina virtual para tareas web",
        "Respuestas respaldadas por busqueda en Google",
      ],
    },
    links: {
      live: "https://ai-agent-dashboard-hazel.vercel.app/",
    },
  },
];
