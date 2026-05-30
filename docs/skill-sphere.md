# SkillSphere.vue

**Ruta**: `app/components/SkillSphere.vue`
**Dependencias**: `SkillSphereScene.vue`, `usePortfolioContent.ts`, `data/experience.ts`

---

## Propósito

Renderiza un sistema solar 3D interactivo donde cada planeta representa un grupo de habilidades (Frontend, Backend, Cloud). Al hacer clic en un planeta, se muestra un tooltip con las tecnologías asociadas. Soporta i18n (es/en) y dark/light mode.

---

## Estructura de archivos

```
app/
├── components/
│   ├── SkillSphere.vue          # ← Orquestador (este componente)
│   └── SkillSphereScene.vue     # ← Escena Three.js
├── composables/
│   └── usePortfolioContent.ts   # ← Datos i18n
data/
└── experience.ts                # ← skillGroups (fuente de datos)
```

---

## API del componente

### Props
Ninguna. Es autocontenido.

### Emits
Ninguno directo. El componente hijo `SkillSphereScene` emite `select-skill` que `SkillSphere` consume internamente.

### Slots
Ninguno.

---

## Flujo de datos

```
data/experience.ts
    ↓ (import)
usePortfolioContent.ts  ← useI18n().locale
    ↓ (computed localizedSkillGroups)
SkillSphere.vue
    ├── mapea: { mars:0, earth:1, jupiter:2 }
    ├── pasa scene a SkillSphereScene (sin props)
    └── recibe evento @select-skill(planet)
         → resuelve índice → obtiene grupo → selectedSkill = grupo
         → tooltip se renderiza condicionalmente
```

---

## Mapeo Planeta → Habilidad

| Planeta | Índice | Grupo (EN) | Grupo (ES) | Radio orbital | Tamaño | Velocidad rotación |
|---|---|---|---|---|---|---|
| `mars` | 0 | Frontend | Frontend | 1.8 | 0.2 | `t * 0.45` |
| `earth` | 1 | Backend and APIs | Backend y APIs | 2.5 | 0.3 | `t * 0.28` |
| `jupiter` | 2 | Cloud and Tooling | Cloud y Herramientas | 3.8 | 0.5 | `t * 0.12` |

**Regla de negocio**: los planetas interiores giran más rápido (simulación orbital). Si se agregan más planetas, deben respetar este patrón.

---

## Estados del componente

| Estado | Visual | Condición |
|---|---|---|
| **Cargando (SSR)** | Placeholder div vacío (`skill-sphere-placeholder`) | `ClientOnly#fallback` |
| **Normal** | Sistema solar 3D rotando con auto-rotate | `selectedSkill === null` |
| **Tooltip abierto** | Overlay con backdrop blur + tarjeta | `selectedSkill !== null` |
| **Dark mode** | Planetas más vibrantes, partículas blancas | `colorMode === 'dark'` |
| **Light mode** | Planetas más apagados, partículas grises | `colorMode === 'light'` |

---

## Dependencias externas

| Paquete | Uso |
|---|---|
| `@tresjs/core` | `TresCanvas`, `TresMesh`, `TresGroup`, etc. |
| `@tresjs/cientos` | `OrbitControls`, `Stars`, `Sparkles`, `useLoop` |
| `three` | `THREE.BufferGeometry`, `THREE.PointsMaterial`, etc. |
| `@vueuse/core` | `useColorMode` (a través de la app) |
| `vue-i18n` | `useI18n` (a través de `usePortfolioContent`) |

---

## Puntos de extensión

### 1. Agregar un nuevo planeta/grupo de habilidades

```ts
// SkillSphere.vue — actualizar mapeo
const planetSkillMap: Record<string, number> = {
  mars: 0,
  earth: 1,
  jupiter: 2,
  mercury: 3, // ← nuevo
}
// Tipar el evento
function onSelectSkill(planet: 'mars' | 'earth' | 'jupiter' | 'mercury') { ... }
```

```ts
// SkillSphereScene.vue — agregar grupo 3D
const mercuryGroup = ref<THREE.Group | null>(null)
// En el template:
<TresGroup ref="mercuryGroup">
  <TresMesh :position="[1.2, 0, 0]" @click="emit('select-skill', 'mercury')">...</TresMesh>
</TresGroup>
// En onRender:
if (mercuryGroup.value) mercuryGroup.value.rotation.y = t * 0.6
```

```ts
// data/experience.ts — agregar entrada
{
  title: { en: 'DevOps', es: 'DevOps' },
  items: ['Docker', 'K8s', 'CI/CD']
}
```

### 2. Cambiar colores por modo

Los colores de planetas están centralizados en `planetColors` (computed). Modificar ahí.

### 3. Textura procedural

`generateEarthTexture()` está autocontenida. Se puede mover a un util o parametrizar (colores, frecuencias, octavas).

### 4. Tooltip

El overlay es parte de `SkillSphere.vue`. Se puede reemplazar por un slot o componente separado sin modificar la escena 3D.

---

## Advertencias / Notas para el agente

1. **SSR**: Todo el bloque 3D está envuelto en `<ClientOnly>`. No intentar renderizar Three.js en servidor.
2. **Memoria**: `onBeforeUnmount` hace dispose de `particlesRef` y `earthTexture`. Si se agregan nuevos recursos Three.js, deben dispose-arse también.
3. **Auto-rotate**: `OrbitControls` tiene `auto-rotate: true`. Si se agrega interacción que requiera control manual, considerar desactivarlo temporalmente.
4. **i18n**: Los `skillGroups` se traducen automáticamente. No hardcodear textos en los componentes 3D.
5. **Dark mode**: El `watch(isDark)` solo actualiza partículas. Los colores de planetas son reactivos via `computed`. Para nuevos elementos 3D, usar `planetColors` o agregar watchers similares.
6. **Click en móvil**: Three.js/Tresjs soporta clics táctiles, pero verificar que `@click` en planetas funcione en dispositivos táctiles (debería funcionar con raycasting de Tresjs).

---

## Convenciones de código

- Usar `ref` para objetos Three.js que mutan (rotación, posición)
- Usar `shallowRef` para texturas/materials que no necesitan deep reactivity
- Emitir eventos desde `SkillSphereScene` hacia arriba, no manejar lógica de negocio allí
- Los datos de habilidades viven en `data/experience.ts`, no en los componentes
